import { useState } from 'react';
import useMaker from './useMaker';

// transaction states --------
export const TX_PENDING = 'pending';
export const TX_SUCCESS = 'success';
export const TX_ERROR = 'error';

export default function useTxTracker() {
  const { maker, web3Connected } = useMaker();
  const [txState, setTxState] = useState(undefined);
  const [txMsg, setTxMsg] = useState(undefined);
  const [txErrorMsg, setTxErrorMsg] = useState(undefined);

  const callTx = (txObject, callbacks = {}) => {
    setTxErrorMsg(undefined);
    maker.service('transactionManager').listen(txObject, {
      initialized: () => {
        setTxState(TX_PENDING);
        callbacks.onInitialized && callbacks.onInitialized();
      },
      pending: tx => {
        setTxState(TX_PENDING);
        setTxMsg(
          'Please wait while the transaction is being mined (this can take a while)'
        );
        callbacks.onPending && callbacks.onPending();
      },
      mined: tx => {
        setTxState(TX_SUCCESS);
        setTxMsg('Transaction Sucessful!');
        callbacks.onMined && callbacks.onMined();
      },
      error: (_, err) => {
        const errorMsg = _.error.message.split('\n')[0];
        setTxState(TX_ERROR);
        setTxMsg(null);
        setTxErrorMsg(`Transaction failed with error: ${errorMsg}`);
        callbacks.onError && callbacks.onError();
      },
    });
    return txObject;
  };

  return { callTx, txState, txMsg, txErrorMsg };
}
