import { takeSnapshot, restoreSnapshot } from '@makerdao/test-helpers';
import BigNumber from 'bignumber.js';
import {
  setupTestMakerInstance,
  //   setUpAllowance,
  //   restoreSnapshotOriginal,
  //   sleep,
} from './helpers';
//   import { ZERO_ADDRESS } from '../src/utils/constants';
import KegService from '../KegService';
//   import * as web3utils from 'web3-utils';
const vowAddress = '0x36fdda9B5DAbdDA030598116D09f1E1c6bB1DeaB';

let maker, kegService, snapshotData;

jest.setTimeout(60000);

beforeAll(async () => {
  snapshotData = await takeSnapshot();
  maker = await setupTestMakerInstance();
  kegService = maker.service('keg');
});

afterAll(async () => {
  restoreSnapshot(snapshotData);
});

test('can create Keg Service', async () => {
  expect(kegService).toBeInstanceOf(KegService);
});

test('can get vow address', async () => {
  const vow = await kegService.vow();
  expect(vow).toBe(vowAddress);
});

test('can fetch mug balance for address', async () => {
  const expectedBal = 0;
  const mugBalance = await kegService.mugs(maker.currentAccount().address);
  expect(mugBalance.toNumber()).toBe(expectedBal);
});

test('can fetch mug balance for address', async () => {
  const expectedBal = 0;
  const mugBalance = await kegService.mugs(maker.currentAccount().address);
  expect(mugBalance.toNumber()).toBe(expectedBal);
});

test.skip('can brew', async () => {
  const sam = '0x81431b69b1e0e334d4161a13c2955e0f3599381e';
  const samAmt = 1;
  const addresses = [sam];
  const amounts = [samAmt];

  await kegService.brew(addresses, amounts);
});
