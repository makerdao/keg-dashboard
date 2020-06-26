import { PublicService } from '@makerdao/services-core';

export default class KegService extends PublicService {
  constructor(name = 'keg') {
    super(name, ['web3', 'smartContract']);
  }

  //mugs <-- used by this lib
  //pals <-- used by this lib
  //buds <-- used by this lib
  //brew ?
  //pass ?
  //yank ?
  //chug <-- used by this lib
  //sip <-- used by this lib

  testMethod() {
    console.log('test works');
    return 'test is working!';
  }

  getContractName() {
    return this.get('smartContract').getContractByName('KEG');
  }
}

/**
 * (x) initial scaffolding
 * () create abi for contract
 * () pull down contract & run test
 * () try to locate kovan deployed address
 */
