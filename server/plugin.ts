import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { KibanaXlsxImportPluginSetup, KibanaXlsxImportPluginStart } from './types';
import { defineRoutes } from './routes';
import { i18n } from '@kbn/i18n';
import { schema } from '@kbn/config-schema';



export class KibanaXlsxImportPlugin
  implements Plugin<KibanaXlsxImportPluginSetup, KibanaXlsxImportPluginStart> {
  private readonly logger: Logger;

  
  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('kibana-xlsx-import: Setup');
    core.uiSettings.register({
      'bulk_package_size': {
        name: i18n.translate('kibanaXlsxImport.uiSettings.showBulkLabel', {
          defaultMessage: 'bulk size for xlsx import',
        }),
        value: 1000,
        description: i18n.translate('timelion.uiSettings.showBulkDescription', {
          defaultMessage: 'xlsx import index will be created using bulksize',
        }),
        category: ['kibanaXlsxImport'],
        schema: schema.number(),
      }     
    });
    core.uiSettings.register({
      'displayed_row': {
        name: i18n.translate('timelion.uiSettings.showDisplayedRowsLabel', {
          defaultMessage: 'number of row for file preview',
        }),
        value: 50,
        description: i18n.translate('timelion.uiSettings.showDisplayedRowsDescription', {
          defaultMessage: 'After file selection, this data limit the number of file item displayed during preview',
        }),
        category: ['kibanaXlsxImport'],
        schema: schema.number(),
      }     
    });
    const router = core.http.createRouter();
    // Register server side APIs
    defineRoutes(router);
    
    return {};
  }

  public start(core: CoreStart) {
    
    this.logger.debug('kibana-xlsx-import: Started');
    return {};
  }

  public stop() {}
}
