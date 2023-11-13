// 把之前安装到 node_modules 下的 puppeteer 模块加载进来
const puppeteer = require('puppeteer')
const url = 'https://www.imooc.com/read'
const $ = require('cheerio')

const run = async() => {
const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto(url)
const html = await page.content()
const books = $('.text_con',html)
let totalSold = 0
let totalSale = 0
const totalBooks = books.length


books.each(function(){
   const price = $(this).find('.sale').text().replace('¥','')
   const count = $(this).find('.info').find('span').last().text().replace('人已购买','')
   totalSold += Number(count)
   totalSale += Number(count) * Number(price)
 })

 console.log(
    `共 ${totalBooks} 本小册子`, 
    `共 ${totalSold} 人次购买`,
    `约 ${Math.round(totalSale / 10000)} 万`
  )
await browser.close()
}

run()