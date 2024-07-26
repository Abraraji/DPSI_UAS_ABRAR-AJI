// controllers/gradesController.js
const db = require('../firebase');

const getGrades = async (req, res) => {
  try {
    const gradesRef = db.collection('grades').where('studentEmail', '==', req.user.email);
    const snapshot = await gradesRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No grades found' });
    }

    const grades = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ grades });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const postGrade = async (req, res) => {
  try {
    const { courseName, uts, uas, finalGrade } = req.body;
    const newGrade = {
      studentEmail: req.user.email,
      courseName,
      uts,
      uas,
      finalGrade,
    };

    const gradeRef = db.collection('grades').doc();
    await gradeRef.set(newGrade);

    res.status(201).json({ message: 'Grade added successfully', grade: newGrade });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getGrades, postGrade };
