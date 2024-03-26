import type { APIUtils, PluginHooks } from '@douyinfe/semi-d2c-typings';

import { mergeDependency, normalizeOptions } from '../util';
import { STYLE_DEPENDENCIES } from '../util/constant';

export const generateTemplateFile = (
  args: Parameters<PluginHooks['generateTemplateFile']>[0],
  apiUtils: APIUtils
  // options: ReturnType<typeof normalizeOptions>
) => {
  const { code, utils } = args;
  const { template, imports, css } = code;
  const { getImportsString } = utils;

  // TODO: extra变量
  const styles = '';
  console.log('generateTemplateFile', imports);
  mergeDependency(imports, STYLE_DEPENDENCIES);

  // TODO 如果是基础组件库，则实现一个rem方法
  const templateFile = `import React from 'react';
${getImportsString(imports)}

const Component = () => {
  return (
  ${template}
  );
}

const styles = StyleSheet.create({
  ${css.replace(';', '')}
})

export default Component;
`;

  if (apiUtils?.prettierJS) {
    return apiUtils.prettierJS(templateFile);
  }
  return templateFile;
};
