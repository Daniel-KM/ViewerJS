"use strict";
require('shelljs/global');

const shell      = require('shelljs'),
      path       = require('path'),
      fs         = require('fs'),
      releaseDir = './release',
      sourceDir  = './src',
      sourcePdf  = './node_modules/pdfjs-dist',
      sourceVideo  = './node_modules/video.js',
      // The library of OpenDocument is looked for in the package when it is
      // installed, then in the directory where it can be dropped by hand, see
      // "README.md". When neither holds it, the one of the release is kept.
      sourcesOdf = ['./node_modules/node-webodf/dist/webodf.js',
          './vendor/webodf/webodf.js'],
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
const sourceOdf = sourcesOdf.map(p => path.resolve(p)).find(fs.existsSync);
if (sourceOdf) {
    shell.cp(sourceOdf, releaseDir);
} else {
    console.info('WebODF was not found: the library of the release is kept.'
        + ' See "README.md" to install or to drop it.');
}
shell.rm('-rf', releaseDir + '/video-js');
shell.cp('-R', path.resolve(sourceVideo, './dist/'), releaseDir + '/video-js');
shell.rm('-rf', releaseDir + '/video-js/examples');
shell.rm('-rf', releaseDir + '/video-js/types');
shell.rm('-rf', releaseDir + '/video-js/*.zip');
// video.js publishes some of its files with the bit of execution set and the
// copy keeps the modes, so the files of the release would not be plain ones.
shell.find(releaseDir + '/video-js')
    .filter(name => shell.test('-f', name))
    .forEach(name => shell.chmod(644, name));
shell.cp(path.resolve(sourceDir, 'ODFViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'PDFViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'HTMLViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'TextViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'ImageViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'MultimediaViewerPlugin.js'), releaseDir);
shell.cp(path.resolve(sourceDir, 'UnknownFilePlugin.js'), releaseDir);

// The versions of the viewer and of the libraries it embeds, read from the
// packages that are installed, so the built viewer never states a stale one.
const version = packagePath => {
    return JSON.parse(fs.readFileSync(path.resolve(packagePath, 'package.json'))).version;
};

// WebODF states its own version inside the library, whatever it was taken
// from: a package, a hand made copy or the release itself.
const versionOdf = () => {
    const library = path.resolve(releaseDir, 'webodf.js');
    const found = fs.existsSync(library)
        && /webodf_version *= *"v?([^"]*)"/.exec(fs.readFileSync(library, 'utf8'));
    return found ? found[1] : '';
};

const versions = {
    ViewerJS_version: version('.'),
    pdfjs_version: version(sourcePdf),
    videojs_version: version(sourceVideo),
    webodf_version: versionOdf(),
};

shell
    .cat([file('additionals.js'),
        file('viewer.js'),
        file('PluginLoader.js')])
    .sed(/^( *(?:var )?)(ViewerJS_version|pdfjs_version|videojs_version|webodf_version)( *= *)''/gm,
        (match, indent, name, equal) => indent + name + equal + "'" + versions[name] + "'")
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
