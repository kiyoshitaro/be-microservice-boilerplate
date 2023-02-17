import _ from 'lodash';

export const mergeArrayObject = (
  arrayObjectRoot: any[],
  arrayObjectData: any[],
  objectRootKey: string,
  objectDataKey: string,
  removeKeys: string[] = [],
  keyObjectInRoot?: string
): any[] => {
  const objectData = _.keyBy(arrayObjectData, objectDataKey);

  return arrayObjectRoot.map((item) => {
    let result: any;
    if (keyObjectInRoot) {
      result = {
        ...item,
        [keyObjectInRoot]: objectData[item[objectRootKey]],
      };
    } else {
      result = {
        ...item,
        ...objectData[item[objectRootKey]],
      };
    }
    console.log(result);

    return _.omit(result, removeKeys);
  });
};
