// controllers/forumController.js
const db = require('../firebase');

const getForums = async (req, res) => {
  try {
    const forumsRef = db.collection('forums').where('studentEmail', '==', req.user.email);
    const snapshot = await forumsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No forums found' });
    }

    const forums = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ forums });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const postForum = async (req, res) => {
  try {
    const { courseName, question, answer } = req.body;
    const newForum = {
      studentEmail: req.user.email,
      courseName,
      question,
      answer,
    };

    const forumRef = db.collection('forums').doc();
    await forumRef.set(newForum);

    res.status(201).json({ message: 'Forum post added successfully', forum: newForum });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getForums, postForum };
