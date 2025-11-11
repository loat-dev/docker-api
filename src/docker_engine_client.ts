import { Socket, type SocketRequestInit } from '@typescriptplayground/socket';

/**
 * This class represents a docker engine client.
 */
export class DockerEngineClient {
  private readonly socket : Socket;

  /**
   * Create an new Docker engine client instance.
   * 
   * @param path Socket path to use for the connection
   */
  constructor(path : string = '/var/run/docker.sock') {
    this.socket = new Socket(path);
  }

  /**
   * Send instruction to the docker engine.
   * 
   * @param path Endpoint, ex. `/containers/json`
   */
  protected send(
    path : string,
    init? : SocketRequestInit
  ) : Promise<Response> {
    return this.socket.request(path, init);
  }
}
