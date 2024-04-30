export class Client {
    /**
     * Creates an instance of Client.
     * @param {URL} baseURL
     * @memberof Client
     */
    constructor(baseURL: URL);
    baseURL: URL;
    dh: DiffieHellman;
}
declare class DiffieHellman {
    /**
     * Creates an instance of DiffieHellman.
     * @param {URL} baseURL
     * @memberof DiffieHellman
     */
    constructor(baseURL: URL);
    baseURL: URL;
    /**
     * Generates a pair of Diffie-Hellman keys including a public key and a private key.
     * This method initializes a Diffie-Hellman key exchange object with a 2048-bit prime,
     * generates the keys, and then retrieves them for client-server key exchange purposes.
     *
     * @returns {{ clientPublicKey: Buffer, clientSecret: Buffer }} An object containing two properties:
     * - clientPublicKey {Buffer}: The public key to be exchanged with the server for secure communication.
     * - clientSecret {Buffer}: The private key to be kept secret and used on the client side to derive the shared secret.
     * @memberof DiffieHellman
     */
    generateKeys(): {
        clientPublicKey: Buffer;
        clientSecret: Buffer;
    };
    /**
     * Computes the shared secret using the Diffie-Hellman key exchange protocol.
     * This function initializes a new Diffie-Hellman object and then computes the shared secret based on
     * the provided public key of the server. The method is useful for establishing a secure communication channel
     * by ensuring both parties have a shared secret, without transmitting it over the network.
     *
     * @param {string} serverPublicKey - The public key received from the server, used to compute the shared secret.
     * @return {string} The computed shared secret in hexadecimal format.
     * @memberof DiffieHellman
     */
    computeSharedSecret(serverPublicKey: string): string;
    /**
     * This exchanges public DH keys in the client with the server.
     *
     * @return {{server_public_key: Buffer}}
     * @memberof DiffieHellman
     */
    exchangeKeys(): {
        server_public_key: Buffer;
    };
}
export {};
