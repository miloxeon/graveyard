---
sidebar_position: 3
title: Document Conversion
---

Uploadcare allows converting documents to the following target formats: DOC, DOCX, XLS, XLSX, ODT,
ODS, RTF, TXT, PDF, JPG, ENHANCED JPG, PNG.

Document Conversion works via our [REST API](https://uploadcare.com/api-refs/rest-api/). You post a
conversion job and get a result once the operation is complete. If the operation is successful, you
can get the output with a CDN URL.

The document conversion process goes like this:

1. You upload a document to Uploadcare;
2. You request a conversion job with a REST API request;
3. You wait until the conversion job status is `finished`;
4. You can access your converted document.

To post a conversion job, make a request of this template:

```bash
curl -X POST \
	-H "Content-Type: application/json" \
	-H "Accept: application/vnd.uploadcare-v0.5+json" \
	-H "Authorization: Uploadcare.Simple your_public_key:your_secret_key" \
	-d '{"paths": ["path1", "path2"], "store": "1"}' \
	"https://api.uploadcare.com/convert/document/"
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
			"uuid": ":uuid-converted-1"
		},
		{
			"original_source": "path2",
			"token": 3725134,
			"uuid": ":uuid-converted-2"
		}
	]
}
```

Now your converted documents can be accessed with this link:

```bash
https://ucarecdn.com/:uuid-converted-1
https://ucarecdn.com/:uuid-converted-2
```

## Paths

Paths should be formatted like this:

```bash
/:uuid/document/
/:uuid/document/-/format/:target-format/
/:uuid/document/-/format/:target-format/-/page/:page-number/
```

-  `:uuid` is your original document UUID;
-  `:target-format` is a format to convert to. Accepted values are `pdf` (default), `doc`, `docx`,
   `xls`, `xlsx`, `odt`, `ods`, `rtf`, `txt`, `jpg`, `enhanced.jpg`, `png`;
-  `:page-number` is a number of a single page to be converted. If not specified, the whole document
   will be converted.

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
	"https://api.uploadcare.com/convert/document/status/:token/"
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

The feature is avaiailable on all paid plans. We charge for document conversions separately:

-  Document Conversion is billed in units.
-  The total amount of spent conversion units can be found in your dashboard.
-  The single conversion unit costs 0.045 USD.
-  One unit accounts for 50 MB of a file subjected to conversion.
-  Conversion outputs are put to your Uploadcare project; this affects your _storage limits_ that
   you can also monitor in your dashboard.
-  Each conversion operation takes one _upload unit_. Document conversions are applied externally,
   so we upload an output to your account once it is generated.
-  Your _traffic limits_ are left intact.
