import React from 'react'
import css from './style.module.css'

const ConfigurationOptions = () => {
	return (
		<table className={css.root}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Default</th>
					<th>Global variable</th>
					<th>Data-attribute</th>
					<th>Object key</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Public key</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_PUBLIC_KEY</td>
					<td>data-public-key</td>
					<td>publicKey</td>
					<td>Public key</td>
				</tr>
				<tr>
					<td>Multiple</td>
					<td>boolean</td>
					<td>false</td>
					<td> </td>
					<td>data-multiple</td>
					<td>multiple</td>
					<td>If true, uploading multiple files is allowed</td>
				</tr>
				<tr>
					<td>Multiple max</td>
					<td>integer</td>
					<td>0</td>
					<td> </td>
					<td>data-multiple-max</td>
					<td>multipleMax</td>
					<td>
						Maximum number of files that can be selected for a single upload. Defaults to 0
						which means &quot;no limit&quot;
					</td>
				</tr>
				<tr>
					<td>Multiple min</td>
					<td>integer</td>
					<td>1</td>
					<td> </td>
					<td>data-multiple-min</td>
					<td>multipleMin</td>
					<td>Minimal number of files that can be selected for a single upload</td>
				</tr>
				<tr>
					<td>Images only</td>
					<td>boolean</td>
					<td>false</td>
					<td>UPLOADCARE_IMAGES_ONLY</td>
					<td>data-images-only</td>
					<td>imagesOnly</td>
					<td>If true, only image files are allowed to be uploaded</td>
				</tr>
				<tr>
					<td>Preview step</td>
					<td>boolean</td>
					<td>false</td>
					<td>UPLOADCARE_PREVIEW_STEP</td>
					<td>data-preview-step</td>
					<td>previewStep</td>
					<td>If true, there will be the preview step after selecting files</td>
				</tr>
				<tr>
					<td>Crop</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_CROP</td>
					<td>data-crop</td>
					<td>crop</td>
					<td>If set, users will be able to crop images before uploading</td>
				</tr>
				<tr>
					<td>Image shrink</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_IMAGE_SHRINK</td>
					<td>data-image-shrink</td>
					<td>imageShrink</td>
					<td>
						Saves traffic and storage space by resizing images on the client side before
						uploading
					</td>
				</tr>
				<tr>
					<td>Clearable</td>
					<td>boolean</td>
					<td>false</td>
					<td>UPLOADCARE_CLEARABLE</td>
					<td>data-clearable</td>
					<td> </td>
					<td>
						Allows users to remove uploaded files from the file uploader. Files are not
						deleted from your Uploadcare account
					</td>
				</tr>
				<tr>
					<td>Tabs</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_TABS</td>
					<td>data-tabs</td>
					<td>tabs</td>
					<td>Allows you to use different upload sources like Facebook, Instagram, etc.</td>
				</tr>
				<tr>
					<td>Input accept types</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_INPUT_ACCEPT_TYPES</td>
					<td>data-input-accept-types</td>
					<td>inputAcceptTypes</td>
					<td>
						A string of MIME wildcard values that define which file types should be accepted.
						Not a replacement for validation because user can still drag and drop a file of
						any type
					</td>
				</tr>
				<tr>
					<td>Preferred types</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_PREFERRED_TYPES</td>
					<td>data-preferred-types</td>
					<td>preferredTypes</td>
					<td>
						The same as inputAcceptTypes, but it defines which file types should be preferred.
						The list can be seen in the system&#39;s file selection dialog.
					</td>
				</tr>
				<tr>
					<td>System dialog</td>
					<td>boolean</td>
					<td> </td>
					<td>UPLOADCARE_SYSTEM_DIALOG</td>
					<td>data-system-dialog</td>
					<td> </td>
					<td>
						Uses a system-native file picking dialog instead of Uploader. That makes the
						uploading UX as close as possible to &lt;input type=&quot;file&quot;&gt;. Note
						that onDialogOpen event won&#39;t fire then.
					</td>
				</tr>
				<tr>
					<td>Multipart minimum size</td>
					<td>integer</td>
					<td>10485760</td>
					<td>UPLOADCARE_MULTIPART_MIN_SIZE</td>
					<td>data-multipart-min-size</td>
					<td>multipartMinSize</td>
					<td>
						File size threshold in bytes for multipart uploading. The value ranges from
						10485760 (10 MB) to 104857600 (100 MB). If a file size hits the threshold, it gets
						uploaded in four parallel chunks by 5 MB.Multipart upload works with local sources
						only (files and camera).
					</td>
				</tr>
				<tr>
					<td>Locale</td>
					<td>string</td>
					<td>en</td>
					<td>UPLOADCARE_LOCALE</td>
					<td> </td>
					<td> </td>
					<td>Locale of Uploader</td>
				</tr>
				<tr>
					<td>Locale translations</td>
					<td>object</td>
					<td> </td>
					<td>UPLOADCARE_LOCALE_TRANSLATIONS</td>
					<td> </td>
					<td> </td>
					<td>Localization overrides</td>
				</tr>
				<tr>
					<td>Locale pluralize</td>
					<td>object</td>
					<td> </td>
					<td>UPLOADCARE_LOCALE_PLURALIZE</td>
					<td> </td>
					<td> </td>
					<td>Pluralization options</td>
				</tr>
				<tr>
					<td>Secure signature</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_SECURE_SIGNATURE</td>
					<td>data-secure-signature</td>
					<td>secureSignature</td>
					<td>A HMAC/SHA256 hex-encoded hash that includes secret_key and expire strings</td>
				</tr>
				<tr>
					<td>Secure expire</td>
					<td>integer</td>
					<td> </td>
					<td>UPLOADCARE_SECURE_EXPIRE</td>
					<td>data-secure-expire</td>
					<td>secureExpire</td>
					<td>The Unix time to which the secure signature is valid</td>
				</tr>
				<tr>
					<td>Preview proxy</td>
					<td>string</td>
					<td> </td>
					<td>UPLOADCARE_PREVIEW_PROXY</td>
					<td>data-preview-proxy</td>
					<td>previewProxy</td>
					<td>Your proxy backend URL</td>
				</tr>
				<tr>
					<td>Preview URL callback</td>
					<td>function</td>
					<td> </td>
					<td>UPLOADCARE_PREVIEW_URL_CALLBACK</td>
					<td> </td>
					<td>previewUrlCallback</td>
					<td>
						The signature is (originalUrl, fileInfo) =&gt; previewUrl. The returned value will
						be used as a link for image previews instead of originalUrl. If specified,
						previewProxy is ignored.
					</td>
				</tr>
				<tr>
					<td>Live</td>
					<td>boolean</td>
					<td>true</td>
					<td>UPLOADCARE_LIVE</td>
					<td> </td>
					<td> </td>
					<td>If true, inputs on your page are initialized automatically</td>
				</tr>
				<tr>
					<td>Manual start</td>
					<td>boolean</td>
					<td>false</td>
					<td>UPLOADCARE_MANUAL_START</td>
					<td> </td>
					<td> </td>
					<td>
						Opposite to UPLOADCARE_LIVE. If true, you should trigger the initialization
						manually
					</td>
				</tr>
				<tr>
					<td>CDN base</td>
					<td>url</td>
					<td>https://ucarecdn.com/</td>
					<td>UPLOADCARE_CDN_BASE</td>
					<td>data-cdn-base</td>
					<td>cdnBase</td>
					<td>Your CDN domain</td>
				</tr>
				<tr>
					<td>Do not store</td>
					<td>boolean</td>
					<td>false</td>
					<td>UPLOADCARE_DO_NOT_STORE</td>
					<td>data-do-not-store</td>
					<td>doNotStore</td>
					<td>
						If true, all uploaded files won&#39;t be stored persistently and will be deleted
						after 24 hours
					</td>
				</tr>
				<tr>
					<td>Validators</td>
					<td>function[]</td>
					<td> </td>
					<td> </td>
					<td> </td>
					<td>validators</td>
					<td>An array of validators</td>
				</tr>
				<tr>
					<td>Audio bits per second</td>
					<td>number</td>
					<td> </td>
					<td>UPLOADCARE_AUDIO_BITS_PER_SECOND</td>
					<td>data-audio-bits-per-second</td>
					<td>audioBitsPerSecond</td>
					<td>Audio quality of Uploader Camera Tab</td>
				</tr>
				<tr>
					<td>Video bits per second</td>
					<td>number</td>
					<td> </td>
					<td>UPLOADCARE_VIDEO_BITS_PER_SECOND</td>
					<td>data-video-bits-per-second</td>
					<td>videoBitsPerSecond</td>
					<td>Video quality of Uploader Camera Tab</td>
				</tr>
				<tr>
					<td>Video preferred MIME types</td>
					<td>string[]</td>
					<td> </td>
					<td>UPLOADCARE_VIDEO_PREFERRED_MIME_TYPES</td>
					<td>data-video-preferred-mime-types</td>
					<td>videoPreferredMimeTypes</td>
					<td>
						Priority order of MIME-types for Uploader Camera Tab video captures. The first
						MIME supported by the end user&#39;s browser will be used
					</td>
				</tr>
				<tr>
					<td>Camera mirror default</td>
					<td>boolean</td>
					<td>true</td>
					<td>UPLOADCARE_CAMERA_MIRROR_DEFAULT</td>
					<td>data-camera-mirror-default</td>
					<td>cameraMirrorDefault</td>
					<td>If true, the camera image will be mirrored by default</td>
				</tr>
			</tbody>
		</table>
	)
}

export default ConfigurationOptions
