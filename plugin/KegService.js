import { PublicService } from '@makerdao/services-core';
import tracksTransactions from './tracksTransactions';
import padStart from 'lodash/padStart';
import padEnd from 'lodash/padEnd';
import ethAbi from 'web3-eth-abi';

const funcSigTopic = v => padEnd(ethAbi.encodeFunctionSignature(v), 66, '0');
const KEG_BLOCK = '19284849';

const EVENT_START = funcSigTopic('start()');
const EVENT_BREW = funcSigTopic('brew(address[],uint256[])');
const EVENT_YANK = funcSigTopic('yank()');

export default class KegService extends PublicService {
  constructor(name = 'keg') {
    super(name, ['accounts', 'web3', 'smartContract']);
  }

  /**Event History */
  async getEventHistory() {
    const web3 = this.get('web3');
    // const me = this.get('accounts').currentAccount().address;

    const events = await web3.getPastLogs({
      address: this._keg().address,
      topics: [],
      fromBlock: KEG_BLOCK,
    });

    // const s = events.map(event => {
    //   for (let event of events) {
    //     // console.log('event', event);
    //     web3
    //       .getTransaction(event.transactionHash)
    //       .then(x => console.log('input;', event.transactionHash, x.input));
    //   }
    // });

    return events;
  }

  async parseStartEvents(events) {
    const web3 = this.get('web3');
    const me = this.get('accounts').currentAccount().address;
    const logs = await web3.getPastLogs({
      address: this._keg().address,
      topics: [
        EVENT_START,
        '0x' + padStart(me.replace('0x', ''), 64, '0'),
        null,
        null,
      ],
      fromBlock: '0',
    });

    return logs;
  }

  /**Keg Methods */

  // Gets mug of current user
  getMugBalance() {
    const account = this.get('accounts').currentAccount().address;
    return this.mugs(account);
  }

  // Gets delegate for current user
  getUserDelegate() {
    const account = this.get('accounts').currentAccount().address;
    return this.buds(account);
  }

  @tracksTransactions
  async claimAmount(amount, { promise }) {
    const wad = this.get('web3')._web3.utils.toWei(amount);
    await this.sip(wad, { promise });
  }

  @tracksTransactions
  async brew(addresses, wad, { promise }) {
    return this._keg().brew(addresses, wad, { promise });
  }

  //user withdraws all their compensation
  @tracksTransactions
  async chug({ promise }) {
    return this._keg().chug({ promise });
  }

  //user withdraws some of their compensation
  @tracksTransactions
  async sip(wad, { promise }) {
    return this._keg().sip(wad, { promise });
  }

  //user delegates compensation to another address
  @tracksTransactions
  async pass(address, { promise }) {
    return this._keg().pass(address, { promise });
  }

  //user revokes delegation
  @tracksTransactions
  async yank({ promise }) {
    return this._keg().yank({ promise });
  }

  //accounting for tracking users balances
  mugs(address) {
    return this._keg().mugs(address);
  }

  //two-way mapping tracks delegates: original -> delegate
  buds(address) {
    return this._keg().buds(address);
  }

  //two-way mapping tracks delegates: delegate -> original
  pals(address) {
    return this._keg().pals(address);
  }

  //vow address
  vow() {
    return this._keg().vow();
  }

  _keg() {
    return this.get('smartContract').getContractByName('KEG');
  }
}
