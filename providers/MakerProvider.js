import React, { createContext, useState, useEffect } from 'react';
import { instantiateMaker } from '../maker';

export const MakerObjectContext = createContext();

function MakerProvider({ children, network = 'mainnet' }) {
  const [maker, setMaker] = useState(null);
  const [web3Connected, setWeb3Connected] = useState(null);

  const connectBrowserWallet = async () => {
    try {
      if (maker) {
        await maker.authenticate();
        const { networkName } = maker.service('web3');
        if (network !== networkName) {
          return window.alert(
            `Wrong network. Your provider is connected to ${networkName}`
          );
        }

        setWeb3Connected(true);
      }
    } catch (err) {
      console.error(err);
      window.alert(
        'There was a problem connecting to your wallet, please reload and try again.'
      );
    }
  };

  useEffect(() => {
    const loadMaker = async () => {
      const _maker = await instantiateMaker(network);
      setMaker(_maker);
    };
    loadMaker();
  }, [network]);

  //Kev Service Calls

  const fetchTokenBalance = token => {
    return maker.service('token').getToken(token).balance();
  };

  const getMugBalance = () => {
    return maker.service('keg').getMugBalance();
  };

  const getUserDelegate = () => {
    return maker.service('keg').getUserDelegate();
  };

  const claimAll = () => {
    return maker.service('keg').chug();
  };

  const claimAmount = amount => {
    return maker.service('keg').claimAmount(amount);
  };

  const delegateTo = address => {
    return maker.service('keg').pass(address);
  };

  const removeDelegate = () => {
    return maker.service('keg').yank();
  };

  /**
   * if you are a user (bud) who delegates (pal) you see your delegate
   * if you are a delegate (pal) you see your user who delegated to you
   * (we'll need to have a different setup for pals dashboard, maybe set state user-type on load to switch)
   */

  return (
    <MakerObjectContext.Provider
      value={{
        maker,
        network,
        web3Connected,
        connectBrowserWallet,
        fetchTokenBalance,
        getMugBalance,
        claimAll,
        claimAmount,
        getUserDelegate,
        delegateTo,
        removeDelegate,
      }}
    >
      {children}
    </MakerObjectContext.Provider>
  );
}

export default MakerProvider;
