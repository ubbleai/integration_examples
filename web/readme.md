# Ubble Web Integration Example

This example displays an example of web integration with Ubble, via a simple `express` application

## Installation
- Clone this folder
- Run `yarn install`
- Create a file named `ubble_credentials.json` at the root of this directory and enter your credentials
```json
{
  "CLIENT_ID": "YOUR_CLIENT_ID",
  "CLIENT_SECRET": "YOUR_CLIENT_SECRET"
}
```

- Run `yarn start` to start the webserver and navigate to `http://localhost:3000/`

You should get a simple web page with a link to verify your Ubble identity (provided your credentials are correct).

The link is generated on the index page load (see `routes/index.js`). 

Once you have completed the Ubble verification, you are redirected to `/success`

The url generation logic can be checked in `services/ubble.js`

