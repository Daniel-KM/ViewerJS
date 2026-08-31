/**
 * Multimedia Viewer Plugin using Video.js
 *
 * @author Christoph Haas <christoph.h@sprinternet.at>
 */
function MultimediaViewerPlugin() {
    "use strict";

    var videoElement = undefined,
        videoSource = undefined,
        player = undefined,
        self = this;

    this.initialize = function (viewerElement, documentUrl) {

        if(window.mimetype.indexOf("audio/") === 0) {
            document.getElementsByTagName("body")[0].className = 'multimedia audio';
            videoElement=document.createElement("audio");
            videoElement.setAttribute('poster', ' ');
        } else {
            document.getElementsByTagName("body")[0].className = 'multimedia video';
            videoElement=document.createElement("video");
        }
        videoElement.setAttribute('preload', 'auto');
        videoElement.setAttribute('id', 'multimedia_viewer');
        videoElement.setAttribute('controls', 'controls');
        videoElement.setAttribute('class', 'video-js vjs-default-skin');

        videoSource=document.createElement("source");
        videoSource.setAttribute('src', documentUrl);
        videoSource.setAttribute('type', window.mimetype);
        videoElement.appendChild(videoSource);

        videoElement.setAttribute('poster', "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", false);

        viewerElement.appendChild(videoElement);
        viewerElement.style.overflow = "auto";

        // init viewerjs
        player = videojs(
            videoElement,
            {
                controls:   'enabled',
                techOrder:  ['html5'],
                // Only 5, 10 and 30 are supported by video.js.
                controlBar: {
                    skipButtons: {
                        backward: 10,
                        forward:  10
                    }
                }
            },
            function() {
                // This is functionally the same as the previous example.
            }
        );

        // The player fills the page, and a video smaller than the page would
        // be blown up: it is held at its own size, the page keeping the
        // whole of it in sight either way. A sound has no size of its own.
        player.on('loadedmetadata', function () {
            var box = player.el();
            if (player.videoWidth() && player.videoHeight()) {
                box.style.maxWidth = player.videoWidth() + 'px';
                box.style.maxHeight = player.videoHeight() + 'px';
            }
        });

        self.onLoad();
    };

    this.isSlideshow = function () {
        return false;
    };

    this.onLoad = function () {
    };

    this.fitToWidth = function (width) {
    };

    this.fitToHeight = function (height) {
    };

    this.fitToPage = function (width, height) {
    };

    this.fitSmart = function (width) {
    };

    this.getZoomLevel = function () {
    };

    this.setZoomLevel = function (value) {
    };

    // return a list of tuples (pagename, pagenode)
    this.getPages = function () {
        return [videoElement];
    };

    this.showPage = function (n) {
        // hide middle toolbar
        document.getElementById('toolbarMiddleContainer').style.visibility = "hidden";
    };

    this.getPluginName = function () {
        return "MultimediaViewerPlugin";
    };

    this.getPluginVersion = function () {
        return "From Source";
    };

    this.getPluginURL = function () {
        return "https://sprinternet.at";
    };
}
