@echo off
rem ng b --prod --base-href "/android_asset/www/"
rd /s /q "C:\Projects\Cordova Workspace\iParcelMgt\www"
md "C:\Projects\Cordova Workspace\iParcelMgt\www"
xcopy "C:\Projects\Angular Workspace\ParcelMgt\dist" "C:\Projects\Cordova Workspace\iParcelMgt\www" /s /e /y
cd "C:\Projects\Cordova Workspace\iParcelMgt"
cordova build android
cd "C:\Projects\Angular Workspace\ParcelMgt"
