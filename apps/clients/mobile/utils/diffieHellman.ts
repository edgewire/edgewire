import { DiffieHellman, createDiffieHellman } from "diffie-hellman";

export function generateKeys() {
  const dh = createDiffieHellman(2048);
  const clientPrivateKey = dh.generateKeys();
  const clientPublicKey = dh.getPublicKey();
  const clientSecret = dh.getPrivateKey();

  return { clientPrivateKey, clientPublicKey, clientSecret };
}

export function computeSharedSecret(
  dh: DiffieHellman,
  serverPublicKey: string
) {
  const sharedSecret = dh.computeSecret(serverPublicKey, "binary", "hex");
  return sharedSecret;
}

export function exchangeKeys() {
  const data = fetch("http://localhost:8080/generate_keys").then((res) =>
    res.text()
  );

  console.log(data);
}
