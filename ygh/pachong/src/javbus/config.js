// 登录用户 cookie
const COOKIE = ''
// VPN代理
const PROXY = 'http://127.0.0.1:21882'
// 域名
const DOMAIN = 'https://www.javbus.com'
const DOMAIN2 = 'https://btsow.one/'
// 搜索关键词
const USERNAME = '明里つむぎ'
// 同一时间发起的请求数量
const THREAD_COUNT = 3
// 搜索第一页的参数拼接
const FIRST_PART_API = `${DOMAIN}/search/${encodeURI(USERNAME)}`
// 固定值，一般不用修改
const OTHER_PART_API = `${DOMAIN2}/graphql/query/`
// 固定值，一般不用修改
const HOMEPAGE_HASH = 'bfa387b2992c3a52dcbe447467b4b771'

module.exports = {
    COOKIE,
    PROXY,
    USERNAME,
    THREAD_COUNT,
    FIRST_PART_API,
    OTHER_PART_API,
    HOMEPAGE_HASH,
}
