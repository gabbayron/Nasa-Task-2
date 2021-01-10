// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCv_pNovoY-rPVsiAReE3ZQOKUcNm_WMN0",
    authDomain: "nasa-task.firebaseapp.com",
    projectId: "nasa-task",
    storageBucket: "nasa-task.appspot.com",
    messagingSenderId: "679482038325",
    appId: "1:679482038325:web:626a7760979e0e3c2f797c"
  },
  BASE_URL: "https://api.nasa.gov/planetary/apod?api_key=SXawfzxoI7QNVA2s7d4TOmyhFnudTOpghg4aYxnm",
  googleMapsApiKey: "AIzaSyDvMt4q7yx3Nw7MhYBh_ktyOjxwOE5vn0g"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
