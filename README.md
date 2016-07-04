# Am I Visible?

AMIVisible (or simply AMI for close friends) is a dependency-free micro tool (735 bytes min+gz) written in vanilla JavaScript for checking when an element appears or disappears from the viewport.

AMI implements throttling mechanisms in order to not flood the main JS thread on scroll events and also supports event delegation.

## Installation

* Run `bower install --save amivisible`
* Add the script tag `<script src="bower_components/amivisible/lib/bundle.min.js"></script>`
* You are ready to go!

## API

### `AMIVisible.monitor`
____
The main method to start monitoring an element.

```js
AMIVisible.monitor(element, options);
```

#### Options

| key | type | default | description |
| ------------- | ------------- | ------------- | ------------- |
| force_process  | boolean | false | Checks the element state immediately without waiting for next scroll event  |
| enable_bubbling  | boolean | false | Enabled event bubbling for Event Delegation  |

### `AMIVisible.set`
____
Change the default AMI's internal options.

```js
AMIVisible.set(key, newValue);
```

#### Available settings

| key | type | default | description |
| ------------- | ------------- | ------------- | ------------- |
| throttle_window  | Number | 90 | The window (in milliseconds) before making a new scroll calculation  |

## Usage

### Basic usage

```js
var element = document.getElementById('fancy-element');

element.addEventListener('appear', function() {
  console.log('element appeared on the screen!');
});

element.addEventListener('disappear', function() {
  console.log('element vanished from the screen!');
});

AMIVisible.monitor(element);
```

### Advanced usage (Event Delegation)

```js
var element = document.getElementById('fancy-element');

document.body.addEventListener('appear', function(event) {
  if(event.target === element) {
    console.log('element appeared on the screen!');
  }
});

document.body.addEventListener('disappear', function(event) {
  if(event.target === element) {
    console.log('element vanished from the screen!');
  }
});

AMIVisible.monitor(element, {
  force_process: true, // immediately checks if the element is visible or not
  enable_bubbling: true // bubbles the event, useful for event delegation
});
```

## Known issues

* There is currently no way to stop monitoring an object.
* There is no way to change the scroll parent for specific elements. We can only check for window scroll now.

## Compatibility

Tested on Chrome, Firefox and Safari
