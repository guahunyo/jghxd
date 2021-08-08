const cheerio = require('cheerio')
const request = require('superagent')
require('superagent-proxy')(request)

const { COOKIE, PROXY, FANHAO_API, BT_API } = require('./config.js')

class Crawler {
  constructor() {
    this.pageIndex = 1
    this.pageCount = -1
    this.init()
  }

  init() {
    this.fetchData()
  }

  /**
   * 获取第一页的番号数据
   */
  async fetchData() {
    // console.log(FANHAO_API)
    try {
      let page = 1;
      let results = [];
      // const fetchbt = async (search) => {
      //   const res = await request.get(`${BT_API}/${search}`).set({ cookie: COOKIE }).proxy(PROXY)
      //   const $ = cheerio.load(res.text)
      //   console.log('111', res)
      // }
      const fnbt = async (results) => {
        let current = 0;
        let len = results.length;
        while(current < len) {
          const res = await request.get(`https://sukebei.nyaa.si/?q=${results[current].id}`).set({ cookie: COOKIE }).proxy(PROXY)
          const $ = cheerio.load(res.text)
          $('.default').each(function (i, elem) {
            results[current].bt.push($(this).children('.text-center').find('a').next().attr('href').split('&dn=')[0])
          });
          current++
          if (current === len) {
            console.log('磁力爬取完毕', results)
          }
        }
      }
      const fn = async () => {
        const res = await request.get(`${FANHAO_API}/${page}`).set({ cookie: COOKIE }).proxy(PROXY)
        const $ = cheerio.load(res.text)

        $('.photo-info').each(function (i, elem) {
          results.push({
            id: $(this).children('span').children('date').html(),
            bt: [],
          });
        });
        
        const next = $('.pagination').children('li').last().text().trim();
        
        if (next === '下一頁') {
          page++;
          fn();
        } else {
          console.log('一共', results.length, '个番号， 开始爬取磁力。。。')
          fnbt(results)
        }
      }
      fn();
      
    } catch (err) {
      console.error('抓取第一页数据失败：', err)
    }
  }
}

new Crawler()
