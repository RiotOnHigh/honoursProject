// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyAdaN6fG_MCvNPH0912LmQRZzwRr1eR2zE",
    authDomain: "honoursrecord.firebaseapp.com",
    databaseURL: "https://honoursrecord.firebaseio.com",
    projectId: "honoursrecord",
    storageBucket: "",
    messagingSenderId: "238976778825"
  }
};