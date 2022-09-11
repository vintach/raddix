import clsx from 'clsx';

interface DynamicProps {
  [key: string]: any;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/*
 * Merges two ids.
 */
let idMapping = new Map<string, (v: string) => void>();

export function mergeIds(idA: string, idB: string): string {
  if (idA === idB) {
    return idA;
  }

  let setIdA = idMapping.get(idA);
  if (setIdA) {
    setIdA(idB);
    return idB;
  }

  let setIdB = idMapping.get(idB);
  if (setIdB) {
    setIdB(idA);
    return idA;
  }

  return idB;
}

/*
 * Merge several functions into a single function
 */
export function mergeFunctions(...callbacks: any[]): (...args: any[]) => void {
  return (...args: any[]) => {
    for (let callback of callbacks) {
      if (typeof callback === 'function') {
        callback(...args);
      }
    }
  };
}

/*
 * Merge several props of components
 */
export const merger = <T extends DynamicProps[]>(
  ...args: T
): UnionToIntersection<T[number]> => {
  let result: DynamicProps = { ...args[0] };
  for (let i = 1; i < args.length; i++) {
    let props = args[i];
    for (let key in props) {
      let a = result[key];
      let b = props[key];

      if (
        typeof a === 'function' &&
        typeof b === 'function' &&
        key[0] === 'o' &&
        key[1] === 'n' &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      ) {
        result[key] = mergeFunctions(a, b);
      } else if (
        (key === 'className' || key === 'UNSAFE_className') &&
        typeof a === 'string' &&
        typeof b === 'string'
      ) {
        result[key] = clsx(a, b);
      } else if (key === 'id' && a && b) {
        result.id = mergeIds(a, b);
      } else {
        result[key] = b !== undefined ? b : a;
      }
    }
  }

  return result as UnionToIntersection<T[number]>;
};
