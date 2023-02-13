import { isDefined, ValidateIf } from 'class-validator';
import { IsNotSiblingOf } from './isNotSiblingOf';

export function IncompatableWith(incompatibleSiblings: string[]) {
  const notSibling = IsNotSiblingOf(incompatibleSiblings);
  const validateIf = ValidateIf(
    incompatibleSiblingsNotPresent(incompatibleSiblings)
  );
  return function (target: any, key: string) {
    notSibling(target, key);
    validateIf(target, key);
  };
}
// Helper function for determining if a prop should be validated
function incompatibleSiblingsNotPresent(incompatibleSiblings: string[]) {
  return function (o, v) {
    return Boolean(
      isDefined(v) || // Validate if prop has value
        incompatibleSiblings.every((prop) => !isDefined(o[prop])) // Validate if all incompatible siblings are not defined
    );
  };
}
