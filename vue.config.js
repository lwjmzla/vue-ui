
let isProd = process.env.NODE_ENV === 'production';
let publicPath = '/badminton';
let configObj = {
  publicPath: publicPath, // !设置 process.env.BASE_URL的值
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'cheap-source-map'
  },
  // devServer: { // !关闭eslint
  //   overlay: {
  //     warnings: false,
  //     errors: false
  //   },
  //   lintOnSave: false
  // },
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        prependData: `@import "~@/styles/variables.scss";` // !当前sass-loader为"version": "8.0.2"，所以用prependData属性，否则用additionalData
      }
    }
  },
  chainWebpack: (config) => {
    // todo如果webpack-replace-loader或者string-replace-loader 用不了，注意打包的时候需要手动给全局/img 替换为/badminton/img
    // if (isProd) {
    // config.module
    //   .rule('replace')
    //   .use('webpack-replace-loader')
    //   .loader('webpack-replace-loader')
    //   .tap(options => {
    //     options = {
    //       arr: [
    //         { search: '/img', replace: `${publicPath}/img`, attr: 'g' }
    //       ]
    //     };
    //     return options;
    //   });
    // !在vue-cli  chainWebpack  就各种bug 好奇葩
    // !https://cli.vuejs.org/zh/guide/webpack.html#替换一个规则里的-loader
    // !https://www.jianshu.com/p/3529d2d1e2f9/    vue-cli-service inspect  'image-webpack-loader' https://segmentfault.com/q/1010000016724383
    // config.module
    //   .rule('replace')
    //   .use('string-replace-loader')
    //   .loader('string-replace-loader')
    //   .options({
    //     search: '/img',
    //     replace: `${publicPath}/img`,
    //     flags: 'g'
    //   });
  }
  // }
};
module.exports = configObj;
