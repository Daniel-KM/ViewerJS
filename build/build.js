"use strict";
require('shelljs/global');

const shell      = require('shelljs'),
      path       = require('path'),
      fs         = require('fs'),
      releaseDir = './release',
      sourceDir  = './src',
      sourcePdf  = './node_modules/pdfjs-dist',
      sourceVideo  = './node_modules/video.js',
      sourceOdf  = './node_modules/node-webodf',
      file       = filename => {
          return path.resolve(sourceDir, filename)
      };

shell.cp(path.resolve(sourceDir, 'index.html'), releaseDir);
shell.cp(path.resolve(sourceDir, 'example.local.css'), releaseDir);
// Since version 4, pdf.js is distributed as an es module only and the file
// "compatibility.js" does not exist any more.
shell.cp(path.resolve(sourcePdf, './build/pdf.min.mjs'), releaseDir);
shell.cp(path.resolve(sourcePdf, './build/pdf.worker.min.mjs'), releaseDir);
// The library that draws the documents of OpenDocument is taken from its
// package, as the ones of pdf and of video are: it is built when the package
// is installed, see its "prepare".
shell.cp(path.resolve(sourceOdf, './dist/webodf.js'), releaseDir);
shell.rm('-rf', releaseDir + '/video-js');
shell.cp('-R', path.resolve(sourceVideo, './dist/'), releaseDir + '/video-js');
shell.rm('-rf', releaseDir + '/video-js/examples');
shell.rm('-rf', releaseDir + '/video-js/types');
shell.rm('-rf', releaseDir + '/video-js/*.zip');
shell.cp(path.resolve(sourceDir, 'ODFViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'PDFViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'HTMLViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'TextViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'ImageViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'MultimediaViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'UnknownFilePlugin.js'), releaseDir);

shell
    .cat([file('additionals.js'),
        file('viewer.js'),
        file('PluginLoader.js')])
    .to(path.resolve(releaseDir, 'viewer.js'));

shell
    .cat([file('ODFViewerPlugin.css'),
        file('PDFViewerPlugin.css'),
        file('ImageViewerPlugin.css'),
        file('UnknownFilePlugin.css'),
        file('viewer.css')
        //,file('viewerTouch.css')
    ])
    .to(path.resolve(releaseDir, 'viewer.css'));

console.info('Build Ok');
