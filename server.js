'use strict';
const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = process.env.FIREBASE_KEY;
const dbUrl = "https://<Your DB>.firebaseio.com";

const initializeFirebaseSDK = () => {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: dbUrl,
  });
  console.info("Initialized Firebase SDK");
};

// firebase
initializeFirebaseSDK();


const app = express();
app.use(cors())
app.use(express.json());
app.use('/api', require('./routes'));

const port = process.env.PORT || 3333;
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

module.exports = app;
