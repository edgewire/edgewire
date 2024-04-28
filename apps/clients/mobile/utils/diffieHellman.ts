import { createDiffieHellman } from "diffie-hellman";

const dh = createDiffieHellman(2048);

export function generateKeys() {
  const clientPrivateKey = dh.generateKeys();
  const clientPublicKey = dh.getPublicKey();
  const clientSecret = dh.getPrivateKey();

  return { clientPrivateKey, clientPublicKey, clientSecret };
}

export function computeSharedSecret(serverPublicKey: string) {
  const sharedSecret = dh.computeSecret(serverPublicKey, "binary", "hex");
  return sharedSecret;
}

export function exchangeKeys() {
  const { clientPublicKey } = generateKeys();

  const data = fetch("http://localhost:8080/exchange_keys", {
    method: "POST",
    body: JSON.stringify({ clientPubKey: clientPublicKey }),
  })
    .then((res) => res.json())
    .then((data) => computeSharedSecret(data.serverPublicKey));

  console.log(data);
}
