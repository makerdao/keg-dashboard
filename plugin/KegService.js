import { PublicService } from '@makerdao/services-core';

export default class KegService extends PublicService {
  constructor(name = 'keg') {
    super(name, ['web3', 'smartContract']);
  }

  //brew ?
  //pass ?
  //yank ?

  //user withdraws all their compensation
  chug() {
    return this._keg().chug();
  }

  //user withdraws some of their compensation
  sip(wad) {
    return this._keg().sip(wad);
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

/**
 * (/) initial scaffolding
 * (/) create abi for contract
 * (/) pull down contract & run test
 * (x) try to locate kovan deployed address (doesn't exist yet I think)
 * (/) setup plugin test spec
 * () setup snapshots for testing
 * () try to call chug in test
 */
