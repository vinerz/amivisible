var AMIVisible = (function() {
  var targets = [];
  var scrollTimer, lastScrollFireTime, lastScrollPos;

  var visibleY = function(el) {
    var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height,
      el = el.parentNode;
    do {
      rect = el.getBoundingClientRect();
      if (top <= rect.bottom === false) return false;
      // Check if the element is out of view due to a container scrolling
      if ((top + height) <= rect.top) return false
      el = el.parentNode;
    } while (el != document.body);
    // Check its within the document viewport
    return top <= document.documentElement.clientHeight && (top + height) > 0;
  };

  var throttle = function() {
    var minScrollTime = 90;
    var now = new Date().getTime();

    if (!scrollTimer) {
      if (now - lastScrollFireTime > (3 * minScrollTime)) {
        checkElements();
        lastScrollFireTime = now;
        lastScrollPos = document.body.scrollTop;
      }

      scrollTimer = setTimeout(function() {
        scrollTimer = null;
        lastScrollFireTime = new Date().getTime();
        var pos = document.body.scrollTop;

        if (pos !== lastScrollPos) {
          checkElements();
        }

        lastScrollPos = pos;
      }, minScrollTime);
    }
  };

  var _checkSingleElement = function(el) {
    if(visibleY(el.element)) {
      if(el.lastState !== 'visible') {
        var fEvent = new CustomEvent('appear', {
      		bubbles: el.enable_bubbling,
      		cancelable: true
      	});
        el.element.dispatchEvent(fEvent);
        el.lastState = 'visible';
      }
    } else {
      if(el.lastState !== 'invisible') {
        var fEvent = new CustomEvent('disappear', {
      		bubbles: el.enable_bubbling,
      		cancelable: true
      	});
        el.element.dispatchEvent(fEvent);
        el.lastState = 'invisible';
      }
    }
  };

  var checkElements = function() {
    for(var i = 0, len = targets.length; i < len; i++) {
      _checkSingleElement(targets[i]);
    }
  }

  window.addEventListener('scroll', throttle);
  window.addEventListener('resize', throttle);

  return {
    monitor: function(el, options) {
      if(!options) {
        options = {};
      }

      options.force_process = options.force_process || false;
      options.enable_bubbling = options.enable_bubbling || false;

      if(el) {
        var obj = { element: el, lastState: null, enable_bubbling: options.enable_bubbling };
        targets.push(obj);

        if(options.force_process) {
          _checkSingleElement(obj);
        }
      }
    }
  };
})();
