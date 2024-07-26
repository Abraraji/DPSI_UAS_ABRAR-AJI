// controllers/scheduleController.js
const db = require('../firebase');

const getClassSchedules = async (req, res) => {
  try {
    const schedulesRef = db.collection('schedules').where('studentEmail', '==', req.user.email);
    const snapshot = await schedulesRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'No schedules found' });
    }

    const schedules = snapshot.docs.map(doc => doc.data());
    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const postClassSchedule = async (req, res) => {
  try {
    const { courseName, time, lecturer, location } = req.body;
    const newSchedule = {
      studentEmail: req.user.email,
      courseName,
      time,
      lecturer,
      location,
    };

    const scheduleRef = db.collection('schedules').doc();
    await scheduleRef.set(newSchedule);

    res.status(201).json({ message: 'Schedule added successfully', schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getClassSchedules, postClassSchedule };
