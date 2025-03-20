# Getting Started with Math Worksheet using Create React App

## Folder to add

Copy src/config/connection-example.js inside src/config/
Rename the new file to `connection.js`

## Available Scripts

In the project directory, you can run:

### `npm install`

Will install all the node modules.\
Remember to run it in both math-rounding-worksheet and server folder

### `npm run dev`

Runs the app in the development mode.\
Open the localhost url in the terminal to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Getting Started with Math Worksheet API using Node JS

## Folder to add

Copy .env-example
Rename the new file to `.env`
Make sure to change the value by following your database setup in the file.

## Database Schema

The following is the SQL definition for the `ranking` table in the my database:

```sql
CREATE TABLE `ranking` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` int NOT NULL,
  `added_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Available Scripts

In the project directory, you can run:

### `npm install`

Will install all the node modules.\
Remember to run it in both math-rounding-worksheet and server folder

### `npm run start`

Runs the app in the development mode.\
Open the localhost url in the terminal to view it in the browser.

## API Documentation

### **Ranking API**

#### **1️⃣ GET /v1/api/ranking**
Retrieve the list of top-ranking users.

- **URL:** `/v1/api/ranking`
- **Method:** `GET`
- **Response:**
  ```json
  [
    {
      "ID": 1,
      "username": "player1",
      "score": 95,
      "added_at": "2025-03-20T10:00:00Z",
      "updated_at": "2025-03-20T10:30:00Z"
    },
    {
      "ID": 2,
      "username": "player2",
      "score": 88,
      "added_at": "2025-03-19T12:00:00Z",
      "updated_at": "2025-03-19T12:30:00Z"
    }
  ]
  ```

#### **2️⃣ POST /v1/api/ranking-add**
Submit or update a ranking score.

- **URL:** `/v1/api/ranking-add`
- **Method:** `POST`
- **Request Body (JSON):**
  ```json
  {
    "username": "player1",
    "score": 95
  }
  ```
- **Response (If New Entry):**
  ```json
  {
    "message": "Ranking added",
    "username": "player1",
    "score": 95
  }
  ```
- **Response (If Updated):**
  ```json
  {
    "message": "Ranking updated",
    "username": "player1",
    "score": 95
  }
  ```
- **Error Responses:**
  - `400 Bad Request` → Missing or invalid `username`/`score`
  - `500 Internal Server Error` → Database query failure
