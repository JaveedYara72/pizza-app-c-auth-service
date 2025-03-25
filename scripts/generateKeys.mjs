import crypto from "crypto";
import fs from "fs";

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },

    privateKeyEncoding: {
        type: "pkcs1",
        format: "pem",
    },
});

// Create certs directory if it doesn't exist
if (!fs.existsSync("certs")) {
    fs.mkdirSync("certs");
}

fs.writeFileSync("certs/public.pem", publicKey);
fs.writeFileSync("certs/private.pem", privateKey);
