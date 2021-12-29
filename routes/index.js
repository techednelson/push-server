const express = require('express');
const { getMessaging } = require('firebase-admin/messaging');
const router = express.Router();

router.post('/subscribe', async (req, res) => {
  console.log('token', req.body);
  const { token, topic } = req.body;
  try {
    const response = await getMessaging().subscribeToTopic(token, topic);
    console.log('Successfully subscribed to topic:', response);
    res.send({ message: 'Successfully subscribed' }).status(200);
  } catch (error) {
    console.log('Error subscribing to topic:', error);
    res.send(error.message).status(500);
  }
});

router.post('/unsubscribe', async (req, res) => {
  const { token, topic } = req.body;
  try {
    const response = await getMessaging().unsubscribeFromTopic(token, topic);
    console.log('Successfully unsubscribed from topic:', response);
    res.send({ message: 'Successfully unsubscribed' }).status(200);
  } catch (error) {
    console.log('Error unsubscribing from topic:', error);
    res.send(error.message).status(500);
  }
});

module.exports = router;
