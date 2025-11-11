import { Docker } from './docker.ts';

const docker = new Docker()

docker.containers.list().then(containers => {containers.map(container => console.log(container.Image))})
