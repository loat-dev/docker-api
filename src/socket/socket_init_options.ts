import { Method } from './method.ts';

export interface SocketInitOptions {
  method? : Method,
  headers : Record<string, string>
}
