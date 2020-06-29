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

  async getAllEventHistory() {
    const abi = this._keg().interface.abi;
    const address = this._keg().address;

    const web3 = this.get('web3');
    const me = this.get('accounts').currentAccount().address;
    const web3Contract = this.get('web3').web3Contract(abi, address);

    return web3Contract.getPastEvents(undefined, {
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
  }

  /**Event History */
  async getEventHistory() {
    const abi = this._keg().interface.abi;
    const address = this._keg().address;

    const web3 = this.get('web3');
    const me = this.get('accounts').currentAccount().address;
    const web3Contract = this.get('web3').web3Contract(abi, address);

    /**Not tested */
    const chugEvents = await web3Contract.getPastEvents('DownTheHatch', {
      // filter: {
      //   pal: me, //this may not work bc pal is not indexed
      // },
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('chugEvents', chugEvents);

    const sipEvents = await web3Contract.getPastEvents('JustASip', {
      filter: {
        bum: me,
      },
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('sipEvents', sipEvents);

    const pourEvents = await web3Contract.getPastEvents('PourBeer', {
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('pourEvents', pourEvents);

    const brewEvents = await web3Contract.getPastEvents('BrewBeer', {
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('brewEvents', brewEvents);

    /**Tested & Working */
    const passEvents = await web3Contract.getPastEvents('DrinkingBuddy', {
      filter: {
        owner: me,
      },
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('passEvents', passEvents);
    const yankEvents = await web3Contract.getPastEvents('ByeFelicia', {
      filter: {
        owner: me,
      },
      fromBlock: KEG_BLOCK,
      toBlock: 'latest',
    });
    console.log('yankEvents', yankEvents);

    // console.log(
    //   'sipEvents.filter(ev => ev.returnValues.bum === me)',
    //   sipEvents.filter(
    //     ev =>
    //       console.log(ev.returnValues.bum, me, ev.returnValues.bum === me) ||
    //       ev.returnValues.bum === me
    //   )
    // );

    const allEvents = [
      // ...brewEvents,
      ...pourEvents.filter(
        ev => ev.returnValues.bartender?.toLowerCase() === me.toLowerCase()
      ),
      // ...sipEvents,
      ...sipEvents.filter(
        ev => ev.returnValues.bum?.toLowerCase() === me.toLowerCase()
      ),
      ...chugEvents.filter(
        ev => ev.returnValues.bum?.toLowerCase() === me.toLowerCase()
      ),
      ...passEvents,
      ...yankEvents,
    ];

    for (let event of allEvents) {
      const block = await web3.getBlock(event.blockNumber, false);
      event.timestamp = block.timestamp;
    }

    return allEvents;
  }

  /**Keg Methods */

  // Gets mug of current user
  getMugBalance() {
    //TODO check balance if currentUser is also a delegate
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
