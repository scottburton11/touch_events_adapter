window.TouchEvents = 
  # Translate touch events into custom mouse events.
  # Technique by Ross Boucher - http://ross.posterous.com/2008/08/19/iphone-touch-events-in-javascript/
  touchHandler: (event) ->
    touches = event.changedTouches
    first = touches[0]
    type = ""
    switch event.type 
      when "touchstart" then type = "mousedown"
      when "touchmove"  then type = "mousemove"
      when "touchend"   then type = "mouseup"

    simulatedEvent = document.createEvent "MouseEvent"
    simulatedEvent.initMouseEvent type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null

    first.target.dispatchEvent simulatedEvent
    event.preventDefault() if event.type is "touchmove"

  setupTouch: (selector) ->
    selector or= document
    selector.addEventListener "touchstart",   @touchHandler, true
    selector.addEventListener "touchmove",    @touchHandler, true
    selector.addEventListener "touchend",     @touchHandler, true
    selector.addEventListener "touchcancel",  @touchHandler, true

  teardown: (selector) ->
    selector or= document
    selector.removeEventListener "touchstart",   @touchHandler
    selector.removeEventListener "touchmove",    @touchHandler
    selector.removeEventListener "touchend",     @touchHandler
    selector.removeEventListener "touchcancel",  @touchHandler