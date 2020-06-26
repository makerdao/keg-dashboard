import {
  setupTestMakerInstance,
  //   setUpAllowance,
  //   restoreSnapshotOriginal,
  //   sleep,
} from './helpers';
//   import { ZERO_ADDRESS } from '../src/utils/constants';
import KegService from '../KegService';
//   import * as web3utils from 'web3-utils';
//vow address 0x36fdda9B5DAbdDA030598116D09f1E1c6bB1DeaB

let maker, kegService;

// jest.setTimeout(60000);

beforeAll(async () => {
  maker = await setupTestMakerInstance();
  kegService = maker.service('keg');

  //   maker.useAccount('owner');
});

// afterAll(async done => {
//   if (global.useOldChain) {
//     await restoreSnapshotOriginal(global.snapshotId);
//     done();
//   } else {
//     global.client.restoreSnapshot(global.testchainId, global.defaultSnapshotId);
//     await sleep(15000);

//     await global.client.delete(global.testchainId);
//     await sleep(15000);

//     done();
//   }
// });

test('can create Keg Service', async () => {
  expect(kegService).toBeInstanceOf(KegService);
});

// test.only('contract ', async () => {
//   const vow = kegService._keg();
//   console.log('keg contract', vow);
// });

test('can call vow ', async () => {
  const vow = await kegService.vow();
  console.log('vow address', vow);
});
