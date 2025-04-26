// server/controllers/courses.js
import Course from '../models/Course.js';
import cloudinary from '../config/cloudinary.js';
import { streamUpload } from '../utils/upload.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Lecture from '../models/Lecture.js';

export const getAllCourses = asyncHandler(async (req, res) => {
  const { featured, level, sort, search } = req.query;
  const queryObject = {};

  // Filter
  if (featured) {
    queryObject.isFeatured = featured === 'true';
  }
  
  if (level) {
    queryObject.level = level;
  }
  
  if (search) {
    queryObject.title = { $regex: search, $options: 'i' };
  }

  let query = Course.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    query = query.sort(sortList);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  const courses = await query.populate({
    path: 'lectures',
    select: 'title duration order',
    options: { sort: { order: 1 } }
  });

  const total = await Course.countDocuments(queryObject);

  res.json({
    success: true,
    count: courses.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    courses
  });
});

export const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'lectures',
    options: { sort: { order: 1 } }
  });
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }
  
  res.json({
    success: true,
    course
  });
});

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, level, price, duration, instructorName, instructorBio } = req.body;
  
  if (!title || !description || !level || !price || !instructorName) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields'
    });
  }
  
  let coverImage = '';
  let instructorAvatar = '';

  if (req.files?.coverImage) {
    const result = await streamUpload(req.files.coverImage[0].buffer);
    coverImage = result.secure_url;
  }

  if (req.files?.instructorAvatar) {
    const result = await streamUpload(req.files.instructorAvatar[0].buffer);
    instructorAvatar = result.secure_url;
  }

  const course = await Course.create({
    title,
    description,
    level,
    price: parseFloat(price),
    duration,
    instructor: {
      name: instructorName,
      avatar: instructorAvatar,
      bio: instructorBio || ''
    },
    coverImage
  });

  res.status(201).json({
    success: true,
    course
  });
});

export const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  const updates = { ...req.body };
  
  // Handle instructor nested object updates
  if (updates.instructorName || updates.instructorBio) {
    updates.instructor = {
      ...course.instructor,
      name: updates.instructorName || course.instructor.name,
      bio: updates.instructorBio || course.instructor.bio
    };
    
    // Remove properties not in the schema
    delete updates.instructorName;
    delete updates.instructorBio;
  }

  // Handle file uploads
  if (req.files?.coverImage) {
    const result = await streamUpload(req.files.coverImage[0].buffer);
    updates.coverImage = result.secure_url;
    
    // Delete old image from Cloudinary if it exists
    if (course.coverImage) {
      const publicId = course.coverImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
  }

  if (req.files?.instructorAvatar) {
    const result = await streamUpload(req.files.instructorAvatar[0].buffer);
    
    if (!updates.instructor) {
      updates.instructor = { ...course.instructor };
    }
    
    updates.instructor.avatar = result.secure_url;
    
    // Delete old avatar from Cloudinary if it exists
    if (course.instructor.avatar) {
      const publicId = course.instructor.avatar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  ).populate('lectures');

  res.json({
    success: true,
    course: updatedCourse
  });
});

export const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  
  if (!course) {
    return res.status(404).json({
      success: false,
      message: 'Course not found'
    });
  }

  // Delete course images from Cloudinary if they exist
  if (course.coverImage) {
    const publicId = course.coverImage.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  }
  
  if (course.instructor.avatar) {
    const publicId = course.instructor.avatar.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);
  }
  
  // Delete all lectures associated with the course
  await Lecture.deleteMany({ courseId: course._id });
  
  // Delete the course
  await Course.deleteOne({ _id: course._id });
  
  res.json({
    success: true,
    message: 'Course and associated lectures deleted successfully'
  });
});