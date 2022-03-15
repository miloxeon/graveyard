---
sidebar_position: 6
title: Image Editor UI
---

You can allow your users to edit images right in the Uploader UI.

All the edits they do will be applied immutably as [transformations](imageTransformations.mdx).
After a user edited the image, you'll get the URL with transformations applied, so you can derive
both the original and resulting images.

## Installation

As a prerequisite, it's required that you have already installed [Uploader](../core/uploader.mdx),
as Image Editor is the plugin that works on top of it. Then, Image Editor is registered as a custom
tab.

### Global installation

```html
<script
	src="https://ucarecdn.com/libs/widget-tab-effects/1.x/uploadcare.tab-effects.min.js"
	charset="utf-8"
></script>
```

### NPM

```jsx
npm i --save uploadcare-widget-tab-effects
import uploadcareTabEffects from 'uploadcare-widget-tab-effects'
```

### Registering a custom tab

```jsx
uploadcare.registerTab('preview', uploadcareTabEffects)
```

After that, **effects toolbar** will show up in Uploader:

![](https://ucarecdn.com/162c17ca-ac71-4747-9659-876e66ab46fe/-/preview/-/format/auto/effectstoolbar.jpg)

## Configuration

You can specify the exact effects available to the users.

```jsx
<script>UPLOADCARE_EFFECTS = 'blur,sharp,grayscale'</script>
```

Default value is `crop,rotate,enhance,sharp,grayscale`. Here are available effects:

-  `crop`, crops images freely or using set aspect ratios
-  `enhance`, makes images look better via auto levels, auto contrast, and saturation sharpening
-  `rotate`
-  `mirror`
-  `flip`
-  `blur`
-  `sharp`
-  `grayscale`
-  `invert`

You can also specify `all` to allow all the available effects.

## Further reading

You can specify the effects not globally, but for the specific uploader instance. You can add other
custom tabs, including your own. You can adjust the styling, change text labels and locales with our
Localization API. You can open Uploader programmatically and listen to a multitude of granular
events we provide.

To learn more about Uploader, refer to the [Uploader documentation](../core/uploader.mdx).

To learn more about transformations available via Uploadcare CDN that aren't a part of Image Editor,
including AI upscale, auto-detecting and blurring faces and much more, refer to
[the full list of transformations](imageTransformations.mdx).
