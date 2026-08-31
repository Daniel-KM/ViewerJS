ViewerJS
========

[ViewerJS] is a document viewer written in html, css and javascript, that
displays common document formats directly in the browser, with a single unified
interface whatever the format is. It can be integrated in any html page without
any node dependency.

It combines a number of excellent open source tools:

- [WebODF] for the standard office formats of the [Document Foundation];
- [pdf.js], the library of Mozilla, for the standard portable document format (pdf);
- [video.js] for the audio and video files.

The images are displayed by the browser itself.

First version of ViewerJS was funded by [NLnet foundation] and developed by KO GmbH.
It was not updated since 2015. This fork maintains it with last versions of
libraries in order to be used in [Omeka S] via [module ViewerJs].


Supported formats
-----------------

| Type                      | Extensions                                      |
|---------------------------|-------------------------------------------------|
| OpenDocument text         | odt, fodt, ott                                  |
| OpenDocument presentation | odp, fodp, otp                                  |
| OpenDocument spreadsheet  | ods, fods, ots                                  |
| OpenDocument drawing      | odg, fodg, otg                                  |
| OpenDocument formula      | odf                                             |
| Portable document         | pdf, ai                                         |
| Image                     | apng, avif, bmp, gif, jpg, jpeg, png, svg, webp |
| Audio                     | aac, m4a, mp1, mp2, mp3, oga, ogg, wav          |
| Video                     | m4v, mp4, mpg, mpeg, ogv, webm                  |
| Html                      | html                                            |
| Plain text                | txt, json                                       |

A warning message is displayed when the format of the document is not supported.

For office documents, the bigger they are, the bigger should be the computer of
the visitor to display them. Because the standards of the [Document Foundation]
are "simple" and easy to manage, the library [WebODF] is mainly a stylesheet.
And because this is a true standard used without "transitional" non-standard
variants like Microsoft Office does for docx, pptx and xlsx, it is sustainable,
stable and available to anyone.


Changes from the original
-------------------------

- Display of the audio and video files (thanks to [Ryusei217]).
- Display of the image files (thanks to [Ryusei217]).
- Display of the html files, that can be used for docx with [mammoth].
- Display of the text files.
- A warning message when the document is not supported.
- Build with node, instead of make and cmake.
- Easier to use with node-js and express-js.
- No inline style and no inline script tags in "index.html".
- Availability on npm as "node-viewerjs".
- Support of the argument "?file=my-file.odt", instead of the hash "#my-file.odt",
  to specify the file to display.
- Update of the libraries pdf.js and video.js.
- Merge of the fixes and features from [h44z], [Ryusei217], [Ilkkah], [vandernorth],
  [boris-petrov], [cozy], [giftnuss] and [putuyuwono].
- Addition of the OpenDocument test files (from [WebODF]).


Supported browsers
------------------

Since pdf.js 4, the libraries are distributed as es modules only and they use
recent web features, so the viewer requires a browser released in 2024 or later.

|         | Desktop | Mobile |
|---------|---------|--------|
| Chrome  | 125     | 125    |
| Edge    | 125     | 125    |
| Firefox | 121     | 121    |
| Opera   | 111     | 83     |
| Safari  | 17.4    | 17.4   |
| Samsung | -       | 27     |

For older browsers, pdf.js provides a legacy build in "legacy/build", that may
be copied instead of "build" in the file "build/build.js", with the appropriate
polyfills.


Installation
------------

### Integration

The release in the directory "release" contains only static files, so it may be
copied directly in any web server. Node and npm are required to build it, not to
use it.

The files must be served through http: or https:, not file:. So a static server
should be used to run it locally, for example `python3 -m http.server` inside
the directory "release".

The same directory is published as one archive, "viewerjs-x.y.z.zip", with the
release of each forge, so that it is taken without cloning the repository or
building anything:

