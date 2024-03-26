export enum BaseComponentTypeEnum {
  Image = 'Image',
  Text = 'Text',
  View = 'View',
  BackgroundLinearGradient = 'BackgroundLinearGradient',
}

const packageName = '@ky/ui';

export const baseDependencies = {
  Image: [
    {
      componentName: 'Image',
      packageName,
      defaultModule: false,
    },
  ],
  Text: [
    {
      componentName: 'Text',
      packageName,
      defaultModule: false,
    },
  ],
  View: [
    {
      componentName: 'View',
      packageName,
      defaultModule: false,
    },
  ],
  BackgroundLinearGradient: [
    {
      componentName: 'BackgroundLinearGradient',
      packageName,
      defaultModule: false,
    },
  ],
};

export const STYLE_DEPENDENCIES = {
  [packageName]: [
    {
      name: 'StyleSheet',
      defaultModule: false,
    },
    // {
    //   name: 'rem',
    //   defaultModule: false,
    // },
  ],
};
