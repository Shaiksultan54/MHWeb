// server/routes/courses.js
import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/auth.js';
import { 
  getAllCourses, 
  getCourseById, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from '../controllers/courses.js';

const router = express.Router();
// Configure multer for memory storage (for Cloudinary)
const upload = multer({ storage: multer.memoryStorage() });

const courseUpload = upload.fields([
  { name: 'coverImage', maxCount: 1 },
  { name: 'instructorAvatar', maxCount: 1 }
]);

router.route('/')
  .get(getAllCourses)
  .post(protect, admin, courseUpload, createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(protect, admin, courseUpload, updateCourse)
  .delete(protect, admin, deleteCourse);

export default router;
