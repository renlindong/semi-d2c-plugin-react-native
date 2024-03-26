import type { PluginHooks } from '@douyinfe/semi-d2c-typings';
import type { KyTreeNode } from '../type';
import '@figma/plugin-typings';

import { BaseComponentTypeEnum, baseDependencies } from '../util/constant';

const handler = (node: KyTreeNode, processor: (node: KyTreeNode) => void) => {
  processor(node);
  if (node.children) {
    node.children.forEach((child) => handler(child, processor));
  }
};

/**
 * 基础组件映射，div -> View，p -> Text，img -> Image，带有渐变色的View -> BackgroundLinearGradient
 */
export const modifyJSONSchema: PluginHooks['modifyJSONSchema'] = (
  treeNode: KyTreeNode
) => {
  // console.log('modifyJSONSchema', treeNode);

  // 去除空图片节点
  handler(treeNode, (node) => {
    node.children = node.children?.filter((item) => {
      if (item.tag === 'img' && !item.asset) {
        return false;
      }
      return true;
    });
  });

  // 标签名匹配
  handler(treeNode, (node) => {
    if (node.asset) {
      node.tag = BaseComponentTypeEnum.Image;
      node.isKyComponent = true;
      // node.packageName = packageName;
      node.dependencies = baseDependencies.Image;
      return;
    }

    if (node.text) {
      node.tag = BaseComponentTypeEnum.Text;
      node.isKyComponent = true;
      // node.packageName = packageName;
      node.dependencies = baseDependencies.Text;
      return;
    }

    if (node.tag === 'div') {
      const fills = (node.fills || []) as GradientPaint[];
      if (fills.length && fills[0].type === 'GRADIENT_LINEAR') {
        node.tag = BaseComponentTypeEnum.BackgroundLinearGradient;
        node.isKyComponent = true;
        // node.packageName = packageName;
        node.dependencies = baseDependencies.BackgroundLinearGradient;
      } else {
        node.tag = BaseComponentTypeEnum.View;
        node.isKyComponent = true;
        // node.packageName = packageName;
        node.dependencies = baseDependencies.View;
      }
    }
  });

  return treeNode;
};
