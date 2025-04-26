// server/routes/lectures.js
import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/auth.js';
import { 
  getLecturesByCourse, 
  getLectureById,
  createLecture, 
  updateLecture, 
  deleteLecture 
} from '../controllers/lectures.js';

const router = express.Router();

// Configure multer for memory storage (for Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

router.get('/course/:courseId', protect, getLecturesByCourse);
router.get('/:id', protect, getLectureById);
router.post('/', protect, admin, upload.single('video'), createLecture);
router.put('/:id', protect, admin, upload.single('video'), updateLecture);
router.delete('/:id', protect, admin, deleteLecture);

export default router;
