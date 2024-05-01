export class Client {
    /**
     * Creates an instance of Client.
     * @param {string | URL} baseURL
     * @memberof Client
     */
    constructor(baseURL?: string | URL);
    baseURL: string | URL;
    dh: DiffieHellman;
}
import { DiffieHellman } from "./DiffieHellman.js";
