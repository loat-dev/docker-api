import { Socket } from '@typescriptplayground/socket';

const socket = new Socket('/var/run/docker.sock');

socket.request("/containers/json")
  .then(res => res.json())
  .then(json => console.log(json));
