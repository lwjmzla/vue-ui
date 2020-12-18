
let isProd = process.env.NODE_ENV === 'production';
let publicPath = '/badminton';
let configObj = {
  publicPath: publicPath, // !设置 process.env.BASE_URL的值
  // configureWebpack: {
  //   devtool: process.env.NODE_ENV === 'development' ? 'source-map' : 'cheap-source-map'
  // },
  configureWebpack: config => { // !这里的config相当于配置好的baseConfig
    if (isProd) {
      // 生产环境
      // config.plugins.push(
      //   new CompressionWebpackPlugin({
      //     asset: '[path].gz[query]',
      //     algorithm: 'gzip',
      //     test: productionGzipExtensions,
      //     threshold: 10240, // 10240  = 10kb
      //     minRatio: 0.8
      //   })
      // );
      config.devtool = 'cheap-source-map';
      config.module.rules.push({
        test: /\.(js|css|vue)$/,
        loader: 'webpack-replace-loader',
        options: {
          arr: [
            { search: '/img', replace: `${publicPath}/img`, attr: 'g' }
          ]
        }
      });
    } else {
      // 开发环境
      config.devtool = 'source-map';
    }
  },
  lintOnSave: false, // !关闭webpack的eslint提示
  devServer: {
    overlay: { // !关闭webpack的eslint提示
      warnings: false,
      errors: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // @/ 是 src/ 的别名
        prependData: `@import "~@/styles/variables.scss";` // !当前sass-loader为"version": "8.0.2"，所以用prependData属性，否则用additionalData
      }
    }
  },
  chainWebpack: (config) => { // ! 主要作用 更细粒度的控制某些已经配置过的loader的内部配置
    config.plugins.delete('prefetch'); // !删除预加载，变成懒加载  优化首屏加载 还可以用 SplitChunksPlugin
    /* 添加分析工具 */
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) { // !npm run build --report执行
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) // !其实这一串更适合写在configureWebpack里，其实觉得chainWebpack有点乱
          .end();
      }
    }
    // !在vue-cli  chainWebpack  就各种bug 好奇葩
    // !https://cli.vuejs.org/zh/guide/webpack.html#替换一个规则里的-loader
    // !https://www.jianshu.com/p/3529d2d1e2f9/    vue-cli-service inspect  'image-webpack-loader' https://segmentfault.com/q/1010000016724383
  }
};
module.exports = configObj;
