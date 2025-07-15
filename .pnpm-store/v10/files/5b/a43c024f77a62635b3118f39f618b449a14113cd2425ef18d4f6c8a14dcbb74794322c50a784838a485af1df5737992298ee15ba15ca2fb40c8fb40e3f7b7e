import { isPlatformSupported, isBrowser, now } from './common/utils';
import { patchAll } from './common/patching';
import { state } from './state';
var enabled = false;
export function bootstrap() {
  if (isPlatformSupported()) {
    patchAll();
    state.bootstrapTime = now();
    enabled = true;
  } else if (isBrowser) {
    console.log('[Elastic APM] platform is not supported!');
  }

  return enabled;
}