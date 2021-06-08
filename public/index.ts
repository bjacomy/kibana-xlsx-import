import {  PluginInitializerContext } from '../../../src/core/public';
import './index.scss';

import { KibanaXlsxImportPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin(initializerContext: PluginInitializerContext) {
  return new KibanaXlsxImportPlugin(initializerContext);
}
export { KibanaXlsxImportPluginSetup, KibanaXlsxImportPluginStart } from './types';
