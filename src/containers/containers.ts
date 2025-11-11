import { DockerEngineClient } from '../docker_engine_client.ts';
import type { ContainerInspectResponse } from '../api_specification.ts'


export class Containers extends DockerEngineClient {

  /**
   * Create an new Containers instance.
   * 
   * @param path Socket path to use for the connection
   */
  constructor(path? : string) {
    super(path)
  }

  public list() : Promise<ContainerInspectResponse[]> {
    return this.send('/containers/json').then((response) => response.json())
  }
}
