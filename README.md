# Connect Five | React Native project

<p>
  <img src="./images/connect_five_1.png" alt="Foo 1" width="30%" style="margin-right: 20px; max-width: 250px;" />
  <img src="./images/connect_five_2.png" alt="Foo 2" width="30%" style="max-width: 250px;" />
</p>

## Prerequisites

Install React Native dependencies on your machine, check docs from: https://reactnative.dev/docs/environment-setup

Install dependencies

```
yarn install
```

If you encrounter problems with libraries, you can try to reset yarn cache with
```
yarn cache clean
```

## Start the project

Run the metro server
```
yarn start
```

Run on Android
```
yarn android
```

Run on iOS
```
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Debug the project

```
npx react-devtools
```

## Build for debugging

Navigate to android dir
```
cd android
```

Run the build command
```
./gradlew assembleDebug
```
This command will generate an .apk file in the android/app/build/outputs/apk/debug/app-debug.apk directory.


## Build the app for production

Build .aab
```
./gradlew bundleRelease
```
This command will generate an .aab file in the android/app/build/outputs/bundle/release directory.

Cd into a dir where you put bundletools .jar package
```
cd <bundletools .jar package path>
```

Build .apks from .aab
```
java -jar bundletool-all-1.15.6.jar build-apks --bundle="<project_path>/android/app/build/outputs/bundle/release/app-release.aab" --output="<project_path>/android/app/build/outputs/bundle/release/app-release.apks"
```

Connect device with a cable (needs usb debugging enabled)

Deploy .apks file to connected device
```
java -jar bundletool-all-1.15.6.jar install-apks --apks="<project_path>/android/app/build/outputs/bundle/release/app-release.apks"
```

## Run the app on phone

Check name of your device
```
adb devices
```

See the name of your device (when connected via usb cable) and then run
```
adb -s <device name> reverse tcp:8081 tcp:8081
```

