TouchEvents translator
======================
Translate touch events into custom mouse events.
Technique by Ross Boucher - http://ross.posterous.com/2008/08/19/iphone-touch-events-in-javascript/

Usage
-----
Initialize touch events for a selector:

    TouchEvents.setupTouch($(".my-selector")[0])

The `document.getElementById` style also works.

Purpose
-------
Devices that emit touch events in response to user touches will translate them into mouse events for you, but there's a catch: if you rely on the `mousemove` event while the mouse button is down, the events might not fire in the order you expect.

This technique intercepts the touch events and generates custom mouse events in the same order. This makes techniques involving `mousemove`, such as dragging, more predictable across devices.
