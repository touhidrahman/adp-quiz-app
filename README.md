# ADP Quiz App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## First Run

- Clone the repository
- `cd` into the cloned directory
- Run `npm install`.
- Run `npm start`
- Navigate to `http://localhost:4200/`

## Subsequent Run

`npm start`

## Notes

The provided `quiz.json` file was served via a mock server to mimic a real backend API instead of static file from the disk. The [json-server](https://github.com/typicode/json-server) library was used for this purpose. The `quiz.json` file was not modified.

The `npm run start` command actually starts two localhost server on port 3000 and 4200 for backend and frontend respectively. So if you are using `ng start` to start the project (meaning the frontend only), be sure to start the backend server as well by using `npm start backend`.  
