import { PublicService } from '@makerdao/services-core';
import tracksTransactions from './tracksTransactions';

export default class KegService extends PublicService {
  constructor(name = 'keg') {
    super(name, ['accounts', 'web3', 'smartContract']);
  }

  getMugBalance() {
    const account = this.get('accounts').currentAccount().address;
    return this.mugs(account);
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

  //accounting for tracking users balances
  mugs(address) {
    return this._keg().mugs(address);
  }

  //two-way mapping tracks delegates: delegate -> original
  pals(address) {
    return this._keg().pals(address);
  }

  //two-way mapping tracks delegates: original -> delegate
  buds(address) {
    return this._keg().buds(address);
  }

  //vow address
  vow() {
    return this._keg().vow();
  }

  _keg() {
    return this.get('smartContract').getContractByName('KEG');
  }
}
