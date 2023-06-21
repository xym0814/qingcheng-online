// const IS_PROD = ['production', 'dev'].includes(process.env.NODE_ENV)
module.exports = {
  lintOnSave: false,
  devServer: {
    hot: true, // 热加载
    inline: true,  // 实时刷新
    open: true,
    port: 8080,
  },
  // chainWebpack: config => {
  //   config.resolve.symlinks(true);
  // },
  publicPath: "./",
  // assetsDir: "static",
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  css: {
    // extract: IS_PROD,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      less: {
        lessOptions: {
          // If you are using less-loader@5 please spread the lessOptions to options directly
          modifyVars: {
            "primary-color": "#1DA57A",
            "link-color": "#1DA57A",
            "border-radius-base": "2px",
          },
          javascriptEnabled: true,
        },
      },
    },
    // modules: false
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "青程在线";
      return args;
    });
  },
  // chainWebpack: config => {
  //   // 修复HMR
  //   config.resolve.symlinks(true);
  // },
};
