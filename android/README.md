# Ubble Android Integration

This folder contains the necessary code to run an android app integrated with Ubble

# Setup
This example does not need much setup. Just be sure to update your credentials

### Credentials
Create an `secrets.xml` file at app/src/main/res/values containing your credentials

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="CLIENT_ID">YourClientId</string>
    <string name="CLIENT_SECRET">YourClientSecret</string>
</resources>
```

Start your android emulator or connect your device
Run `./gradlew installDebug`
Navigate to the app inside the emulator and run

### App structure

The App is compose of 2 screens: Home and UbbleWebView - Home.js: A single button responsible for [creating an Ubble identification](https://ubbleai.github.io/developer-documentation/#create-an-identification) and navigating to the UbbleWebView - UbbleWebView: The webview component responsible for displaying the Ubble webview
