import { Notification } from 'element-ui';

/**
 * success notification
 * @param {String} message
 * @param {String} title
 */
export function successNotification(message, title = 'Success') {
  Notification.success({
    title: title,
    message: message,
  })
}

/**
 * error notification
 * @param {String} message
 * @param {String} title
 * @param position
 */
export function errorNotification(message, title = 'Error', position = 'top-right') {
  Notification.error({
    title: title,
    message: message,
    position: position
  })
}

/**
 * warning notification
 * @param {String} message
 * @param {String} title
 */
export function warningNotification(message, title = 'Warning') {
  Notification.warning({
    title: title,
    message: message,
  })
}

/**
 * info notification
 * @param {String} message
 * @param {String} title
 */
export function infoNotification(message, title = 'Info') {
  Notification.info({
    title: title,
    message: message,
  })
}

