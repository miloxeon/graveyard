# Bacon

[![NPM](https://nodei.co/npm/bacon.css.png?compact=true)](https://nodei.co/npm/bacon.css/)

> Everything is better with bacon.

Bacon is custom CSS reset, build for 8-Point grid. Inspired by [Normalize.css](https://necolas.github.io/normalize.css/).

## Usage
```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bacon.css/bacon.min.css">
```

## What's included?
1. Normalization _almost_ like Normalize.css, but almost all margins and paddings are zero.
2. Every heading, paragraph, button or other content-rich element will push away from the previous element by two grid points (16 px).
3. The elements wouldn't push away from the ceiling.

## Basic grid system
```CSS
/**
 * Every content-rich element will push away from the previous element by two grid points (16 px),
 */

h1,
h2,
h3,
h4,
h5,
h6,
p,
img,
video,
button {
  margin-top: 16px;
  margin-bottom: 0;
}

/**
 * ... but elements shouldn't push away from the ceiling.
 */

*:first-child {
  margin-top: 0;
}
```
