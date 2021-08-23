
let isProd = process.env.NODE_ENV === 'production';
const merge = require('webpack-merge');
let publicPath = '/badminton';
const cdnMap = {
  css: [
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.3/vuex.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.6/vue-router.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/locale/zh-CN.min.js'
  ]
};
// 需要扩展的资源
const externals = {
  vue: 'Vue',
  vuex: 'Vuex',
  'vue-router': 'VueRouter',
  'element-ui': 'ELEMENT',
  'axios': 'axios'
};
const regDev = RegExp(/development/);
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
    config.plugins.delete('preload');
    /* 添加分析工具 */
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) { // !npm run build --report执行
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin) // !其实这一串更适合写在configureWebpack里，其实觉得chainWebpack有点乱
          .end();
      }
    }
    // 外部扩展
    config.externals((regDev.test(process.env.NODE_ENV)) ? {} : externals);
    config.plugin('html').tap(args => {
      args[0].cdn = (regDev.test(process.env.NODE_ENV)) ? {} : cdnMap;
      args[0].title = 'test';
      return args;
    });
    // worker配置
    config.module
      .rule('worker')
      .test(/\.worker\.js$/i)
      .use('worker-loader')
      .loader('worker-loader')
      .tap(options => merge(options, {
        worker: {
          type: 'SharedWorker',
          options: {
            name: 'sharedWorkerName'
          }
        }
      }))
      .end();
    config.module.rule('js').exclude.add(/\.worker\.js$/i);
    // config
    //   .plugin('html')
    //   .tap(args => {
    //     console.log(args);
    //     args[0].title = 'test';
    //     return args;
    //   });
    // !在vue-cli  chainWebpack  就各种bug 好奇葩
    // !https://cli.vuejs.org/zh/guide/webpack.html#替换一个规则里的-loader
    // !https://www.jianshu.com/p/3529d2d1e2f9/    vue-cli-service inspect  'image-webpack-loader' https://segmentfault.com/q/1010000016724383
  }
};
module.exports = configObj;
