import type { SemiD2CPlugin } from '@douyinfe/semi-d2c-typings';

import {
  modifyJSONSchema,
  modifyProps,
  generateCSS,
  generateTemplateFile,
  generateSandboxFiles,
  codePreview,
} from './plugins';
import { normalizeOptions } from './util';

export const semiD2CPlugin: SemiD2CPlugin = () => ({
  name: 'Ky D2C插件',
  options: [
    {
      name: '基础组件库',
      type: 'select',
      defaultValue: 'ky-rn',
      optionList: ['react-native', 'ky-rn'],
    },
    {
      name: '设计稿宽度',
      type: 'select',
      defaultValue: '375',
      optionList: ['375', '750'],
    },
    {
      name: 'rem base值',
      type: 'select',
      defaultValue: '750',
      optionList: ['375', '750'],
    },
  ],

  setup(api, pluginOptions) {
    const options = normalizeOptions(pluginOptions);
    // 基础组件映射
    api.modifyJSONSchema(modifyJSONSchema);

    // 生成rn style
    api.generateCSS((args) => generateCSS(args, api.utils, options));

    // 基础组件props修改
    api.modifyProps(modifyProps);

    api.generateSandboxFiles(generateSandboxFiles);

    api.modifyEditorDefaultActiveFile(() => {
      return ['App.tsx'];
    });

    api.codePreview(codePreview);

    api.generateTemplateFile((args) => generateTemplateFile(args, api.utils));
  },
});
