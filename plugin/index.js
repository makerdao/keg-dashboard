import { map, prop } from 'ramda';
import KegService from './KegService';
import { createCurrency } from '@makerdao/currency';

const KEG = 'KEG';

export default {
  // The second parameter for this function is an optional object containing additional config parameters
  // See the maker.js file for how it is used.
  addConfig: function (config) {
    // Store contract names and addresses as demonstrated in the files below
    const contractAddresses = {
      mainnet: require('./contracts/addresses/mainnet.json'),
      kovan: require('./contracts/addresses/kovan.json'),
      testnet: require('./contracts/addresses/kovan.json'),
    };

    // For each contract that you want to add, include the abi and address
    const addContracts = {
      [KEG]: {
        address: map(prop('KEG'), contractAddresses),
        abi: require('./contracts/abis/Keg.json'),
      },
    };

    // To add Erc20 tokens, first create a currency function for the token...
    // const MOCK = createCurrency('MOCK');

    // Then include it with the SDK config object
    // const token = {
    //   erc20: [{ currency: MOCK, address: addContracts.MOCK.address }],
    // };

    const makerConfig = {
      ...config,
      additionalServices: ['keg'], // this tells the SDK which service names to look for
      keg: [KegService], // each new service must be added to the config keyed by its name
      smartContract: { addContracts },
      // token,
    };

    return makerConfig;
  },
};
