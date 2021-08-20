# PizzleJs

## PizzleJs is a Javascript library for animations

### Installation

```html
<!--Development-->
<script src="https://cdn.jsdelivr.net/npm/pizzle@1.0.0/dist/pizzle.js"></script>

<!--Production-->
<script src="https://cdn.jsdelivr.net/npm/pizzle@1.0.0/dist/pizzle.min.js"></script>
```
### Usage

```html
<div pizzle-start="app">
  <h1 pizzle-bounce="infinite 2000">I'm Bouncing</h1>
</div>
```

```js
var animate = new pizzle.create();
animate.init();
```