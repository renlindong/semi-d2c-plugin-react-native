export * from './constant';
export * from './type';
export * from './color';
export * from './style';

export const mergeDependency = (
  origin: Record<string, { name: string; defaultModule?: boolean }[]>,
  newDep: Record<string, { name: string; defaultModule?: boolean }[]>
) => {
  Object.keys(newDep).forEach((key) => {
    if (origin[key]) {
      const list = newDep[key];
      const existList = origin[key].map((item) => item.name);
      list.forEach((item) => {
        if (!existList.includes(item.name)) {
          origin[key].push(item);
        }
      });
    } else {
      origin[key] = newDep[key];
    }
  });
};

export const normalizeOptions = (options: any) => {
  return {
    designWidth: Number(options['设计稿宽度']),
    remBase: Number(options['rem base值']),
    baseLibrary: options['基础组件库'],
  };
};
