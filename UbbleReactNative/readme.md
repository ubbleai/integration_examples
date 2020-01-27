# Ubble React Native Integration (Android & iOS)

This folder contains the necessary code to run a React Native app integrated with Ubble

# Setup
To run this example, make sure you've completed all the prerequisites to run React Native: https://facebook.github.io/react-native/docs/getting-started
Run `yarn install`

### Credentials
Create an `ubble_credentials.json` file at this root of this directory containing your credentials

```json
{
  "CLIENT_ID": "YourClientId",
  "CLIENT_SECRET": "YourClientSecret"
}
```

Run `react-native run-android` or `react-native run-ios`

### App structure

The App is compose of 2 screens: Home and UbbleWebView

- Home.js: A single button responsible for [creating an Ubble identification](https://ubbleai.github.io/developer-documentation/#create-an-identification) and navigating to the UbbleWebView
- UbbleWebView: The webview component responsible for displaying the Ubble webview
 