import type { KyTreeNode } from '../type';

import { createShadowStyle } from './color';

const createKey = (prefix: string) => {
  return {
    top: `${prefix}Top`,
    left: `${prefix}Left`,
    bottom: `${prefix}Bottom`,
    right: `${prefix}Right`,
  };
};

const getShortValue = (
  value: { top: number; left: number; right: number; bottom: number },
  prefix = 'padding'
) => {
  const { top, left, right, bottom } = value;
  if (!top && !left && !right && !bottom) {
    return;
  }

  if (left === right && right === top && top === bottom && left) {
    return {
      [prefix]: left,
    };
  }

  const newValue = {};
  const keys = createKey(prefix);
  if (left) {
    newValue[keys.left] = left;
  }
  if (right) {
    newValue[keys.right] = right;
  }
  if (top) {
    newValue[keys.top] = top;
  }
  if (bottom) {
    newValue[keys.bottom] = bottom;
  }

  if (left === right && left) {
    newValue[`${prefix}Horizontal`] = left;
    delete newValue[keys.left];
    delete newValue[keys.right];
  }

  if (top === bottom && top) {
    newValue[`${prefix}Vertical`] = top;
    delete newValue[keys.top];
    delete newValue[keys.bottom];
  }

  return newValue;
};

const transpilePadding = (style: any) => {
  const { paddingTop, paddingBottom, paddingLeft, paddingRight } = style;

  const padding = getShortValue(
    {
      top: paddingTop,
      left: paddingLeft,
      bottom: paddingBottom,
      right: paddingRight,
    },
    'padding'
  );

  delete style.paddingTop;
  delete style.paddingBottom;
  delete style.paddingLeft;
  delete style.paddingRight;

  Object.assign(style, padding);
};

const transpileMargin = (style: any) => {
  const { marginTop, marginBottom, marginLeft, marginRight } = style;

  const margin = getShortValue(
    {
      top: marginTop,
      left: marginLeft,
      bottom: marginBottom,
      right: marginRight,
    },
    'margin'
  );

  delete style.marginTop;
  delete style.marginBottom;
  delete style.marginLeft;
  delete style.marginRight;

  Object.assign(style, margin);
};

const isSame = (arr: any[]) => {
  if (!arr.length) {
    return true;
  }
  return new Set(arr).size === 1;
};

const transpileBorder = (style: any) => {
  const {
    borderTopWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
  } = style;
  if (
    borderTopWidth &&
    isSame([
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
    ])
  ) {
    delete style.borderTopWidth;
    delete style.borderBottomWidth;
    delete style.borderLeftWidth;
    delete style.borderRightWidth;
    style.borderWidth = borderTopWidth;
  }

  if (
    borderTopColor &&
    isSame([
      borderTopColor,
      borderBottomColor,
      borderLeftColor,
      borderRightColor,
    ])
  ) {
    delete style.borderTopColor;
    delete style.borderBottomColor;
    delete style.borderLeftColor;
    delete style.borderRightColor;
    style.borderColor = borderTopColor;
  }
};

const transpileBorderRadius = (style: any) => {
  const {
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
  } = style;

  if (
    borderTopLeftRadius &&
    isSame([
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
    ])
  ) {
    delete style.borderTopLeftRadius;
    delete style.borderTopRightRadius;
    delete style.borderBottomLeftRadius;
    delete style.borderBottomRightRadius;
    style.borderRadius = borderTopLeftRadius;
  }
  if (!borderTopLeftRadius) {
    delete style.borderTopLeftRadius;
  }

  if (!borderTopRightRadius) {
    delete style.borderTopRightRadius;
  }

  if (!borderBottomLeftRadius) {
    delete style.borderBottomLeftRadius;
  }
  if (!borderBottomRightRadius) {
    delete style.borderBottomRightRadius;
  }
};

const transpileFont = (style: any) => {
  let { fontSize = 0, lineHeight = 0 } = style;

  fontSize = Math.round(Number(fontSize));
  lineHeight = Math.round(Number(lineHeight));

  fontSize && (style.fontSize = fontSize);
  lineHeight && (style.lineHeight = lineHeight);

  delete style.letterSpacing;
};

function transpileFontFamily(style) {
  const { fontFamily } = style;
  if (!fontFamily) {
    return;
  }
  style.fontFamily = fontFamily.trim();
  if (style.fontWeight) {
    style.fontWeight = String(style.fontWeight);
  }
}

const transpileRemNumber = (style: any) => {
  // rem
};

const transpileShadow = (style: any, node: KyTreeNode) => {
  const shadowStyle = createShadowStyle(node);
  Object.assign(style, shadowStyle);
};

const removeKeys = (keys: string[], style: any) => {
  keys.forEach((key) => {
    delete style[key];
  });
};

const isFlex = (displayValue: string) => {
  return displayValue === 'flex' || displayValue === 'inline-flex';
};

const removeUnSupportCss = (style: any, node: KyTreeNode) => {
  const keys = [
    'display',
    'boxShadow',
    'background',

    // 文本描边
    'outlineColor',
    'outlineStyle',
    'outlineWidth',

    // 文本线性渐变
    'WebkitBackgroundClip',
    'backgroundClip',
  ];
  const background = style.background;
  if (background && background.indexOf('linear-gradient') === -1) {
    style.backgroundColor = background;
  }
  if (style.display && isFlex(style.display) && !style.flexDirection) {
    style.flexDirection = 'row';
  }
  removeKeys(keys, style);
};

const scaleEle = [
  //width
  'width',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingHorizontal',
  'borderLeftWidth',
  'borderRightWidth',
  'left',
  'right',
  'minWidth',
  'maxWidth',
  //height
  'height',
  'marginTop',
  'marginBottom',
  'marginVertical',
  'paddingTop',
  'paddingBottom',
  'paddingVertical',
  'borderTopWidth',
  'borderBottomWidth',
  'top',
  'bottom',
  'minHeight',
  'maxHeight',
  'lineHeight',
  //ele
  'fontSize',
  'margin',
  'padding',
  'borderWidth',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',

  'textShadowOffset',
  'textShadowRadius',
];

export const rem = (
  style: any,
  options: {
    remBase: number;
    designWidth: number;
  }
) => {
  const { remBase, designWidth } = options;
  // const fnWidth = 750;
  const ratio = remBase / designWidth;

  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const value = style[key];
      if (value === undefined) {
        continue;
      }
      if (scaleEle.includes(key)) {
        if (typeof value === 'object') {
          style[key] = rem(value, options);
        } else {
          style[key] = `rem(${value * ratio})`;
        }
      } else {
        style[key] = typeof value === 'string' ? `'${value}'` : value;
      }
    }
  }
  return style;
};

const formatStyles = (style: Record<string, any>, options?: {}) => {
  const keys = Object.keys(style).filter(
    (key) => typeof style[key] !== undefined
  );
  return keys
    .map((key, index) => {
      const end = index !== keys.length - 1 ? ',' : '';
      const value = style[key];
      if (typeof value === 'object') {
        return `${key}: {${formatStyles(style[key])}}${end}`;
      }
      // TODO: 数字rem格式化
      let finalValue = typeof value === 'string' ? `"${value}"` : value;
      return `${key}: ${finalValue}${end}`;
    })
    .join('\n');
};

/** 使用数组保证运行顺序 */
export const hooks = [
  removeUnSupportCss,
  transpilePadding,
  transpileMargin,
  transpileFont,
  transpileBorder,
  transpileBorderRadius,
  transpileFontFamily,
  transpileShadow,
  transpileRemNumber,
];
