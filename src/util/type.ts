import { BaseComponentTypeEnum } from './constant';
import type { KyTreeNode } from '../type';

export const isType = (type: BaseComponentTypeEnum) => (node: KyTreeNode) => {
  return node.tag === type && node.isKyComponent;
};

export const isKyText = isType(BaseComponentTypeEnum.Text);

export const isKyImage = isType(BaseComponentTypeEnum.Image);

export const isKyBackgroundLinearGradient = isType(
  BaseComponentTypeEnum.BackgroundLinearGradient
);

export const isKyView = isType(BaseComponentTypeEnum.View);
