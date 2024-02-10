// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const webPush = require('web-push')
const express = require('express')

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
	console.log(
		'You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY ' +
			'environment variables. You can use the following ones:'
	)
	console.log(webPush.generateVAPIDKeys())
	throw new Error()
}

// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
	'https://0259-93-185-37-129.eu.ngrok.io',
	process.env.VAPID_PUBLIC_KEY,
	process.env.VAPID_PRIVATE_KEY
)

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.get('/api/vapidPublicKey', (req, res) => {
	res.send(process.env.VAPID_PUBLIC_KEY)
})

app.post('/api/register', (req, res) => {
	// A real world application would store the subscription info.
	res.sendStatus(201)
})

app.post('/api/sendNotification', (req, res) => {
	const subscription = req.body.subscription
	const payload = null
	const options = {
		TTL: req.body.ttl,
	}

	setTimeout(async () => {
		try {
			const result = await webPush.sendNotification(subscription, payload, options)
			console.log({ result })
			res.sendStatus(201)
		} catch (e) {
			res.sendStatus(500)
			console.error(e)
		}
	}, req.body.delay * 1000)
})

app.listen(3000, () => {
	console.log(`Example app listening on port 3000`)
})
