export function pick(
  obj: Record<string, any>,
  props: string | string[]
): Record<string, any> {
  const newObj = {} as Record<string, any>;
  // eslint-disable-next-line no-prototype-builtins
  if (typeof props === 'string' && obj.hasOwnProperty(props)) {
    newObj[props] = obj[props];
  }

  if (Array.isArray(props)) {
    for (const prop of props) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(prop)) {
        newObj[prop] = obj[prop];
      }
    }
  }

  return newObj;
}
