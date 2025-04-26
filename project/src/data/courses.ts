import { Course } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Bridal Mehndi Masterclass',
    description: 'Learn the art of creating stunning bridal Mehndi patterns with intricate details and traditional symbols. This comprehensive course covers everything from basic strokes to full bridal designs.',
    level: 'Advanced',
    price: 149.99,
    duration: '20 hours',
    instructor: {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Award-winning Mehndi artist with 15+ years of experience specializing in bridal designs.'
    },
    coverImage: 'https://images.pexels.com/photos/1468417/pexels-photo-1468417.jpeg',
    rating: 4.9,
    totalStudents: 2456,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Beginner\'s Guide to Mehndi',
    description: 'Start your Mehndi journey with this beginner-friendly course covering fundamental patterns, techniques, and tools. Perfect for absolute beginners who want to learn Mehndi from scratch.',
    level: 'Beginner',
    price: 49.99,
    duration: '8 hours',
    instructor: {
      id: '2',
      name: 'Aisha Khan',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      bio: 'Passionate Mehndi educator dedicated to teaching beginners the foundations of this beautiful art form.'
    },
    coverImage: 'https://images.pexels.com/photos/1864639/pexels-photo-1864639.jpeg',
    rating: 4.7,
    totalStudents: 3872,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Modern Fusion Mehndi Designs',
    description: 'Explore contemporary Mehndi styles that blend traditional patterns with modern aesthetics. Learn to create unique designs perfect for casual occasions and contemporary brides.',
    level: 'Intermediate',
    price: 89.99,
    duration: '12 hours',
    instructor: {
      id: '3',
      name: 'Rahul Mehta',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Contemporary Mehndi artist known for innovative designs that blend tradition with modern styles.'
    },
    coverImage: 'https://images.pexels.com/photos/5183439/pexels-photo-5183439.jpeg',
    rating: 4.8,
    totalStudents: 1890,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Arabic Mehndi Techniques',
    description: 'Master the bold, flowing style of Arabic Mehndi designs. This course covers the distinctive characteristics of Arabic patterns and teaches you to create impactful designs.',
    level: 'Intermediate',
    price: 79.99,
    duration: '10 hours',
    instructor: {
      id: '4',
      name: 'Zara Hussain',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      bio: 'Specialized in Arabic Mehndi styles with extensive experience teaching international workshops.'
    },
    coverImage: 'https://images.pexels.com/photos/1336191/pexels-photo-1336191.jpeg',
    rating: 4.6,
    totalStudents: 2145,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Indo-Western Fusion Mehndi',
    description: 'Learn to create stunning fusion designs that combine elements from Indian, Arabic, and Western styles. Perfect for artists looking to expand their design repertoire.',
    level: 'Advanced',
    price: 119.99,
    duration: '15 hours',
    instructor: {
      id: '5',
      name: 'Neha Patel',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
      bio: 'Fusion Mehndi specialist with a background in fine arts and traditional Henna application.'
    },
    coverImage: 'https://images.pexels.com/photos/3014298/pexels-photo-3014298.jpeg',
    rating: 4.9,
    totalStudents: 1756,
    isFeatured: true
  },
  {
    id: '6',
    title: 'Mehndi for Special Occasions',
    description: 'Discover designs for various celebrations and festivals. Learn to create occasion-specific patterns for weddings, Eid, Diwali, and other cultural celebrations.',
    level: 'Intermediate',
    price: 69.99,
    duration: '9 hours',
    instructor: {
      id: '6',
      name: 'Lakshmi Rao',
      avatar: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
      bio: 'Cultural Mehndi expert specializing in traditional designs for various celebrations and rituals.'
    },
    coverImage: 'https://images.pexels.com/photos/1456612/pexels-photo-1456612.jpeg',
    rating: 4.7,
    totalStudents: 2310,
    isFeatured: false
  }
];