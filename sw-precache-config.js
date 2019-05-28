module.exports = {
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js',
      'build/assets/css/**.css',
      'build/assets/js/**.js',
      'build/index.html'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    importScripts: (['./firebase-messaging-sw.js']),
    handleFetch: false
  }