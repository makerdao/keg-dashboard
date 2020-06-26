// import fetch from 'node-fetch';
import Maker from '@makerdao/dai';
import kegPlugin from '../../index';
import { createCurrency } from '@makerdao/currency';

export const setupTestMakerInstance = async (network = 'ganache') => {
  const accounts = {
    default: {
      type: 'privateKey',
      key: '474BEB999FED1B3AF2EA048F963833C686A0FBA05F5724CB6417CF3B8EE9697E',
    },
  };
  const maker = await Maker.create('test', {
    plugins: [kegPlugin],
    // url: 'http://127.1:2000',
    // accounts,
  });

  await maker.authenticate();

  return maker;
};
