var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
  name: 'google play scraper',
  description: 'To get google play comments',
  script: 'D:\\Projects\\gplayscraper\\index.js'
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
  console.log('Install complete.')
  svc.start()
})

svc.install()
