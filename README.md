# Bulldozer [![Bulldozer Platform ci](https://github.com/heavy-duty/platform/actions/workflows/bulldozer-platform-ci.yaml/badge.svg?branch=master)](https://github.com/heavy-duty/platform/actions/workflows/bulldozer-platform-ci.yaml)

Bulldozer is a low code platform that uses abstractions that are common for developers to build Solana programs, it’s powered by Anchor Framework. It gives developers the ability to manage their program’s ecosystem through a UI, hiding all the gory details so they can focus on the business logic.

It consists of an Anchor workspace and an Angular application, the Anchor workspace holds the content of the Bulldozer program, it's used as decentralized storage. The reason we store all the data on-chain is that we want to unlock real-time collaboration while building systems.

![screenshot_of_bulldozer](https://user-images.githubusercontent.com/7496781/165176684-c969cec9-2665-4cd4-a99e-608abb42dba2.png)

## Running Locally

Bulldozer has only been tested in localhost, if you want to give it a test drive, make sure to have a local validator running using `solana-test-validator`.

In order to run Bulldozer in your local environment, you'll need to make sure you have installed globally these dependencies:

- @project-serum/anchor
- mocha
- ts-mocha
- typescript
- npm
- node

Clone the repo in the desired location and `cd` to it and run `npm i`. It's time to build the program and deploy it! Every Solana program needs a Keypair, Bulldozer is not different. We used one during development but you'll need to set up your own and replace it in some files.

I know, it's boring, but this is temporal. We'll figure out a better way. For now, cd into `apps/bulldozer-programs` and run `anchor keys list`, you should see a PublicKey, this key matches a new generated Keypair under `/apps/bulldozer-programs/target/deploy/bulldozer-keypair.json`.

Copy that PublicKey and replace it in these places:

- bulldozer program id in `apps/bulldozer-programs/Anchor.toml`
- declare_id in `apps/bulldozer-programs/programs/bulldozer/src/lib.rs`
- BULLDOZER_PROGRAM_ID const in `libs/bulldozer/shared/devkit/src/lib/programs/bulldozer-program/bulldozer-program.ts`

Now you run these commands from the root path:

- `npx nx build bulldozer-programs`
- `npx nx deploy bulldozer-programs`
- `npx nx serve bulldozer-client`
- `npx nx serve bulldozer-api` (you should have installed the Bulldozer CLI -> https://www.npmjs.com/package/@heavy-duty/bulldozer-cli)
- `npx nx serve broadcaster`

Remember to export this 2 env vars -> export PROGRAM_ID="\<program-id\>" && export WEB_CLIENT_URL=http://localhost:4200

Those three commands will build the program, deploy it to your local validator instance and start a server at port 4200 with the client application.

NOTE: Make sure to point the solana config in your local environment to match the local instance you have running.. Also, for deployment, remember to search and replace de API url, temporal it's fixed on the collection and instruction client library (http://localhost:3334)

## Testing it

If you want to run the program's e2e tests you can call `npx nx test bulldozer-programs` from the root of the project. Make sure to kill any local instance of Solana, it can make the tests fail.
