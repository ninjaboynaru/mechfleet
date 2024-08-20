# MechFleet - LEGACY

# Project Structure
### Global Imports
Global imports are achieved through the use of the `babel-plugin-module-resolver` package.  
Global, general use, custom packages/files are stored in the `app/@mechtheme` directory.  
These include custom packages such as the database, general use UI components, and theming.  

ESLint is made aware of these global imports through the use of the `eslint-import-resolver-babel-module`.


# Building and Running
### Running in development
1. Open 2 consoles as an admin
2. In one console run `npx react-native start`
3. In the other console run `npx react-native run-android`
If you receive an `EPERM` `lstat` type error in the console window running `npx react-native start` and you're sure you've run the console as an admin, then switch to the `android` directory and running `./gradlew clean` and try again.

### How to build apk
1. `cd` to `android` folder
2. Run `./gradlew clean`
3. Run `./gradlew assembleRelease`
4. Find the output apk file in `android/app/build/outputs/apk/release/app-release.apk`

### How to install apk on phone through USB connection
1. Connect phone to computer with USB
2. Enable developer mode and usb debugging on the phone
2. Build the APK (instructions above)
3. `cd` to the apk output directory
4. Run `adb install app-release.apk`  
If the application is already installed on the phone run `adb install -r app-release.apk` to overwrite it _NOTE: This will NOT overwrite the apps data files. Also, with the `-r` option, you do not need to upgrade the version code__


### Android document directory path (where data files are stored on the phone)
``/data/user/0/com.mechfleet/files/fleet_data`
