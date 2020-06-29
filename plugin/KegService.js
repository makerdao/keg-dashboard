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

//65fae35e rely
//9c52a7f1 deny

export default class KegService extends PublicService {
  constructor(name = 'keg') {
    super(name, ['accounts', 'web3', 'smartContract']);
  }

  /**Event History */
  async getEventHistory() {
    const web3 = this.get('web3');
    const me = this.get('accounts').currentAccount().address;

    const e = this._keg().interface.events;
    // console.log('eve', e);

    const abi = this._keg().interface.abi;
    const address = this._keg().address;

    // const events = await web3.getPastLogs({
    //   address: this._keg().address,
    //   topics: [],
    //   fromBlock: KEG_BLOCK,
    // });

    const web3Contract = this.get('web3').web3Contract(abi, address);

    console.log('web3Contract', web3Contract);

    // web3
    //   .getTransaction(
    //     '0xf9fab0a0baccde15fe5ae8ba061e8d7a5a5de6f2ff6210fdaa56ad7c55660372'
    //   )
    //   .then(x => console.log('input;', x.input));
    // web3
    //   .getTransaction(
    //     '0x01ee582058c3fbddf2f9b6a22fafcce6c53e85f3c81056e7816a216432fabe75'
    //   )
    //   .then(x => console.log('input;', x.input));

    // console.log('this._keg()', this._keg());

    const chugEvents = await web3Contract.getPastEvents('DownTheHatch', {
      filter: {
        pal: me,
      },
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('chugEvents', chugEvents);
    const passEvents = await web3Contract.getPastEvents('DrinkingBuddy', {
      filter: {
        owner: me,
      },
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    const yankEvents = await web3Contract.getPastEvents(
      'ByeFelicia',
      {
        filter: {
          owner: me,
        }, // Using an array means OR: e.g. 20 or 23
        fromBlock: KEG_BLOCK,
        toBlock: 'latest',
      }
      // function (error, events) {
      // }
    );

    const allEvents = [...chugEvents, ...passEvents, ...yankEvents];

    for (let event of allEvents) {
      const block = await web3.getBlock(event.blockNumber, false);
      event.timestamp = block.timestamp;
    }

    return allEvents;
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
