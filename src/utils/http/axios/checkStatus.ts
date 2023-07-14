export function checkStatus(status: number, msg: string): void {
  const $message = window['$message'];
  switch (status) {
    case 400:
      $message.error(msg);
      break;
    case 401:
      $message.error(msg);
      break;
    case 403:
      $message.error(msg);
      break;
    case 404:
      $message.error(msg);
      break;
    case 405:
      $message.error(msg);
      break;
    case 408:
      $message.error(msg);
      break;
    case 422:
      $message.error(msg);
      break;
    case 500:
      $message.error(msg);
      break;
    case 501:
      $message.error(msg);
      break;
    case 502:
      $message.error(msg);
      break;
    case 503:
      $message.error(msg);
      break;
    case 504:
      $message.error(msg);
      break;
    case 505:
      $message.error(msg);
      break;
    default:
      $message.error(msg);
  }
}
