---
sidebar_position: 1
title: Quick Start
---

## Get the API key

[Sign up](https://uploadcare.com/accounts/signup/) or log in. Proceed to the "API keys" section:

<img src="https://ucarecdn.com/9be65085-9625-44da-8aea-b2fede89a676/-/preview/-/format/auto/apikeys.png" alt="API keys" width={220} />

You'll see the public key that is used to identify your project:

![Public key](https://ucarecdn.com/66d140ed-c9b3-4073-8f37-74305622828f/-/preview/-/format/auto/publickey.png)

## Install the uploader

Paste this code into the `<head>` tag, using your public key:

```html
<script>
	UPLOADCARE_PUBLIC_KEY = '6aa0351f18edf4fc9e13'
</script>
<script src="https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js"></script>
```

Add the Uploader to your web page:

```html
<input type="hidden" role="uploadcare-uploader" name="my_file_input" />
```

Now you should see the Uploadcare Widget on your page:

<img src="https://ucarecdn.com/37f2b572-29ac-43e4-8b31-a139ed378b9a/-/preview/-/format/auto/widget.png" alt="Uploadcare Widget" width={440} />

Your users will use it to upload their images. Now every image that is uploaded ends up in the
**Files** section of your dashboard, and you can see them. **Try it!**

## Upload images

Click an uploader button. You should see the Uploader UI:

![Uploader UI](https://ucarecdn.com/5f1a177a-404a-42cf-951a-d1f2b9aed79e/-/preview/-/format/auto/uploaderui.png)

With the Uploader, your users can upload images from many sources.

## Use uploaded images

After uploading is complete, pictures will end up in the **Files** section of your dashboard:

![Files panel](https://ucarecdn.com/8c29050e-b986-4494-b6dc-0473dd530dd9/-/preview/-/format/auto/files.png)

Let's use the image we've just uploaded. Copy its UUID clicking three dots → **Copy UUID**:

![Copy UUID](https://ucarecdn.com/0a0055ba-b92e-47df-8266-82f4fb618ea3/-/preview/-/format/auto/copyuuid.png)

From the UUID, you can get the image link:

```
https://ucarecdn.com/<UUID>/
https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/
```

Notice the mandatory slash at the end of the URL. Without it, URL wouldn't work. We use it to allow
stacking transformations on top of each other.

Now you can use it on your webpage:

```html
<img
	alt="Fastest place on Earth"
	src="https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/"
/>
```

It works!

![Result](https://ucarecdn.com/b405a9ae-cc3f-423b-b40b-882bbea9722f/-/preview/-/format/auto/result.png)

## Apply transformations

Uploadcare transformations are **immutable** — you can stack as many of them as you'd like. They
work like pure functions and never change the original image.

Let's play with them. Let's crop the image to 800x600. Let's use not just any crop, but **smart
crop**, so the prominent object is automatically recognized and centered. Let's then increase
brightness, sharpen the image, and compress it with the **smart compression** that retains details
while keeping the file size low.

This is how to do it:

```jsx
'https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/' +
	'-/scale_crop/800x600/smart/' +
	'-/brightness/10/' +
	'-/sharp/10/' +
	'-/quality/smart/'
```

You obviously don't need JavaScript to do this, you can assemble the link manually:

```
https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/-/scale_crop/800x600/smart/-/brightness/10/-/sharp/10/-/quality/smart/
```

Use the new link:

```jsx live
function demo() {
	return (
		<img
			alt="Fastest place on Earth"
			src="https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/-/scale_crop/800x600/smart/-/brightness/10/-/sharp/10/-/quality/smart/"
		/>
	)
}
```

It worked! Yay!

Uploadcare applies transformations in real-time with unparalleled speed. Yes, it recognized the car,
cropped the image, so it's centered, adjusted brightness, increased sharpness and compressed the
image with a smart algorithm, so it's 72kb, all in an instant.

## Further steps

-  Get the
   [full list of transformations](../platform/imageTransformations.mdx#list-of-transformations)
   which you can combine as you want, recognize prominent colors, blur faces...
-  [In-depth Uploader guide](uploader.mdx): you can customize it, embed it, apply custom styles,
   translate it to different languages (though we already support many popular languages), add
   custom tabs, validate user uploads, let users crop images before they upload, support multiple
   files...
-  [Delivery methods overview](deliveryAndCDN.md): learn more about Uploadcare CDN, get image
   metadata in JSON, use Uploadcare features to process images that are not stored on Uploadcare...
-  [Full Dashboard overview](accountAndProjects.md): you can enable secure uploads, backups, delete
   uploaded images automatically every 24 hours, connect custom S3 instance, prevent unauthorized
   access to your images, customize OAuth...
-  [Platform features](../platform/aiImageRecognition.md): cut, compress and process videos, convert
   DOCX documents, use AI to recognize objects, use **Device-aware Delivery** to improve UX, and
   much more.
-  [REST API reference](restApi.md)
