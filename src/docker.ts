import { Containers } from './containers/containers.ts';

export class Docker {
  private readonly path : string | undefined;
  
  /**
   * Create an new Docker engine client instance.
   * 
   * @param path Socket path to use for the connection
   */
  constructor(path? : string) {
    this.path = path;
  }

  public get containers() : Containers {
    return new Containers(this.path);
  }
}
