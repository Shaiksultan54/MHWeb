import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/auth.js';
import Lecture from '../models/Lecture.js';
import Course from '../models/Course.js';

const router = express.Router();

// Configure multer for video upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'server/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get lectures for a course
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const lectures = await Lecture.find({ courseId: req.params.courseId })
      .sort('order');
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add lecture to course (admin only)
router.post('/', protect, admin, upload.single('video'), async (req, res) => {
  try {
    const { title, description, courseId, order } = req.body;
    const videoUrl = `/uploads/${req.file.filename}`;

    const lecture = await Lecture.create({
      title,
      description,
      videoUrl,
      courseId,
      order
    });

    // Add lecture to course
    await Course.findByIdAndUpdate(courseId, {
      $push: { lectures: lecture._id }
    });

    res.status(201).json(lecture);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lecture (admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.json(lecture);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lecture (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }

    // Remove lecture from course
    await Course.findByIdAndUpdate(lecture.courseId, {
      $pull: { lectures: lecture._id }
    });

    await lecture.remove();
    res.json({ message: 'Lecture deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;