# Resume API

Run the server from this folder:

```sh
npm install
npm start
```

The API listens on port `3000` by default. Set `PORT` to change it and `CLIENT_ORIGIN` to configure the allowed browser origin (defaults to `http://localhost:5173`).

Send a `multipart/form-data` `POST` request to `/api/resumes` with the PDF in the `resume` field. PDFs are limited to 5 MB. On success, the JSON response includes extracted text and the page count. Validation, parsing, and server errors are also returned as JSON with `success: false` and an error code.

The server is split across `index.js` (app setup), `routes.js` (HTTP routes and upload validation), `controller.js` (request/response handling), `service.js` (PDF extraction), and `db.js` (database status). Persistence is disabled; resumes are processed in memory and are not stored.

```sh
curl -F "resume=@./resume.pdf" http://localhost:3000/api/resumes
```