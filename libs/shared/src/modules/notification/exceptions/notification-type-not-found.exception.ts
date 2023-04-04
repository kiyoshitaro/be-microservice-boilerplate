export class NotificationTypeNotFoundException extends Error {
  constructor(notificationHandlerName) {
    super(
      `Don't have any notification type in ${notificationHandlerName} (missing @NotificationType() decorator?)`
    );
  }
}
