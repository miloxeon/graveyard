---
sidebar_position: 4
title: Video Processing
---

Uploadcare can deliver your video via our CDN, just as fast as we can deliver images. More than
that, you can apply transformations, adjust quality and **generate thumbnails**.

Video processing works via our [REST API](https://uploadcare.com/api-refs/rest-api/). You post a
conversion job and get a result once the operation is complete. If the operation is successful, you
can get the output with a CDN URL.

The video processing workflow goes like this:

1. You upload a video to Uploadcare;
2. You request a conversion job with a REST API request;
3. You wait until the conversion job status is `finished`;
4. You can access your converted video instantly.

To post a conversion job, make a request of this template:

```bash
curl -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/vnd.uploadcare-v0.5+json" \
	-H "Authorization: Uploadcare.Simple your_public_key:your_secret_key" \
	-d '{"paths": ["path1", "path2"], "store": "1"}' \
	"https://api.uploadcare.com/convert/video/"
```

Make sure to replace `your_public_key` and `your_secret_key` with the actual values.

You'll get the following response:

```bash
{
	"problems": {},
	"result": [
		{
			"original_source": "path1",
			"token": 3724130,
			"thumbnails_group_uuid": ":uuid-thumb-group",
			"uuid": ":uuid-converted-1"
		},
		{
			"original_source": "path2",
			"token": 3725134,
			"thumbnails_group_uuid": ":uuid-thumb-group",
			"uuid": ":uuid-converted-2"
		}
	]
}
```

Now your converted videos can be accessed with this link:

```bash
https://ucarecdn.com/:uuid-converted-1
https://ucarecdn.com/:uuid-converted-2
```

We also generate thumbnails for you automatically. They are stored inside a File Group with the UUID
accessible via the `"thumbnails_group_uuid"` key. You can also work with File Groups via the
[REST API](https://uploadcare.com/api-refs/rest-api/v0.5.0/#operation/groupsList).

## Paths

Paths should be formatted like this:

```
/:uuid/video/
```

`:uuid` is your original video UUID.

## Transformations

You can apply multiple transformations by separating them with a dash:

```
/:uuid/video/-/size/800x480/
/:uuid/video/-/size/800x480/-/quality/best/
```

Here are the available transformations:

### Resize

```
/:uuid/video/-/size/:dimensions/
/:uuid/video/-/size/:dimensions/:mode/
```

-  `dimensions` can state width and height, only the width and only the height. Those are all valid
   values: `800x480`, `x480`, `800x`;
-  `mode` can be one of the following:
   -  `preserve_ratio` (default), preserve the aspect ratio of the original file;
   -  `change_ratio`, match the output video to provided dimensions, no matter the original aspect
      ratio;
   -  `scale_crop`, match the output video to provided dimensions, crop the rest of the pixels along
      one of the axes;
   -  `add_padding`, add black bars to the video to match the output frame size exactly.

### Compress

```
/:uuid/video/-/quality/:setting/
```

-  `best` — useful when you want to get perfect quality without paying much attention to file sizes.
   It's larger than `better` and it's also the maximum size.
-  `better` — better video quality, larger file size compared to `normal`.
-  `normal` — suits most cases;
-  `lighter` — saves traffic without a significant subjective quality loss. Smaller file size
   compared to `normal`;
-  `lightest` — lowest visual quality yet minimal loading times; smaller than `lighter`.

### Encode to different codec

```
/:uuid/video/-/format/:format/
```

-  `mp4`, widely supported across devices and [browsers](https://caniuse.com/#feat=mpeg4). Videos
   encoded with `mp4` are compressed via H.264 codec and will work on Android and iOS, in Safari,
   Chrome, and IE. Choose it when you want to go cross-browser or in case you need a fallback;
-  `webm`, video is encoded to VP8 or VP9. Audio gets compressed with Vorbis or Opus.
   [Learn more](https://www.webmproject.org/about/faq);
-  `ogg`, a free and open video compression format. Support is somewhat worse than of WebM.
   [Learn more](https://www.theora.org).

### Cut

```
/:uuid/video/-/cut/:start_time/:length/
```

-  `:start_time`, defines the starting point of a fragment to cut based on your input file timeline;
-  `:length`, defines the duration of that fragment.

Both of the parameters can be formatted in the following ways:

-  `HHH:MM:SS.sss`; `HHH` are hours ranging from 0 to 999, `MM` — minutes ranging from 0 to 59,
   `SS.sss` are seconds and milliseconds. `HHH` and `MM` can be omitted.
-  `SSS+.sss`, a number of seconds and milliseconds; `sss` can be omitted.

`:length` can also be set to `end`.

Here are some examples:

```
/:uuid/video/-/cut/1:2:40.535/2:20.0/
/:uuid/video/-/cut/001:02:40.535/02:20.0/
/:uuid/video/-/cut/2:30.535/2:20.0/
/:uuid/video/-/cut/1:2:40.535/end/
/:uuid/video/-/cut/3760.535/140/
/:uuid/video/-/cut/3760.535/end/
```

### Generate thumbnails

```
/:uuid/video/-/thumbs~N/
/:uuid/video/-/:operations/-/thumbs~20/:number/
/:uuid/video/-/:operations/-/thumb/
```

`N` is the number of thumbnails that will be generated. The first link will generate a File Group
with video thumbnails.

With the second link, you can request a specific thumbnail of the group.

With the third link, you can generate exactly one thumbnail and get it as an image.

## Storing

You can provide a `store` value in your request. If it's `"0"`, your conversion results will be
deleted from the server after 24 hours. If it's `"1"`, they will be stored presistently until you
delete them.

## Checking conversion status

```bash
curl -X GET \
	-H "Content-Type: application/json" \
	-H "Accept: application/vnd.uploadcare-v0.5+json" \
	-H "Authorization: Uploadcare.Simple your_public_key:your_secret_key" \
	"https://api.uploadcare.com/convert/video/status/:token/"
```

`:token` should be replaced with a token value you got when you posted a conversion job.

Here's the example response:

```bash
{
	"status": "processing",
	"error": null,
	"result": {
		"uuid": ":uuid-processed"
	}
}
```

Possible statuses are:

-  `pending` — the source file is being prepared for conversion;
-  `processing` — conversion in progress;
-  `finished` — conversion is finished;
-  `failed` — conversion is failed, see error for details;
-  `canceled` — conversion was cancelled.

## Billing

Video Encoding is available on our _paid plans only_.

We charge for Video Transformations separately:

-  Transformations cost 0.045 USD per minute of your output video. If you apply multiple
   transformations to a single video, we will charge you by the duration of your outputs.
-  The transformed outputs are put to your Uploadcare account; this affects your _storage limits_:
   you can estimate the volume of needed storage by considering average conversion ratios for
   supported video formats.
-  Each transformation takes one _upload unit_. Video Transformations are applied externally, so we
   upload an output to your account once it is generated.
-  When applying Video Transformations, your _traffic limits_ are left intact.
