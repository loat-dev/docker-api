export interface SocketOptions {
  connect? : (options : Deno.UnixConnectOptions) => Promise<Deno.UnixConn>
}
