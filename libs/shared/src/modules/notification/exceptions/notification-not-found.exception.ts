export class NotificationHandlerNotFoundException extends Error {
  constructor(notificationName: string) {
    super(
      `The notification handler for the "${notificationName}" command was not found!`
    );
  }
}
