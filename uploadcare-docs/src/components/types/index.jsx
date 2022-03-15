import React from 'react'
import css from './style.module.css'

export const FileInfo = () => {
	return (
		<table class={css.root}>
			<thead>
				<tr>
					<th>Property</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>uuid</td>
					<td>string</td>
					<td> </td>
				</tr>
				<tr>
					<td>name</td>
					<td>string</td>
					<td>Original filename</td>
				</tr>
				<tr>
					<td>size</td>
					<td>number</td>
					<td>File size in bytes</td>
				</tr>
				<tr>
					<td>isStored</td>
					<td>boolean</td>
					<td>true if the file is stored persistently</td>
				</tr>
				<tr>
					<td>isImage</td>
					<td>boolean</td>
					<td> </td>
				</tr>
				<tr>
					<td>cdnUrl</td>
					<td>string</td>
					<td>Public CDN URL related to the file</td>
				</tr>
				<tr>
					<td>cdnUrlModifiers</td>
					<td>string</td>
					<td>
						A string holding existing URL modifiers, e.g. processing operations if there are
						any
					</td>
				</tr>
				<tr>
					<td>originalUrl</td>
					<td>string</td>
					<td>Original file CDN URL with no modifiers</td>
				</tr>
				<tr>
					<td>originalImageInfo</td>
					<td>object</td>
					<td>Object holding original image properties if your file is an image</td>
				</tr>
				<tr>
					<td>sourceInfo</td>
					<td>object</td>
					<td>
						Object holding the info about a file source. This can be a name of a social media,
						public URL, etc. This data is not stored
					</td>
				</tr>
			</tbody>
		</table>
	)
}

export const OriginalImageInfo = () => {
	return (
		<table class={css.root}>
			<thead>
				<tr>
					<th>Property</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>width</td>
					<td>number</td>
					<td> </td>
				</tr>
				<tr>
					<td>height</td>
					<td>number</td>
					<td> </td>
				</tr>
				<tr>
					<td>format</td>
					<td>string</td>
					<td>JPG, PNG, etc.</td>
				</tr>
				<tr>
					<td>datetime_original</td>
					<td>string</td>
					<td>Image creation date from EXIF</td>
				</tr>
				<tr>
					<td>geo_location</td>
					<td>string</td>
					<td>Geolocation data from EXIF</td>
				</tr>
				<tr>
					<td>orientation</td>
					<td>string</td>
					<td>Orientation data from EXIF</td>
				</tr>
				<tr>
					<td>dpi</td>
					<td>number</td>
					<td>DPI value from file properties or EXIF (if available)</td>
				</tr>
			</tbody>
		</table>
	)
}

export const FileGroupInfo = () => {
	return (
		<table class={css.root}>
			<thead>
				<tr>
					<th>Property</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>uuid</td>
					<td>string</td>
					<td> </td>
				</tr>
				<tr>
					<td>name</td>
					<td>string</td>
					<td>Localized size string, e.g. &quot;5 files&quot;</td>
				</tr>
				<tr>
					<td>size</td>
					<td>number</td>
					<td>Total size in bytes</td>
				</tr>
				<tr>
					<td>isStored</td>
					<td>boolean</td>
					<td>true if all files are stored persistently</td>
				</tr>
				<tr>
					<td>isImage</td>
					<td>boolean</td>
					<td>true if all files are images</td>
				</tr>
				<tr>
					<td>cdnUrl</td>
					<td>string</td>
					<td>Group CDN URL</td>
				</tr>
			</tbody>
		</table>
	)
}

export const UploadInfo = () => {
	return (
		<table class={css.root}>
			<thead>
				<tr>
					<th>Property</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>state</td>
					<td>string</td>
					<td>Current upload states: `uploading`, `uploaded`, or `ready`</td>
				</tr>
				<tr>
					<td>uploadProgress</td>
					<td>number</td>
					<td>Upload progress in range between 0 and 1</td>
				</tr>
				<tr>
					<td>progress</td>
					<td>number</td>
					<td>Ready state progress in range between 0 and 1</td>
				</tr>
			</tbody>
		</table>
	)
}
