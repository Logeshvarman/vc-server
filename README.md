# Polygon ID VC Verifier Server

This repo contains the server code you'll need to set up a VC (Verifiable Credential) gated website with Polygon ID. Complete local server setup below, then hook this verification server up to a frontend so you can limit access based on holding a VC that satisifies your requirements.

## Server functionality

- Allows [Socket.io polling](https://socket.io/docs/v3/how-it-works/) to emit session specific events back to connected clients

- Generates a [Query Based Request](https://0xpolygonid.github.io/tutorials/verifier/verification-library/request-api-guide/#query-based-request) in the form of a QR code that the user can scan to prove they own a credential that satisfies certain requirements. It also specifies the callback endpoint for verification

- Reports [Verification](https://0xpolygonid.github.io/tutorials/verifier/verification-library/verification-api-guide/) of the proof sent by the user from their Polygon ID Wallet via callback

## Local server setup

#### 1. Install server dependencies

```bash
cd server
npm i
```

#### 2. Create a .env file by copying my sample

In your .env file,

```bash
cp .env.sample .env;
```

- Update the `RPC_URL_MUMBAI` to a Polygon Mumbai RPC endpoint. I used [Alchemy's](https://alchemy.com/?r=zU2MTQwNTU5Mzc2M)
- Optionally update the `VERIFIER_DID` to your DID
- Don't change `HOSTED_SERVER_URL` or `FRONTEND_URL` yet

#### 3. Run your server on port 8080

```bash
npm start
```

#### 4. Set up ngrok server forwarding (required!)

If you don't have ngrok already set up, install [ngrok](https://ngrok.com/download) via homebrew or download. [Login](https://dashboard.ngrok.com/login) (I used github login) to create a free account and add your account's config token to the command line.

After ngrok is set up, start a tunnel to port 8080 to expose your server to the internet beyond only being available to your laptop on localhost:8080. **This is necessary because the Polygon ID mobile wallet app will use a verfication uri you provide and needs to be able to send the verification result to this exposed public endpoint.**

```bash
ngrok http 8080
```

You'll see a forwarding address in the logs

```bash
Forwarding  https://abc-your-forwarding-address-def.ngrok-free.app -> http://localhost:8080
```

#### 5. Update the `HOSTED_SERVER_URL` field your .env file to your forwarding address

```bash
HOSTED_SERVER_URL="https://abc-your-forwarding-address-def.ngrok-free.app"
```

# More info

## Keys folder

The keys folder holds the authV2, credentialAtomicQueryMTPV2, and credentialAtomicQuerySigV2 public verification keys necessary to verify a zero-knowledge proof. You can optionally verify these keys by following instructions [here](https://github.com/0xPolygonID/phase2ceremony)

Here's the corresponding Iden3 circuit code

- [authV2.circom](https://github.com/iden3/circuits/blob/master/circuits/auth/authV2.circom)
- [credentialAtomicQueryMTPOffChain.circom](https://github.com/iden3/circuits/blob/master/circuits/offchain/credentialAtomicQueryMTPOffChain.circom)
- [credentialAtomicQuerySigOffChain.circom](https://github.com/iden3/circuits/blob/master/circuits/offchain/credentialAtomicQuerySigOffChain.circom)
