import type { TreeNode } from '@douyinfe/semi-d2c-typings';

export type KyTreeNode = TreeNode & {
  isKyComponent?: boolean;
};
