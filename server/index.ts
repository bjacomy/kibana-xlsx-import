import { schema, TypeOf } from '@kbn/config-schema';
import type { PluginConfigDescriptor } from 'kibana/server';

import { PluginInitializerContext } from '../../../src/core/server';
import { KibanaXlsxImportPlugin } from './plugin';


const configSchema = schema.object({
  enabled: schema.boolean({ defaultValue: true })
});


export const config: PluginConfigDescriptor<ConfigType> = {
  exposeToBrowser: {
    enabled: true
  },
  schema: configSchema,
};
export   type ConfigType = TypeOf<typeof configSchema>;
//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.



export function plugin(initializerContext: PluginInitializerContext) {
  return new KibanaXlsxImportPlugin(initializerContext);
}

export { KibanaXlsxImportPluginSetup, KibanaXlsxImportPluginStart } from './types';
