import React from 'react'
import css from './style.module.css'

export default () => {
	return (
		<table className={css.root}>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>pubkey</td>
					<td>string</td>
					<td>Your public key</td>
				</tr>
				<tr>
					<td>fadeIn</td>
					<td>boolean</td>
					<td>Should images fade in once they&#39;re loaded</td>
				</tr>
				<tr>
					<td>lazyload</td>
					<td>boolean</td>
					<td>Should images be loaded in the background. Images are loaded in batches</td>
				</tr>
				<tr>
					<td>batchInterval</td>
					<td>number</td>
					<td>Interval between loading batches in milliseconds. Defaults to 250</td>
				</tr>
				<tr>
					<td>batchSize</td>
					<td>number</td>
					<td>How many images are in a batch. Defaults to 5</td>
				</tr>
				<tr>
					<td>beforeRender</td>
					<td>function</td>
					<td>Called for every image when it&#39;s loaded. Accepts the image DOM node</td>
				</tr>
				<tr>
					<td>progressive</td>
					<td>boolean</td>
					<td>Should progressive JPEG be used</td>
				</tr>
				<tr>
					<td>fallback</td>
					<td>boolean</td>
					<td>
						Should a fallback image be used if something goes wrong. Automatically set to true
						when fadeIn or beforeRender are used
					</td>
				</tr>
				<tr>
					<td>cdnBase</td>
					<td>string</td>
					<td>Your custom CNAME. Defaults to https://ucarecdn.com</td>
				</tr>
				<tr>
					<td>host</td>
					<td>string</td>
					<td>
						Your custom endpoint for proxy. Defaults to YOUR_PUBLIC_KEY.ucr.io. When used,
						there is no need to specify pubkey
					</td>
				</tr>
			</tbody>
		</table>
	)
}
