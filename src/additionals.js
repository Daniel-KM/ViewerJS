// The versions are filled by the build from "package.json" and from the
// packages that are installed, so they are never stale. They stay empty when
// the sources are used directly, without a build.
var ViewerJS_version = '',
    pdfjs_version    = '',
    videojs_version  = '',
    webodf_version   = '';

function loadPlugin( pluginFile, callback ) {
    "use strict";
    var script    = document.createElement('script');
    script.async  = false;
    script.onload = callback;
    script.src    = pluginFile;
    script.type   = 'text/javascript';
    document.head.appendChild(script);
}
