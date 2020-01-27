# Ubble iOS 13 Integration

This folder contains the necessary code to run an iOS 13 app integrated with Ubble

# Setup
To run this example, make sure you've installed XCode developer command line tools

### Credentials
Prior to building set the enviroment variables `CLIENT_ID` and `CLIENT_SECRET`

```
export CLIENT_ID="YourClientId"
export CLIENT_SECRET="YourClientSecret"
```

### Build
Prior to building we have to select a target device the tests will run on.
`xcrun instruments -s` to list all available devices
If you are going to test on an emulator run `xcrun instruments -w #DEVICE_ID` to boot your target device
Build the app with `xcodebuild -scheme ubble\ integration\ example -destination 'platform=YOUR_PLATFORM,id=DEVICE_ID' -configuration Debug`

### Installation
`xcrun simctl install booted #PathToApp` to install the app on your device
Run the app by interacting with the emulator

### App structure

The App is compose of 2 screens: Home and UbbleWebView

- Home: A single button responsible for [creating an Ubble identification](https://ubbleai.github.io/developer-documentation/#create-an-identification) and navigating to the UbbleWebView
- UbbleWebView: The webview component responsible for displaying the Ubble webview

