import { createCipheriv, createDecipheriv, randomBytes, createHash } from "node:crypto";

/**
 * Encryption for stored credentials.
 *
 * AES-256-GCM, which authenticates as well as encrypts: a tampered row fails
 * to decrypt rather than yielding altered plaintext. The IV is random per
 * value, so storing the same key twice does not produce the same ciphertext.
 *
 * The key comes from CONNECTION_SECRET. Rotating it makes every stored
 * credential undecryptable - they have to be re-entered, which is the correct
 * outcome and is why decrypt reports a clear failure rather than returning
 * something that looks like a value.
 */

const FORMAT = "v1";

function key(): Buffer {
  const secret = process.env.CONNECTION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "CONNECTION_SECRET is missing or too short. Set it to a random string of at least 16 characters before storing credentials.",
    );
  }
  // A passphrase of any length becomes exactly 32 bytes. SHA-256 rather than a
  // KDF because this secret is machine-generated and high-entropy, not a human
  // password being defended against offline guessing.
  return createHash("sha256").update(secret).digest();
}

export function isEncryptionConfigured(): boolean {
  const secret = process.env.CONNECTION_SECRET;
  return Boolean(secret && secret.length >= 16);
}

export function encrypt(plaintext: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [FORMAT, iv.toString("base64"), tag.toString("base64"), enc.toString("base64")].join(":");
}

export function decrypt(stored: string): string {
  const [format, ivB64, tagB64, dataB64] = stored.split(":");
  if (format !== FORMAT || !ivB64 || !tagB64 || !dataB64) {
    throw new Error("Stored credential is not in a readable format.");
  }
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]).toString("utf8");
}

/** Enough to recognise a key in a list, not enough to use it. */
export function hintFor(value: string): string {
  return value.length <= 4 ? "****" : `…${value.slice(-4)}`;
}
