export default (name, text) => `
    <!DOCTYPE html>
    <html lang="ru">

    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">

        <title>${name}</title>
        <style>
            body {
                max-width: 50rem;
                line-height: 1.5;
                margin: 3rem auto;
            }
        </style>
    </head>

    <body>
        ${text}
    </body>

    </html>
`
