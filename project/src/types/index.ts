// Type definitions for the application

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  duration: string;
  instructor: Instructor;
  coverImage: string;
  previewVideo?: string;
  rating: number;
  totalStudents: number;
  isFeatured?: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}