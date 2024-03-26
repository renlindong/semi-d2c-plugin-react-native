import { PluginHooks } from '@douyinfe/semi-d2c-typings';
import { Snack } from 'snack-sdk';
// import { Snack } from '@kds/snack-sdk';
// import generateSandboxFiles from './generateSandboxFiles';

const CODESANDBOX_DEFINE_URL = 'https://codesandbox.io/api/v1/sandboxes/define';

export const codePreview: PluginHooks['codePreview'] = async (options) => {
  // const files = generateSandboxFiles(options);
  // const params = getParameters(files);

  // const res = await fetch(CODESANDBOX_DEFINE_URL, {
  //   method: 'POST',
  //   body: `parameters=${params}&json=1&environment=server`,
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  // });
  // const { sandbox_id: sandboxId } = await res.json();
  // const url = `https://codesandbox.io/s/${sandboxId}?file=/src/App.vue`;

  // window.open(url, '_blank');

  // Create Snack
  const snack = new Snack({
    files: {
      'App.js': {
        type: 'CODE',
        contents: `
import * as React from 'react';
import { View, Text } from 'react-native';

export default () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text style={{fontSize: 20, textAlign: 'center'}}>
      Hello Snack!
    </Text>
  </View>
);
`,
      },
    },
  });

  const { url, id } = await snack.saveAsync();
  console.log('url', url, id);
};
