import type { KyTreeNode } from '../type';
import { isKyText } from './type';

const formatRgbaColor = (color: {
  r: number;
  g: number;
  b: number;
  a: number;
}) => {
  return `rgba(${Math.ceil(color.r * 255)}, ${Math.ceil(color.g * 255)}, ${Math.ceil(color.b * 255)}, ${color.a?.toFixed(2)})`;
};

// TODO: 优化下
export const convertBackgroundLinearGradientProps = (paint: GradientPaint) => {
  if (!paint || paint.type !== 'GRADIENT_LINEAR') {
    return {};
  }

  const { gradientStops, gradientTransform, opacity } = paint;

  const gradients = gradientStops.map((colorStop) => {
    const { color, position } = colorStop;
    return {
      color: formatRgbaColor(color),
      position,
    };
  });

  return {
    colors: gradients.map((item) => item.color),
    locations: gradients.map((item) => item.position),
    angle: 90,
  };
};

export const createShadowStyle = (node: KyTreeNode) => {
  const effect = node.effects?.[0] as DropShadowEffect;
  if (!effect || effect.type !== 'DROP_SHADOW') {
    return {};
  }

  const { color, offset, radius } = effect;
  const colorStr = formatRgbaColor(color);
  if (isKyText(node)) {
    return {
      textShadowColor: colorStr,
      textShadowOffset: { width: offset.x, height: offset.y },
      textShadowRadius: radius,
    };
  }
  return {
    shadowColor: colorStr,
    shadowOffset: { width: offset.x, height: offset.y },
    shadowRadius: radius,
  };
};
