/*
 * Sina 7x24 News
 *
 * http://finance.sina.com.cn/7x24/
 *
 * API Endpoint:https://zhibo.sina.com.cn/api/zhibo/feed?callback=sina&page=1&page_size=30&zhibo_id=152&tag_id=0&dire=f&dpc=1&pagesize=30&type=0
 *
 * Parameters:
 * - callback: optional string。JSONP 回调函数的名称。如果省略，直接返回 JSON 数据。
 * - dire: string。含义未知，设为 f。
 * - page：number。当前所在的页面，默认为第1页。
 * - page_size: optional number, default 30。返回的条目数量。
 * - dpc: number。含义未知，设为1。
 * - type: number。含义未知，设为0。
 * - zhibo_id：number。固定为 152。
 * - tag_id：number。分类，0 表示全部。
 * - id: number，optional。当前的新闻条目 id，无效果。
 * - _：number，optional。当前时间戳，`Date.now()`，无效果。
 *
 * Return Value
 *
 * - if with parameter `callback=fn`, return
 * ```
 * try {
 *   jQuery1112024942892104039993_1607943165149({
 *     result: {
 *       ...
 *     }
 *   });
 * } catch (e) {}
 * ;
 * ```
 *
 * - if without parameter callback, return
 * ```
 * {
 *   result: {
 *     data: {
 *       feed: {
 *         html: "",
 *         list: [
 *           {
 *              create_time: "2020-12-14 19:08:25",
 *              creator: "wangting6@staff.sina.com.cn",
 *              docurl: "https://finance.sina.cn/7x24/2020-12-14/detail-iiznezxs6893884.d.html",
 *              id: 1930071,
 *              mender: "wangting6@staff.sina.com.cn",
 *              multimedia: "",
 *              rich_text: "  德国卫生部发言人：重申我们预计欧洲药品管理局（EMA）将在12月底批准BIONTECH的新冠疫苗。",
 *              tag: [{ id: "102", name: "国际" }],
 *              type: 0,
 *              top_value: 0,
 *              update_time: "2020-12-14 19:08:32",
 *              zhibo_id: 152,
 *           },
 *         ],
 *         maxid: 1930071,
 *         min_id: 1930071,
 *         page_info: {firstPage: 1, lastPage: 12, nextPage: 2, pName: "page", page: 1, pageSize: 1, prePage: 1, totalNum: 12, totalPage: 12},
 *         survey_id: []
 *       },
 *       focus: [],
 *       top: {},
 *       zhibo: []
 *     },
 *     status: {code: 0, msg: "OK"},
 *     timestamp: "Mon Dec 14 19:10:02 +0800 2020"
 *   }
 * }
 * ```
 *
 */

const endpoint = 'https://zhibo.sina.com.cn/api/zhibo/feed';
const params = new URLSearchParams({
  page: 1,
  page_size: 100,
  zhibo_id: 152,
  tag_id: 0,
  dire: 'f',
  dpc: 1,
  type: 0,
});

module.exports = {
  endpoint,
  params,
  url: endpoint + '?' + params.toString(),
};

