import { i18n } from '@kbn/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin, PluginInitializerContext } from '../../../src/core/public';

import {
  KibanaXlsxImportPluginSetup,
  KibanaXlsxImportPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';
interface ClientConfigType {
  enabled: boolean;
}

export class KibanaXlsxImportPlugin
  implements Plugin<KibanaXlsxImportPluginSetup, KibanaXlsxImportPluginStart> {
    constructor(private readonly initializerContext: PluginInitializerContext) {}
  public setup(core: CoreSetup): KibanaXlsxImportPluginSetup {
    // Register an application into the side navigation menu
    const config = this.initializerContext.config.get<ClientConfigType>();
    console.log(this.initializerContext.env);
    console.log(config.enabled);
    core.application.register({
      id: 'kibanaXlsxImport',
      title: PLUGIN_NAME,
      euiIconType: 'importAction',
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
      
        // Render the application
        //return renderApp(coreStart, depsStart as AppPluginStartDependencies, params, coreStart.chrome );
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params ,core.uiSettings.get('bulk_package_size'), core.uiSettings.get('displayed_row'));
      },
    });

    // Return methods that should be available to other plugins
    return {
      
      getGreeting() {
        return i18n.translate('kibanaXlsxImport.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): KibanaXlsxImportPluginStart {
    return {};
  }

  public stop() {}
}
