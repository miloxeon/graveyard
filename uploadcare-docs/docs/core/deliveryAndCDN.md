---
sidebar_position: 4
title: Delivery and CDN
---

## Basic delivery with image link

Each uploaded image has a **UUID**, which is a unique identifier of that image.

You can get a link to the image like this:

```html
https://ucarecdn.com/:uuid/
```

```html
https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/
```

Notice the mandatory slash at the end of the URL. Without it, URL wouldn't work. We use it to allow
stacking transformations on top of each other.

## Optimizing delivery

You can allow Uploadcare choosing an image format for you based on the end user's device:

```
https://ucarecdn.com/:uuid/-/format/auto/
```

This is how we determine the best appropriate format:

-  First, we check the `Accept` header with MIME types. If it says that it supports WebP, we convert
   your image to WebP, which is often way smaller than JPEG.
-  If the end user's browser doesn't support WebP, and the image is fully opaque, we choose JPEG.
-  If the source image has any transparency, we're left with PNG.

Your original image will be left intact. Uploadcare CDN applies conversion on-the-fly, in an
immutable fashion.

`-/format/` is a transformation. Uploadcare supports a plethora of immutable transformations, from
adjusting the color to cropping and upscaling images with AI. Check out the
[full list of transformations](../platform/imageTransformations.mdx).

If your scenario supports modern JavaScript, you can drastically increase the delivery performance
by using [Device-aware Delivery](../platform/deviceAwareDelivery.mdx) — our free JS plugin that
analyzes the client's device, chooses an optimal way of delivery and **lazy-loads it** with optional
fade-in effect.

## Setting filenames

Setting a **filename** and **extension** will improve the UX for users downloading images. If a
filename is present, it will be recognized by the browser and used for the downloaded image file.

When using transformations, filename should always come last.

```html
https://ucarecdn.com/:uuid/[:filename.:extension]
https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/foo.jpg
https://ucarecdn.com/4da167c8-0b7c-4f77-95b0-c4565419e887/-/crop/200x200/foo.jpg
```

You can specify **any filename** and **any extension,** as long as the whole thing is a valid URI
string.

## Using Uploadcare with self-hosted images

You can use Uploadcare CDN with a **Proxy** without explicitly uploading images to Uploadcare.

With a slight modification of your original image link, Uploadcare will perform the following
actions:

-  Seamlessly upload the original image to Uploadcare;
-  Perform any requested transformations;
-  Deliver the image to any number of end users with Uploadcare CDN.

Proxy can
[dramatically increase your product's performance](https://uploadcare.com/blog/image-cdn-can-make-your-images-faster/).
Instead of serving an image from your server every time, you can serve it to Uploadcare just once,
and it will be served to your end users through our CDN with servers all over the world.

To use Uploadcare Proxy, you should do the following:

1. Go to the Dashboard Settings and choose the "Proxy" tab. Click "Connect".
2. Specify the **list of domain names** that host your images.

Now your images are accessible like this:

```html
https://:public_key.ucr.io/:link_to_original_image
https://6aa0351f18edf4fc9e13.ucr.io/https://example.com/cat.jpg
```

You can apply transformations like this:

```html
https://6aa0351f18edf4fc9e13.ucr.io/-/resize/500x500/-/brightness/10/https://example.com/cat.jpg
```

Uploadcare Proxy is a minimal, bare-bones solution. As of today, we offer Device-Aware Delivery, a
more sophisticated solution, at no additional cost.

## Getting file information

```jsx
;-/json/
```

This will return the following response:

```json
{
	"id": "1b192edb-212d-401a-ad9b-529047272e1b",
	"datetime_original": null,
	"orientation": null,
	"height": 1600,
	"width": 2400,
	"geo_location": null,
	"format": "JPEG",
	"hash": "940f5fd09aa48ddc"
}
```

The `hash` value is perceptual, e.g. based on image content. It will be the same regardless of the
original filename and can be used to quickly **compare the images** and **found duplicates**.

It's important to compare hashes bitwise. Small numbers of unmatching bits will mean small visual
changes. This approach is known as
[Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance).

You can also get the info in JSONP:

```json
-/jsonp/
```

Callback name should be `uploadcare_callback`. It should receive two arguments: ID and the response
object.

For unprocessed files, ID is equal to their UUID:

```
https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/jsonp/
> id: c5b7dd84-c0e2-48ff-babc-d23939f2c6b4
```

For processed files, ID is equal to their path excluding the `-/jsonp/` part:

```
https://ucarecdn.com/c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/crop/200x200/-/jsonp/
> id: /c5b7dd84-c0e2-48ff-babc-d23939f2c6b4/-/crop/200x200/
```

## Working with file groups

When using multiple file uploader, the uploaded images are assigned to a **group**. A group have its
own UUID, which is slightly different from the UUID of a single image:

```
https://ucarecdn.com/:uuid~:number_of_images_in_group/
https://ucarecdn.com/cd334b26-c641-4393-bcce-b5041546430d~11/
```

A group can contain up to 1000 files.

To access the certain image of the group, use `/nth/`:

```
https://ucarecdn.com/<group_UUID>/nth/1/
```

This link is no different from a regular image link. You can apply transformations and set a
filename:

```
https://ucarecdn.com/<group_UUID>/nth/1/-/crop/200x200/foo.jpg
```

### Downloading a group as an archive

```
/:group_uuid/archive/:format/
/:group_uuid/archive/:format/:filename
```

Total size of uncompressed files should be less than or equal to 2 GB.

Format can be either `tar` or `zip`. Filename is optional and works just like with images.

### Making a gallery from the image group

```
/:group_uuid/gallery/
```

A gallery will display a group of images on a single page. The gallery feature is powered by the
[Fotorama](https://fotorama.io/) JavaScript library.

You can use the URL inside an iframe:

```html
<iframe src="https://ucarecdn.com/:group_uuid/gallery/" width="100%" height="450"></iframe>
```

You can also configure Fotorama by passing the configuration options just like you pass Uploadcare
transformation parameters:

```
/:group_uuid/gallery/-/nav/thumbs/-/fit/cover/-/autoplay/1000/
```

The full list of Fotorama options is available at the
[Fotorama documentation](https://fotorama.io/docs/4/options/).
