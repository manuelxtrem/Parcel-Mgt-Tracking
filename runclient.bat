@echo off
rem ng b --prod --base-href "/android_asset/www/"
REM ng b --base-href "/android_asset/www/"
rd "C:\Projects\Cordova Workspace\eParcel\www"
md "C:\Projects\Cordova Workspace\eParcel\www"
xcopy "C:\Projects\Angular Workspace\ParcelMgt\dist" "C:\Projects\Cordova Workspace\eParcel\www" /s /e /y
cd "C:\Projects\Cordova Workspace\eParcel"
cordova run android
cd "C:\Projects\Angular Workspace\ParcelMgt"
