import Course from '../models/Course.js';
import cloudinary from '../config/cloudinary.js';
import { streamUpload } from '../utils/upload.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('lectures');
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('lectures');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ message: 'Error fetching course' });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, level, price, duration, instructorName, instructorBio } = req.body;
    
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
        bio: instructorBio
      },
      coverImage
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Error creating course' });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const updates = { ...req.body };

    if (req.files?.coverImage) {
      const result = await streamUpload(req.files.coverImage[0].buffer);
      updates.coverImage = result.secure_url;
    }

    if (req.files?.instructorAvatar) {
      const result = await streamUpload(req.files.instructorAvatar[0].buffer);
      updates.instructor = {
        ...updates.instructor,
        avatar: result.secure_url
      };
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Error updating course' });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete course images from Cloudinary if they exist
    if (course.coverImage) {
      const publicId = course.coverImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await Course.deleteOne({ _id: course._id });
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Error deleting course' });
  }
};
