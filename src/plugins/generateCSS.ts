import type { APIUtils, PluginHooks } from '@douyinfe/semi-d2c-typings';
import type { KyTreeNode } from '../type';

import { hooks, rem } from '../util/style';
import { normalizeOptions } from '../util';

const initStyle = (style: any, node: KyTreeNode) => {
  hooks.forEach((hook) => {
    hook(style, node);
  });
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
      let finalValue =
        typeof value === 'string' && value.indexOf('rem') === -1
          ? `"${value}"`
          : value;
      return `${key}: ${finalValue}${end}`;
    })
    .join('\n');
};

/**
 * 生成style
 */
export const generateCSS = (
  { JSONSchema }: Parameters<PluginHooks['generateCSS']>[0],
  utils: APIUtils,
  options: ReturnType<typeof normalizeOptions>
) => {
  // return createProps(props, node);
  console.log('generateCSS', JSONSchema);
  const classNameSet = new Set();
  const styles: string[] = [];
  utils.traverseNodeTree(JSONSchema, (node) => {
    let { className } = node;
    const { style } = node;
    if (className && style) {
      if (classNameSet.has(className)) {
        for (let i = 1; ; i++) {
          const newClassName = `${className}${i}`;
          if (!classNameSet.has(newClassName)) {
            className = newClassName;
            break;
          }
        }
      }

      classNameSet.add(className);
      node.className = className;
      const newStyle = rem(initStyle(style, node), {
        designWidth: options.designWidth,
        remBase: options.remBase,
      });
      const styleValue = `${className}: {${formatStyles(newStyle)}}`;

      styles.push(styleValue);
    }
  });
  console.log('styles.join(', ')', styles.join(','));
  return styles.join(',');
};
