import { DiffieHellman } from "./DiffieHellman.js";

export class Client {
  /**
   * Creates an instance of Client.
   * @param {string | URL} baseURL
   * @memberof Client
   */
  constructor(baseURL = "http://localhost:8080") {
    this.baseURL = baseURL;
    this.dh = new DiffieHellman(this.baseURL);
  }
}
