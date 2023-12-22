import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { defer, from, Observable } from 'rxjs';
import { getBulldozerProgram } from '../../programs';
import { DeleteApplicationParams } from './types';

export const deleteApplication = (
  endpoint: string,
  params: DeleteApplicationParams
): Observable<TransactionInstruction> => {
  return defer(() =>
    from(
      getBulldozerProgram(endpoint)
        .methods.deleteApplication()
        .accounts({
          workspace: new PublicKey(params.workspaceId),
          application: new PublicKey(params.applicationId),
          authority: new PublicKey(params.authority),
        })
        .instruction() as Promise<TransactionInstruction>
    )
  );
};
