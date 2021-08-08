// 登录用户 cookie
const COOKIE = ''
// VPN代理
const PROXY = 'http://127.0.0.1:21882'
// 域名
const DOMAIN = 'https://www.javbus.com'
const DOMAIN2 = 'https://btsow.one'
// 搜索关键词
const SEARCHTEXT = '明里つむぎ'
// 搜索番号的参数拼接
const FANHAO_API = `${DOMAIN}/search/${encodeURI(SEARCHTEXT)}`
// 搜索番号的参数拼接
const BT_API = `${DOMAIN2}/search`

module.exports = {
  COOKIE,
  PROXY,
  SEARCHTEXT,
  FANHAO_API,
  BT_API,
}
