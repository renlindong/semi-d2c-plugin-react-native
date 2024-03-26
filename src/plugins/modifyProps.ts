import type { PluginHooks, TreeNode } from '@douyinfe/semi-d2c-typings';
import { isKyImage, isKyBackgroundLinearGradient } from '../util/type';
import { convertBackgroundLinearGradientProps } from '../util/color';

const createProps = (props: Record<string, any>, node: TreeNode) => {
  if (isKyImage(node)) {
    const { className, src, ...restProps } = props;
    return {
      ...restProps,
      style: className,
      source: {
        uri: src,
      },
    };
  }

  if (isKyBackgroundLinearGradient(node)) {
    const { className, src, ...restProps } = props;
    const fills = (node.fills || []) as GradientPaint[];
    return {
      // colors, locations, angle
      ...convertBackgroundLinearGradientProps(fills[0]),
      style: className,
      ...restProps,
    };
  }
  const { className, ...restProps } = props;
  return {
    style: className,
    ...restProps,
  };
};

/**
 * 处理基础组件Image和BackgroundLinearGradient的props
 */
export const modifyProps: PluginHooks['modifyProps'] = ({ props, node }) => {
  console.log('modifyProps', node);
  return createProps(props, node);
};
