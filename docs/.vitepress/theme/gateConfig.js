// ============================================================
// 公众号引流配置（编辑这里即可）
// ============================================================
// 如何修改口令：
// 1. 在浏览器控制台执行：btoa('新口令')  （例如 btoa('duang2026') → 'ZHVhbmcyMDI2'）
// 2. 把返回的字符串填到下面的 passcodeEncoded
// 3. 重新构建 / 热更新会自动生效
//
// 如何换二维码：
// 把公众号二维码图片放到 docs/public/wx-qr.png，然后 qrcode: '/wx-qr.png'
// ============================================================

export const gateConfig = {
  // 公众号名称（展示给访客看）
  wxName: '阿Duang的测开笔记',

  // 公众号里回复的关键词
  wxKeyword: '口令',

  // 二维码图片路径（放在 docs/public/ 下）。留空则不展示二维码
  qrcode: '',

  // 口令的 base64（当前明文：duang2026）
  passcodeEncoded: 'ZHVhbmcyMDI2',

  // 需要口令的路径前缀（命中即要求解锁；专栏首页 index 自动放行）
  gatedPrefixes: ['/testing-basics/', '/interviews/']
}
