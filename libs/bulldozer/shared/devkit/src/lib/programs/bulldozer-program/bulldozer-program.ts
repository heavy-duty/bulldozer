import {
  AnchorProvider,
  BorshAccountsCoder,
  BorshInstructionCoder,
  Program,
} from '@heavy-duty/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { Bulldozer, IDL } from './bulldozer';

export const BULLDOZER_PROGRAM_ID = new PublicKey(
  'DDeAAFUAXqyji1H9dTfrUXP8hEvhVdVFg7JyBK5yJG9Y'
);

let currentEndpoint: string;
let program: Program<Bulldozer>;

export const getBulldozerProgram = (endpoint: string) => {
  if (currentEndpoint && program && currentEndpoint === endpoint) {
    return program;
  }

  program = new Program<Bulldozer>(
    IDL,
    BULLDOZER_PROGRAM_ID,
    new AnchorProvider(
      new Connection(endpoint),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,
      AnchorProvider.defaultOptions()
    )
  );

  return program;
};

export const accountsCoder = new BorshAccountsCoder(IDL);

export const instructionCoder = new BorshInstructionCoder(IDL);
