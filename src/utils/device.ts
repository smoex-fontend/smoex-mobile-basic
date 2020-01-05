export const IS_IOS = /(iPhone|iPod|iPad);?/i.test(navigator.userAgent)

export const IS_ANDROID = /Android/i.test(navigator.userAgent)

export const IS_IPAD = /iPad/i.test(navigator.userAgent)

export const IS_WECHAT_WEBVIEW = /micromessenger/i.test(navigator.userAgent)

export const IS_QQ_WEBVIEW = /\Wqq\W/i.test(navigator.userAgent)
