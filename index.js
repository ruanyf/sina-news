const fetch = require('node-fetch');
const AbortController = require('abort-controller');
const { url } = require('./sina.js');
const Feed = require('feed').Feed;
const fs = require('fs/promises');
const process = require('process');

const controller = new AbortController();
// 30 秒后取消请求
const timeout = setTimeout(
  () => { controller.abort(); },
  30000,
);

const feed = new Feed({
  title: '新浪新闻',
  description: '新浪全球实时财经新闻直播',
  link: 'https://ruanyf.github.io/sina-news/',
  language: 'zh-CN',
  generator: 'sina news feed generator',
  feedLinks: {
    json: 'https://ruanyf.github.io/sina-news/rss.json',
    rss: 'https://ruanyf.github.io/sina-news/rss.xml'
  },
});


const filterArr = [
  '比特币',
  '以太坊',
  '莱特币',
  '瑞波币',
  '疫苗',
  '疫情',
  '新冠',
  '央行',
  '联储',
  '中央银行',
  '财长',
  '财政部',
  '参议院',
  '众议院',
];

async function main() {

    const response = await fetch(url, {
      headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10130'},
      signal: controller.signal
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error('wrong status code');
    }

    const json = await response.json();
    console.log(`successfully fetch the feed.`);

    const result = json.result || {};
    if (!result.status || result.status.code !== 0) return;
    const items = result.data.feed.list;
    console.log(`successfully parse the feed.`);

    items.forEach(item => {
      if (!item.rich_text) return;

      // text filter
      for (let i = 0; i < filterArr.length; i++) {
        if (item.rich_text.includes(filterArr[i])) {
          // console.log(item.rich_text);
          return;
        }
      }

      // tag filter
      if (item.tag && Array.isArray(item.tag) && item.tag.length) {
        const tags = item.tag;
        const tagFilterArr = ['5', '6', '7', '9'];
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i].id;
          if (tagFilterArr.includes(tag)) {
            // console.log(item.rich_text);
            return;
          }
        }
      }

      feed.addItem({
        title: item.rich_text,
        id: item.id,
        link: item.docurl,
        content: '',
        date: new Date(item.create_time + '+08:00'),
      });
    });
    console.log(`successfully generating new feed.`);

    await fs.rmdir('./dist', { recursive: true });
    console.log(`successfully deleted ./dist`);

    await fs.mkdir('./dist');
    console.log(`successfully create ./dist`);

    await fs.writeFile('./dist/rss.json', feed.json1());
    console.log(`successfully write rss.json`);

    await fs.writeFile('./dist/rss.xml', feed.rss2());
    console.log(`successfully write rss.xml`);

    await fs.copyFile('./template/index.html', `./dist/index.html`);
    await fs.copyFile('./template/page.js', `./dist/page.js`);
    console.log(`successfully copy asset files`);

}

main()
.catch(err => {
  console.log(err);
  process.exit(1);
})
.finally(() => {
  clearTimeout(timeout);
});
