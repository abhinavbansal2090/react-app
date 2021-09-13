import { getWebView } from './webView'

export function postMessageNative(message: string) {
  if (getWebView()) {
    ;(getWebView() || window).postMessage(message)
  }
}
