export class InvalidNotificationHandlerException extends Error {
  constructor() {
    super(
      `Invalid notification handler exception (missing @NotificationHandler() decorator?)`
    );
  }
}
