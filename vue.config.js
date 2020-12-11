module.exports = {
  publicPath: '/badminton', // !设置 process.env.BASE_URL的值
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        prependData: `@import "~@/styles/variables.scss";` // !当前sass-loader为"version": "8.0.2"，所以用prependData属性，否则用additionalData
      }
    }
  }
};
