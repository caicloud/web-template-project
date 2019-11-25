import routes from './routes';
import menus from './menus';
import { Module, ModuleRegistry } from '@caicloud/modularize/client';

ModuleRegistry.register(
  class extends Module {
    register(options) {
      const { patchRoute, store } = options;
      store.dispatch({
        type: '$patchMenu',
        payload: menus,
      });

      patchRoute(routes);
    }
  }
);
