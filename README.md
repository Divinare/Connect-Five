# Tictactoe | React Native project

## Prerequisites

Install React Native dependencies on your machine: https://reactnative.dev/docs/environment-setup

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

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

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


## Run the app on phone

Check name of your device
```
adb devices
```

See the name of your device (when connected via usb cable) and then run
```
adb -s <device name> reverse tcp:8081 tcp:8081
```

