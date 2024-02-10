# 📱 PWACSS
**THE** normalize for PWA. It focuses on new browser features and improving the UX.

**Do choose this** if you're planning on building a PWA and need a no-brainer, unopinionated boilerplate which'll make you write a lot less of useless, repetitive code while making your UI render more predictable.

## What it does?

1. Removes the default margin from `body`
2. Sets `box-sizing` to `border-box` for all elements including pseudos
3. Sets `backface-visibility` to `hidden` to prevent typefaces from turning blurry with `transform` properties in old browsers
4. Ensures that `[hidden]` elements will be hidden
5. Enables some ligatures but not all of them
6. Optimizes typeface smoothing and legibility
7. Sets the system UI typeface as the default
8. Turns images into blocks so text wraps above and below them
9. Prevents images from being resized more than their actual size
10. Makes HTML fully responsive by default: images, canvases, tables and other less usual tags
11. Sets a monospace font and tabs of width 4 for `code` and `pre`
12. Only let users resize `textarea`s vertically
13. Makes the typeface in `input`s the same as the typeface on your website itself
14. Uses appropriate cursor based on aria-attributes
15. Disable IOS quirks that aren't useful for PWA, making your UI more predictable and less fragile across different devices. 

## Usage
```HTML
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mvoloskov/pwacss/pwacss.min.css">
```
