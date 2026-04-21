// Cloudflare Pages 的构建配置
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 重定向到首页
    if (url.pathname === '/') {
      return Response.redirect(url.origin + '/index.html', 301)
    }

    return env.ASSETS.fetch(request)
  }
}