* [the releases of github](https://github.com/webodf/ViewerJS/releases)
* [the releases of gitlab](https://gitlab.com/Sempia/ViewerJS/-/releases)

### Development

To build it from the source:

```sh
npm install
npm run build
```

The libraries of pdf.js and of video.js are installed by npm. The one of WebODF
is not published on npm, so the build takes it from the first place
that holds it:

- "node_modules/node-webodf/dist/webodf.js", when the package is installed, for
  example with `npm install github:webodf/WebODF#v0.6.0`;
- "vendor/webodf/webodf.js", where the library can be dropped by hand: it is
  built with `npm pack` in the sources of WebODF, or taken from one of its
  releases;
- else the library of the directory "release" is kept as it is, and the build
  says it.

The version of WebODF that this release holds is 0.6.0, and it is stated in the
built viewer as `webodf_version`.


Usage
-----

The viewer is a standalone page, so the simplest way to include it in a site is
an iframe pointing to the file "index.html" of the release, with the url of the
document to display as argument:

```html
<iframe src="/viewer/index.html?file=/files/text.odt"></iframe>
```

The document may be set with the hash too:

```html
<iframe src="/viewer/index.html#/files/text.odt"></iframe>
```

With express-js, the release may be published as a static directory:

```javascript
var express = require('express'),
    app     = express();

app.use('/viewer', express.static('node_modules/node-viewerjs/release'));
```

Once installed and built, run `npm run test`, then go to http://localhost:5581/index.html#/files/text.odt
to check the result with the test files.


Warning
-------

Use it at your own risk.

It’s always recommended to backup your files and your databases and to check
your archives regularly so you can roll back if needed.


Troubleshooting
---------------

See online issues on the [library issues] page on GitHub.


License
-------

This library is published under the [GNU AGPL] license.

To use the old version of ViewerJS (the unmaintained one from KO GmbH, published
in 2015) in a commercial product, contact [license@viewerjs.org] for a
commercial license.

The [pdf.js] library is published under the [Apache] license.
The [video.js] library is published under the [Apache] license.
The [WebODF] library is published under the [GNU AGPL] license.

The viewer uses html, css and icons derived from the [pdf.js] project. Some
icons are derived from the [IconSweets] project, under a Creative Commons
Attribution 3.0 Unported license.


Copyright
---------

See full copyright in the details of each library.

[ViewerJS] and [WebODF] libraries:

* Copyright KO GmbH, 2013-2017

Javascript library [pdf.js]:

* Copyright Mozilla, 2011-2026

Javascript library [video.js]:

* Copyright Brightcove, 2010-2026

Fork of the library ViewerJS:

* Copyright Jeffrey van Norden, 2015-2022
* Copyright Daniel Berthereau, 2017-2026 (see [Daniel-KM])


[ViewerJS]: https://viewerjs.org
[WebODF]: https://github.com/kogmbh/WebODF
[pdf.js]: https://mozilla.github.io/pdf.js
[video.js]: https://videojs.com
[Document Foundation]: https://www.documentfoundation.org
[NLnet foundation]: https://nlnet.nl
[Omeka S]: https://omeka.org/s
[module ViewerJs]: https://gitlab.com/Daniel-KM/Omeka-S-module-ViewerJs
[mammoth]: https://github.com/mwilliamson/mammoth.js
[h44z]: https://github.com/h44z/ViewerJS
[Ryusei217]: https://github.com/Ryusei217/ViewerJS
[Ilkkah]: https://github.com/ilkkah/node-viewerjs-ilkkah
[vandernorth]: https://github.com/vandernorth/ViewerJS
[boris-petrov]: https://github.com/boris-petrov/ViewerJS
[cozy]: https://github.com/cozy/ViewerJS
[giftnuss]: https://github.com/giftnuss/ViewerJS
[putuyuwono]: https://github.com/putuyuwono/ViewerJS
[library issues]: https://github.com/webodf/ViewerJS/issues
[GNU AGPL]: https://www.gnu.org/licenses/agpl-3.0.html
[Apache]: https://github.com/mozilla/pdf.js/blob/master/LICENSE
[license@viewerjs.org]: mailto:license@viewerjs.org
[IconSweets]: http://www.iconsweets.com
[Daniel-KM]: https://gitlab.com/Daniel-KM "Daniel Berthereau"
