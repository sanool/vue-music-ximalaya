module.exports = {
  proxy: {
    '/cd': { 
      target: 'http://www.ximalaya.com/revision/explore/guessYouLike',
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        // '^/guessYouLike': '/'   //需要rewrite的,
      }
    }
  }
}
