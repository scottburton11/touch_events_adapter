(function() {
  window.TouchEvents = {
    touchHandler: function(event) {
      var first, simulatedEvent, touches, type;
      touches = event.changedTouches;
      first = touches[0];
      type = "";
      switch (event.type) {
        case "touchstart":
          type = "mousedown";
          break;
        case "touchmove":
          type = "mousemove";
          break;
        case "touchend":
          type = "mouseup";
      }
      simulatedEvent = document.createEvent("MouseEvent");
      simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
      first.target.dispatchEvent(simulatedEvent);
      if (event.type === "touchmove") {
        return event.preventDefault();
      }
    },
    setupTouch: function(selector) {
      selector || (selector = document);
      selector.addEventListener("touchstart", this.touchHandler, true);
      selector.addEventListener("touchmove", this.touchHandler, true);
      selector.addEventListener("touchend", this.touchHandler, true);
      return selector.addEventListener("touchcancel", this.touchHandler, true);
    },
    teardown: function(selector) {
      selector || (selector = document);
      selector.removeEventListener("touchstart", this.touchHandler);
      selector.removeEventListener("touchmove", this.touchHandler);
      selector.removeEventListener("touchend", this.touchHandler);
      return selector.removeEventListener("touchcancel", this.touchHandler);
    }
  };
}).call(this);
