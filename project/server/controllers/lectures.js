// server/controllers/lectures.js
import Lecture from '../models/Lecture.js';
import Course from '../models/Course.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { streamUpload } from '../utils/upload.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getLecturesByCourse = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  
  // Verify course exists
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }
  
  const lectures = await Lecture.find({ courseId }).sort('order');
  
  res.json({
    success: true,
    count: lectures.length,
    lectures
  });
});

export const getLectureById = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  
  if (!lecture) {
    return res.status(404).json({
      success: false,
      message: 'Lecture not found'
    });
  }
  
  res.json({
    success: true,
    lecture
  });
});

export const createLecture = asyncHandler(async (req, res) => {
  const { title, description, courseId, order, duration } = req.body;
  
  if (!title || !courseId || !req.file) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields and video file'
    });
  }
  
  // Check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }
  
  // Upload video to Cloudinary
  const result = await streamUpload(req.file.buffer);
  const videoUrl = result.secure_url;
  
  // Calculate the next order number if not provided
  let lectureOrder = order;
  if (!lectureOrder) {
    const lastLecture = await Lecture.findOne({ courseId }).sort('-order');
    lectureOrder = lastLecture ? lastLecture.order + 1 : 1;
  }
  
  const lecture = await Lecture.create({
    title,
    description,
    videoUrl,
    duration: duration || 'Unknown',
    courseId,
    order: lectureOrder
  });
  
  // Add lecture to course
  await Course.findByIdAndUpdate(courseId, {
    $push: { lectures: lecture._id }
  });
  
  res.status(201).json({
    success: true,
    lecture
  });
});

export const updateLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  
  if (!lecture) {
    return res.status(404).json({
      success: false,
      message: 'Lecture not found'
    });
  }
  
  const updates = { ...req.body };
  
  // Handle video upload if provided
  if (req.file) {
    // Upload new video to Cloudinary
    const result = await streamUpload(req.file.buffer);
    updates.videoUrl = result.secure_url;
    
    // Delete old video from Cloudinary if it exists
    if (lecture.videoUrl) {
      const publicId = lecture.videoUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
    }
  }
  
  const updatedLecture = await Lecture.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  );
  
  res.json({
    success: true,
    lecture: updatedLecture
  });
});

export const deleteLecture = asyncHandler(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  
  if (!lecture) {
    return res.status(404).json({
      success: false,
      message: 'Lecture not found'
    });
  }
  
  // Remove lecture from course
  await Course.findByIdAndUpdate(lecture.courseId, {
    $pull: { lectures: lecture._id }
  });
  
  // Delete video from Cloudinary if it exists
  if (lecture.videoUrl) {
    const publicId = lecture.videoUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });
  }
  
  // Delete the lecture
  await Lecture.deleteOne({ _id: lecture._id });
  
  res.json({
    success: true,
    message: 'Lecture deleted successfully'
  });
});