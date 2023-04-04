import { NOTIFICATION_TYPE_METADATA } from './constants';

export const NotificationType = () => {
  return (target, propertyKey) => {
    if (typeof target[propertyKey] !== 'function') {
      return;
    }
    const properties =
      Reflect.getMetadata(NOTIFICATION_TYPE_METADATA, target.constructor) || [];

    Reflect.defineMetadata(
      NOTIFICATION_TYPE_METADATA,
      [...properties, propertyKey],
      target.constructor
    );
  };
};
