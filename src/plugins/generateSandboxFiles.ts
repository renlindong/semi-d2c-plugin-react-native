import { PluginHooks, SandboxParams } from '@douyinfe/semi-d2c-typings';

export const generateSandboxFiles: PluginHooks['generateSandboxFiles'] = (
  args
) => {
  const { code } = args;
  const { templateFile, imports } = code;
  // const dependencies = getDependencies(imports);
  const sandboxFiles: SandboxParams = {
    title: 'Snack Simple Demo',
    files: {
      ['App.tsx']: { content: templateFile, isBinary: false },
      // ['src/main.js']: { content: indexFile, isBinary: false },
      // ['src/style.css']: { content: normalizeCSS, isBinary: false },
      // ['index.html']: { content: htmlFile, isBinary: false },
    },
  };

  return sandboxFiles;
};
