import { SocketInitOptions } from './socket_init_options.ts';
import { SocketOptions } from './socket_options.ts';

export class Socket {
  readonly socketPath : string;
  readonly connection : Promise<Deno.UnixConn>;
  constructor(
    socket : string = '/var/run/docker.sock',
    options : SocketOptions = {connect: Deno.connect}
  ) {
    this.socketPath = socket;
    this.connection = options.connect({path: socket, transport: 'unix'});
  }

  public async request(
    path : string,
    init : SocketInitOptions = {
      method: 'GET',
      headers: {}
    }
  ) : Promise<unknown> {
    const connection = await this.connection;

    const headers = {
      Host: "docker",
      Connection: "close",
      ...init.headers,
    };

    const headerLines = [
      `${init.method} ${path} HTTP/1.1`,
      ...Object.entries(headers).map(([k, v]) => `${k}: ${v}`),
      '',
      '' // closes header section
    ];

    const requestPayload = headerLines.join("\r\n");
    
    await connection.write(new TextEncoder().encode(requestPayload));

    let headerParsed = false;
    let leftover = '';

    const bodyStream = new ReadableStream<Uint8Array>({
      async pull(controller) : Promise<void> {
        const { value, done } = await connection.readable.getReader().read();
        if (done) {
          controller.close();
          return;
        }

        const text = new TextDecoder().decode(value, { stream: true });
        leftover += text;

        if (!headerParsed) {
          const headerEnd = leftover.indexOf("\r\n\r\n");
          if (headerEnd !== -1) {
            headerParsed = true;

            const after = leftover.slice(headerEnd + 4);
            leftover = "";

            controller.enqueue(new TextEncoder().encode(after));
          }
        } else {
          controller.enqueue(value);
        }
      },
    });

    return new Response(bodyStream, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
