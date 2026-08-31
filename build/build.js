"use strict";
require('shelljs/global');

const shell      = require('shelljs'),
      path       = require('path'),
      fs         = require('fs'),
      releaseDir = './release',
      sourceDir  = './src',
      sourcePdf  = './node_modules/pdfjs-dist',
      sourceVideo  = './node_modules/video.js',
      file       = filename => {
          return path.resolve(sourceDir, filename)
      };

shell.cp(path.resolve(sourceDir, 'index.html'), releaseDir);
shell.cp(path.resolve(sourceDir, 'example.local.css'), releaseDir);
shell.cp(path.resolve(sourcePdf, './build/pdf.min.js'), releaseDir);
shell.cp(path.resolve(sourcePdf, './build/pdf.worker.min.js'), releaseDir);
shell.sed('-i', /pdf\.worker/g, 'pdf.worker.min', releaseDir + '/pdf.min.js');
shell.cp(path.resolve(sourcePdf, './web/compatibility.js'), releaseDir);
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
