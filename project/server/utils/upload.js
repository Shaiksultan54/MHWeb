// import cloudinary from '../config/cloudinary.js';
// import streamifier from 'streamifier';

// export const streamUpload = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       {
//         folder: 'mehndi-master',
//       },
//       (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(stream);
//   });
// };
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'course-platform',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
