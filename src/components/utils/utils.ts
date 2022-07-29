import { TQuestionAnswer, TQuestionAnswerMap } from '../types';

export function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

export const flatArray = (value: any | any[]): any[] => {
  if (Array.isArray(value)) {
    return value.reduce((mid, curr) => [...mid, ...flatArray(curr)], []);
  }

  return [value];
};

export const flatEquals = (left: any, right: any): boolean => {
  if (is(left, right)) {
    return true;
  }

  if (left == null && right == null) {
    return true;
  }

  const leftIsArr = Array.isArray(left);
  const rightIsArr = Array.isArray(right);

  if (leftIsArr && rightIsArr) {
    const flatLeft = flatArray(left).map((v) => `${v}`.trim());
    const flatRight = flatArray(right).map((v) => `${v}`.trim());
    flatLeft.sort();
    flatRight.sort();

    return flatLeft.length === flatRight.length && flatLeft.every((item, index) => flatEquals(item, flatRight[index]));
  }

  if (leftIsArr) {
    return flatEquals(left[0], right);
  }

  if (rightIsArr) {
    return flatEquals(left, right[0]);
  }

  if (`${left}`.trim() === `${right}`.trim()) {
    return true;
  }

  return false;
};

export const isEmpty = (obj: any) => {
  return !obj || Object.keys(obj).length === 0;
};

export const isEmptyArray = (arr?: any[]): boolean => {
  return !(arr && arr?.length > 0);
};

export type Predictor = (value: any) => boolean;

/**
 * pick key/value from object, it will pick non-null fields by default
 * @param object
 * @param keyPredicate
 * @param valuePredicate
 * @returns
 */
export const pick = (object: any, keyPredicate?: Predictor, valuePredicate: Predictor = (value) => value != null) => {
  let result = object || {};
  if (keyPredicate) {
    result = Object.entries(result)
      .filter(([key]) => !!keyPredicate(key))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  }
  if (valuePredicate) {
    result = Object.entries(result)
      .filter(([, value]) => !!valuePredicate(value))
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  }

  return result;
};

export const answerListToAnswerMap = (answerList: TQuestionAnswer[]): TQuestionAnswerMap => {
  return answerList?.reduce((mid, { id, value }) => ({ ...mid, [id]: value }), {}) || {};
};

export const getContainer = () => document.body;

export const arrToMap = (
  arr: any[],
  options: {
    keyKey?: string;
    keyGetter?: (item: any) => string;
    valueKey?: string;
    valueGetter?: (item: any) => any;
    toArrayValue?: boolean;
  },
): Record<string, any[]> => {
  if (isEmptyArray(arr)) {
    return {};
  }

  const { keyKey, keyGetter, valueKey, valueGetter, toArrayValue } = options;
  return arr.reduce((mid, val) => {
    const key = keyKey ? val[keyKey] : keyGetter ? keyGetter(val) : '';
    const value = valueKey ? val[valueKey] : valueGetter ? valueGetter(val) : '';

    if (toArrayValue) {
      return { ...mid, [key]: [...(mid[key] || []), value] };
    }

    return { ...mid, [key]: value };
  }, {});
};

/**
 * search inputValue in value
 * @param inputValue
 * @param value
 * @returns
 */
export const inputSearch = (inputValue?: string | null, value?: string | null): boolean => {
  if (!value || !inputValue) {
    return false;
  }

  const lowerValue = value.toLowerCase();
  const lowerInput = inputValue.toLowerCase();

  let inputIndex = 0;
  for (let index = 0; index <= lowerValue.length; index += 1) {
    if (lowerValue[index] === lowerInput[inputIndex]) {
      inputIndex += 1;
    }
  }

  return inputIndex >= lowerInput.length;
};
