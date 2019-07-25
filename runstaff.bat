@echo off
rem ng b --prod --env driv --aot=true --build-optimizer=false --base-href "/android_asset/www/"
REM ng b --env driv --base-href "/android_asset/www/"
rd "C:\Projects\Cordova Workspace\eParcel Staff\www"
md "C:\Projects\Cordova Workspace\eParcel Staff\www"
xcopy "C:\Projects\Angular Workspace\ParcelMgt\dist" "C:\Projects\Cordova Workspace\eParcel Staff\www" /s /e /y
cd "C:\Projects\Cordova Workspace\eParcel Staff"
cordova run android
cd "C:\Projects\Angular Workspace\ParcelMgt"
