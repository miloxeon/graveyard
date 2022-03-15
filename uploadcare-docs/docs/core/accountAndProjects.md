---
sidebar_position: 2
title: Account and projects
---

## Deleting uploaded files every 24 hours

By default, we store the uploaded files until you delete them. You can change that by disabling
**Automatic file storing** in **Settings**. When it's disabled, newly uploaded files will be deleted
after 24 hours.

You can explicitly store a file by making an additional API call. The stored file won't be
automatically deleted.

## Enabling backups

You can connect an Amazon S3 bucket to your Uploadcare account. All your stored images will be
copied there recurrently. You can set up name patterns for copied files.

## Customizing OAuth app name and logo

In your dashboard, you can set the OAuth name other than Uploadcare. You can also upload your own
logo.

The application name and the logo are displayed to users when they try to upload pictures from any
external source like Facebook, Instagram, etc.

If not set, your users will see that the application that request their data is "Uploadcare" rather
than your own brand.

![OAuth customization](https://ucarecdn.com/a34fcf64-1bfd-4de6-b985-38f158c92d66/-/preview/-/format/auto/oauth.png)

## Using webhooks

With our REST API, you can set up webhooks to notify your application on different Uploadcare
events. Please, refer to the
[webhooks REST API documentation](https://uploadcare.com/api-refs/rest-api/v0.5.0/#tag/Webhook) to
learn more about webhooks.

## Connecting your own storage

You can connect your own S3 bucket to your account. The files your users upload will end up there
instead of Uploadcare servers. **Uploadcare CDN features won't be available**, but Uploader will
still work.

## Transferring files to Uploadcare in bulk

Many of our clients had DIY solutions before adopting Uploadcare. To help our users with the common
task of transferring existing files to Uploadcare, we created Migro — a small and handy tool that
transfers files in bulk.

It's free and open source. Migrating is as easy as creating a text file with links and running a
console command.

Check out [Migro GitHub page](https://github.com/uploadcare/migro) to learn more.

## Restricting access to your files

With regular delivery, the flow goes like this:

1. User makes a request to Uploadcare CDN
2. Uploadcare CDN responds with a file

To restrict unwanted access to your files, Uploadcare supports Secure Delivery. The flow is
different:

1. User makes a request to your server
2. Your server checks if user is authenticated
3. If so, your server generates an expiring access token using Akamai EdgeAuth library
4. Your server redirects user to Uploadcare CDN, appending the access token to the request
5. Uploadcare CDN checks the token, and if it's okay, it responds with a file.

### Enabling

[Contact us](https://uploadcare.com/community/t/how-to-set-up-custom-cdn-cname/40) to set up a
custom CNAME and enable Secure Delivery. We will provide you a **secret encryption key**.

Then, you'll need to implement custom backend logic to generate Akamai EdgeAuth tokens. It's better
to use readily available Akamai libraries:

-  [C#](https://github.com/BookBeat/EdgeAuth-Token-CSharp)
-  [GoLang](https://github.com/mobilerider/EdgeAuth-Token-Golang)
-  [Java](https://github.com/akamai/EdgeAuth-Token-Java)
-  [NodeJS](https://github.com/akamai/EdgeAuth-Token-Node)
-  [Python](https://github.com/akamai/EdgeAuth-Token-Python)
-  [Ruby](https://github.com/akamai/EdgeAuth-Token-Ruby)

Check out
[Akamai Download Delivery implementation guide](https://learn.akamai.com/en-us/webhelp/download-delivery/download-delivery-implementation-guide/GUID-EB3329D1-C7C5-4F23-9B69-1B1FBFEBF436.html).

Your proxy backend should do the following:

1. Accept escaped file URL as a GET parameter;
2. Check user authentication;
3. Generate an expiring access token for that URL;
4. Generate the signed URL from the original URL and the token;
5. Redirect to that URL.

Here's an example in NodeJS:

```jsx
const EdgeAuth = require('akamai-edgeauth')

// How long is the token valid for?
const windowSeconds = 120
const ea = EdgeAuth({
	key: 'encryption_key_we_provided',
	windowSeconds,
})

app.get('/preview', (req, res) => {
	if (!req.user) {
		res.status(403).send('Authorization failed')
		return
	}

	const expire = Math.round(Date.now() / 1000) + 120
	const token = ea.generateURLToken(req.query.url)

	const secureUrl = req.query.url + `?token=${token}&expire=${windowSeconds}`
	res.redirect(secureUrl)
})
```

### Handling image previews

After uploading, File Uploader tries to load an image preview using the standard Uploadcare CDN
link. With Secure Delivery this will fail, because every image request needs to be signed.

To enable image previews with Secure Delivery, follow this guide: Handling previews when using
Secure Delivery.
