import Maker from '@makerdao/dai';
import kegPlugin from './plugin/index';

let maker;

export async function instantiateMaker() {
  const config = {
    log: true,
    autoAuthenticate: false,
    plugins: [[kegPlugin]], // config options can be passed to your plugin like this
  };

  maker = await Maker.create('browser', config);

  window.maker = maker; // for debugging
  return maker;
}
