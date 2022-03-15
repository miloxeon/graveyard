---
sidebar_position: 2
title: AI Image Recognition
---

## Detect objects

These features work on a per-project basis and is currently in beta. Consider making a separate
project via your dashboard, and drop us a line with your feature request and the project’s Public
API Key at [sales@uploadcare.com](mailto:sales@uploadcare.com).

Object Recognition allows categorizing and tagging images. When using Uploadcare Object Recognition,
you get a list of objects detected in your image paired with confidence levels for every object
class.

![House](https://ucarecdn.com/8c016cd7-733c-4f95-967a-d13ca4c50a7d/-/preview/-/format/auto/house.png)

```json
"rekognition_info": {
	"Building": 0.63291,
	"House": 0.63291,
	"Housing": 0.63291,
	"Architecture": 0.63008,
	"Outdoors": 0.55667,
	"Cottage": 0.63291,
	"Pond": 0.55667,
	"Castle": 0.63008,
	"Moat": 0.63008,
	"Fort": 0.63008
}
```

---

![Downtown](https://ucarecdn.com/a2babafb-0558-4a41-8e81-8fa27567fdd4/-/preview/-/format/auto/city.png)

```json
"rekognition_info": {
	"Town": 0.91803,
	"City": 0.91803,
	"Nature": 0.56342,
	"High Rise": 0.81656,
	"Downtown": 0.86856,
	"Architecture": 0.79969,
	"Urban": 0.91803,
	"Building": 0.91803,
	"Landscape": 0.56342,
	"Skyscraper": 0.79969
}
```

---

![Artsy decor](https://ucarecdn.com/2eef1453-8c00-4ca2-8117-8e0ecc5173be/-/preview/-/format/auto/eastern.png)

```json
"rekognition_info": {
	"Art": 0.60401,
	"Home Decor": 0.719,
	"Ornament": 0.60401,
	"Shutter": 0.719,
	"Arabesque Pattern": 0.60401,
	"Window": 0.719,
	"Curtain": 0.719,
	"Brick": 0.75331,
	"Window Shade": 0.719,
	"Balcony": 0.70572
}
```

Object Recognition is performed automatically for every image that is uploaded to a
recognition-enabled project. Once an image is uploaded, it can take some extra time after
recognition data is ready.

To get recognition parameters for a specific image, you need to make a REST API call:

```jsx
curl -H "Accept: application/vnd.uploadcare-v0.6+json" \
     -H "Authorization: Uploadcare.Simple <publickey>:<secretkey>" \
     "https://api.uploadcare.com/files/<UUID>/?add_fields=rekognition_info"
```

-  `<publickey>` and `<secretkey>` are keys to your project that has Object Recognition enabled;
-  `<UUID>` is an ID of an image you want the recognition data for.

Response example:

```json
{
	"rekognition_info": {
		"Building": 0.63291,
		"House": 0.63291,
		"Housing": 0.63291,
		"Architecture": 0.63008,
		"Outdoors": 0.55667,
		"Cottage": 0.63291,
		"Pond": 0.55667,
		"Castle": 0.63008,
		"Moat": 0.63008,
		"Fort": 0.63008
	},
	"datetime_removed": null,
	"datetime_stored": "2018-08-07T05:31:47.326146Z",
	"datetime_uploaded": "2018-08-07T05:31:47.132454Z",
	"image_info": {
		"orientation": null,
		"sequence": false,
		"format": "JPEG",
		"height": 2432,
		"width": 3648,
		"geo_location": null,
		"datetime_original": null,
		"dpi": [72, 72]
	},
	"is_image": true,
	"is_ready": true,
	"mime_type": "image/jpeg",
	"original_file_url": "https://ucarecdn.com/af9b7f02-6cbe-45bd-9bb6-9c928bf8a72e/house-pond.-/preview/-/format/auto/jpg",
	"original_filename": "eberhard-grossgasteiger-767950-unsplash.jpg",
	"size": 2363253,
	"url": "https://api.uploadcare.com/files/af9b7f02-6cbe-45bd-9bb6-9c928bf8a72e/",
	"uuid": "af9b7f02-6cbe-45bd-9bb6-9c928bf8a72e",
	"variations": null,
	"video_info": null
}
```

Possible values of `rekognition_info` include `null`, which means that recognition is not yet
finished, and `{}`, which means that Object Recognition was unable to identify any objects.

In a request, UUID can be omitted. If it is, you will receive an Object Recognition data for **all
the images** of your project.

## Detect faces

```jsx
https://ucarecdn.com/<UUID-/preview/-/format/auto/>/detect_faces/
```

Here's the image example:

![Team of three](https://ucarecdn.com/9293f8a0-e370-4065-a98e-29da0cf3bc6e/-/preview/-/format/auto/team.png)

You will receive a JSON like the following:

```json
{
	"faces": [
		[2546, 1659, 470, 522],
		[3739, 2181, 488, 713],
		[1730, 1389, 512, 655]
	],
	"id": "4659bc34-8481-48b6-8060-966d719c8b7b",
	"width": 5461,
	"height": 3641,
	"format": "JPEG",
	"color_mode": "RGB",
	"geo_location": null,
	"orientation": null,
	"dpi": [72, 72],
	"datetime_original": null,
	"sequence": false
}
```

`faces` key values have the following form:

```json
[x, y, x_size, y_size]
```

-  `x` and `y` represent the position of the **top left corner** of the face area;
-  `x_size` and `y_size` represent the size of the face area.

## Detect prominent colors

```jsx
https://ucarecdn.com/<UUID>/-/preview-/preview/-/format/auto//-/main_colors/
https://ucarecdn.com/<UUID>/-/preview/-/main_colors-/preview/-/format/auto//:number_of_colors/
```

`:number_of_colors` is optional and defaults to 4.

Here's the example image:

![Green hill](https://ucarecdn.com/1f0eacd1-f21e-4a4f-a084-ca273be78293/-/preview/-/format/auto/green.png)

You will receive a JSON like the following:

```json
{
	"main_colors": [
		[27, 50, 50],
		[139, 150, 90],
		[52, 73, 57],
		[85, 105, 67]
	],
	"id": "/fdd29f81-985f-4a7e-9a87-6d4464703984/-/preview/",
	"original": {
		"id": "fdd29f81-985f-4a7e-9a87-6d4464703984",
		"width": 1651,
		"height": 1101,
		"format": "JPEG",
		"color_mode": "RGB",
		"geo_location": null,
		"orientation": null,
		"dpi": [72, 72],
		"datetime_original": null,
		"sequence": false
	},
	"width": 413,
	"height": 276,
	"hash": "863b61c433c78d73"
}
```

`main_colors` array will contain RGB colors coded as arrays of three values.

Here are the detected colors from this JSON:

![Detected shades of green](https://ucarecdn.com/9f4980e4-67b5-4b3b-874a-f987c7408a9c/-/preview/-/format/auto/colors.png)

The algorithm is adapted to a wide variety of input image data and provides results intuitive in
terms of human perception. Note, the `main_colors` algorithm involves random number generation,
which may lead to slightly different results when applied to a single image repeatedly.
