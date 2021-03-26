export type DOMEventName =
    | 'abort'
    | 'afterblur'
'animationiteration' |
    'animationend' |
    'animationstart'
    | 'beforeblur' // Not a real event. This is used by event experiments.
    | 'canplay'
    | 'canplaythrough'
    | 'cancel'
    | 'change'
    | 'click'
    | 'close'
    | 'compositionend'
    | 'compositionstart'
    | 'compositionupdate'
    | 'contextmenu'
    | 'copy'
    | 'cut'
    | 'dblclick'
    | 'auxclick'
    | 'drag'
    | 'dragend'
    | 'dragenter'
    | 'dragexit'
    | 'dragleave'
    | 'dragover'
    | 'dragstart'
    | 'drop'
    | 'durationchange'
    | 'emptied'
    | 'encrypted'
    | 'ended'
    | 'error'
    | 'focusin'
    | 'focusout'
    | 'gotpointercapture'
    | 'input'
    | 'invalid'
    | 'keydown'
    | 'keypress'
    | 'keyup'
    | 'load'
    | 'loadstart'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'lostpointercapture'
    | 'mousedown'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'paste'
    | 'pause'
    | 'play'
    | 'playing'
    | 'pointercancel'
    | 'pointerdown'
    | 'pointerenter'
    | 'pointerleave'
    | 'pointermove'
    | 'pointerout'
    | 'pointerover'
    | 'pointerup'
    | 'progress'
    | 'ratechange'
    | 'reset'
    | 'scroll'
    | 'seeked'
    | 'seeking'
    | 'selectionchange'
    | 'stalled'
    | 'submit'
    | 'suspend'
    | 'textInput' // Intentionally camelCase. Non-standard.
    | 'timeupdate'
    | 'toggle'
    | 'touchcancel'
    | 'touchend'
    | 'touchmove'
    | 'touchstart'
    // These are vendor-prefixed so you should use the exported constants instead:
    // 'transitionend' |
    | 'volumechange'
    | 'waiting'
    | 'wheel';