
  ng b --prod --env driv --base-href "/android_asset/www/"
  rd /s /q "C:\Projects\Cordova Workspace\iParcelMgtStaff\www"
  md "C:\Projects\Cordova Workspace\iParcelMgtStaff\www"
  xcopy "C:\Projects\Angular Workspace\ParcelMgt\dist" "C:\Projects\Cordova Workspace\iParcelMgtStaff\www" /s /e /y
  cd "C:\Projects\Cordova Workspace\iParcelMgtStaff"
  cordova run android
  cd "C:\Projects\Angular Workspace\ParcelMgt"
