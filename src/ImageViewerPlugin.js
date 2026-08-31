function ImageViewerPlugin() {
    "use strict";

    var imgElement = undefined,
        container = undefined,
        notified = false,
        self = this,
        rotation = 0,
        currentPage = 1;

    function initCSS() {
        /*var pluginCSS;

        pluginCSS = (document.createElementNS(document.head.namespaceURI, 'style'));
        pluginCSS.setAttribute('media', 'screen, print, handheld, projection');
        pluginCSS.setAttribute('type', 'text/css');
        pluginCSS.appendChild(document.createTextNode(ImageViewerPlugin_css));
        document.head.appendChild(pluginCSS);
        */
    }

    function initButtons() {
        var leftToolbar = document.getElementById('toolbarLeft');
        // hide unused elements
        document.getElementById("navButtons").style.display = 'none';
        document.getElementById("pageNumberLabel").style.display = 'none';
        document.getElementById("pageNumber").style.display = 'none';
        document.getElementById("numPages").style.display = 'none';
        leftToolbar.style.visibility = "visible";

        var buttonSeperator = document.createElement("div");
        buttonSeperator.setAttribute('class', 'splitToolbarButtonSeparator');

        var rotateLeft = document.createElement("button");
        rotateLeft.setAttribute('class', 'toolbarButton pageDown flipHorizontal');
        rotateLeft.setAttribute('title', 'Rotate left');

        var rotateRight = document.createElement("button");
        rotateRight.setAttribute('class', 'toolbarButton pageDown');
        rotateRight.setAttribute('title', 'Rotate right');

        leftToolbar.appendChild(rotateLeft);
        leftToolbar.appendChild(buttonSeperator);
        leftToolbar.appendChild(rotateRight);

        // Attach events to the above buttons
        rotateLeft.addEventListener('click', function () {
                imageRotateLeft();
        });
        rotateRight.addEventListener('click', function () {
                imageRotateRight();
        });
    }

    function imageRotateLeft() {
        if(rotation <= 0) {
            rotation = 360;
        }
        rotation -= 90;

        document.getElementById("image").className  = 'rotate' + rotation;
    }

    function imageRotateRight() {
        if(rotation >= 360) {
            rotation = 0;
        }
        rotation += 90;

        document.getElementById("image").className  = 'rotate' + rotation;
    }

    // The viewer is told once the image is there and not before: it scales
    // it then, and an image that has not been read yet has no size to scale.
    function notifyLoaded() {
        if (!notified) {
            notified = true;
            self.onLoad();
        }
    }

    this.initialize = function (viewerElement, documentUrl) {
        // If the URL has a fragment (#...), try to load the file it represents
        imgElement=document.createElement("img");
        imgElement.setAttribute('alt', 'na');
        imgElement.setAttribute('id', 'image');
        imgElement.onload = notifyLoaded;
        imgElement.onerror = notifyLoaded;
        imgElement.setAttribute('src', documentUrl);

        document.getElementsByTagName("body")[0].className = 'image';

        container = viewerElement;
        viewerElement.appendChild(imgElement);
        viewerElement.style.overflow = "auto";

        initCSS();
        initButtons();

        // An image of the cache is there already, and fires no event.
        if (imgElement.complete) {
            notifyLoaded();
        }
    };

    this.isSlideshow = function () {
        return false;
    };

    this.onLoad = function () {};

    this.fitToWidth = function (width) {
        imgElement.width = width;
    };

    this.fitToHeight = function (height) {
        imgElement.height = height;
    };

    /**
     * Holds the image inside the page, in its width and in its height: the
     * side that is the most in the way settles the scale, so that the whole
     * of the image is seen at once. An image smaller than the page is left
     * at its own size rather than blown up, as the viewer of pdf does.
     */
    this.fitToPage = function (width, height) {
        var scale;
        if (!imgElement.naturalWidth || !imgElement.naturalHeight) {
            imgElement.width = width;
            return;
        }
        scale = Math.min(width / imgElement.naturalWidth,
                         height / imgElement.naturalHeight,
                         1);
        imgElement.width = imgElement.naturalWidth * scale;
    };

    /**
     * An image is one page: the whole of it is shown at once, where a
     * document of many pages fits its width alone. The height is the one of
     * the element the image sits in, which the viewer does not pass.
     */
    this.fitSmart = function (width) {
        var height = container && container.clientHeight;
        if (height) {
            self.fitToPage(width, height);
            return;
        }
        imgElement.width = width;
    };

    this.getZoomLevel = function () {
        return  imgElement.width / imgElement.naturalWidth;
    };

    this.setZoomLevel = function (value) {
        imgElement.width = value * imgElement.naturalWidth;
    };

    // return a list of tuples (pagename, pagenode)
    this.getPages = function () {
        return [1, 2];
    };

    this.showPage = function (n) {
        if(n === currentPage) {
            imgElement.parentNode.scrollTop -= 100;
        } else {
            imgElement.parentNode.scrollTop += 100;
        }
    };

    this.getPluginName = function () {
        return "ImageViewerPlugin";
    };

    this.getPluginVersion = function () {
        return "From Source";
    };

    this.getPluginURL = function () {
        return "https://github.com/in4mates/ViewerJS";
    };
}
