/**
 * Warning: not ready for use!
 * Script for controlling the foldout chat widget, to be embedded on client site
 * @param {Object} $ The jQuery object
 * @param {Object} opekaMultiWidget Object containing various settings
 * See embed.html for example values
 */
function multiWidgetController($, opekaMultiWidget) {
  this.chatCollection = {};
  this.chatType = opekaMultiWidget.chat1.chatType || "pair";
  this.chatURL = opekaMultiWidget.chat1.baseURL + '/opeka-widgets/inline/' + this.chatType +'?client_url=' + opekaMultiWidget.chat1.clientURL;
  this.chatName = opekaMultiWidget.chat1.chatName;
  this.cssFiles = opekaMultiWidget.cssFiles;
  this.embedLocation = opekaMultiWidget.embedLocation;
}

multiWidgetController.prototype = {
  constructor: multiWidgetController,
  /**
    * Init function
    */
  init: function () {
    $ = jQuery;
    this.addopekaMultiWidgetCss();
    this.addEmbedHTML(this.chatName);
    this.foldoutAnimation(this.chatName);
  },
  /**
    * Add custom CSS file to HEAD
    * @param {string} cssId Id of the css file - the name of the CSS file
    * @param {string} cssPath Absolute path to the directory of the CSS file
    */
  addopekaMultiWidgetCss:function ()  {
    var cssFiles = this.cssFiles;
    // Check if there's any css files to add. The cssFiles global is initialized in embed.html
    // the array is defined and has at least one element
    if (typeof cssFiles !== 'undefined' && cssFiles.length > 0) {
      /* Add CSS files to HEAD */
      $.each( cssFiles, function( i, val ) {
        if (!document.getElementById(cssFiles[i][0])) {
          var head  = document.getElementsByTagName('head')[0];
          var link  = document.createElement('link');
          link.id   = cssFiles[i][0];
          link.rel  = 'stylesheet';
          link.type = 'text/css';
          link.href = cssFiles[i][1]+cssFiles[i][0];
          link.media = 'all';
          head.appendChild(link)
        }
      });
    }
  },

  addEmbedHTML:function ()  {
    $( this.embedLocation ).append( '<div class="opeka-chat-foldout-wrapper '+this.chatName+'"><div id="opeka-chat-iframe-'+this.chatName+'"><iframe src="' + this.chatURL + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" height="200"></iframe></div></div>' );
  },
  //Foldout animation
  foldoutAnimation: function (chatName)  {
    $(".opeka-chat-foldout-wrapper."+chatName).hover(
      function() {
        $(this).stop(true,true).animate({
          right: 0
        },200);
      },
      function() {
        $(this).stop(true,true).animate({
          right: -260
        },200);
      }
    );
  },
}

/*  function multiWidgetController(foldoutAction) {
    if ( popupAction === "Activate") {
      // @todo: some effect
    else if (popupAction === "Deactivate") {
      // @todo: some effect
    }
  }*/

  /**
   * Receive activate or deactive messages from the iframe
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
   */
/*  window.addEventListener("message", receiveMessage, false);

  function receiveMessage(event)
  {
    if (event.origin !== opekaMultiWidgetBaseURL) {
      console.log("Bad window");
      return;
    }
    else {
      multiWidgetController(event.data);
    }
  }*/
/*})(jQuery, opekaMultiWidget);*/
