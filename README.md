# MHWeb - Mehndi Designs LMS Platform ✨

Welcome to **MHWeb**, a modern Learning Management System (LMS) platform designed for learning beautiful **Mehndi Designs** through structured video courses.

## 🚀 Features
- 🎥 **Video Courses**: Learn from high-quality Mehndi design tutorials.
- 🔒 **Protected Access**: Only paid users can access premium content.
- ☁️ **Cloud Storage**: Videos are securely hosted and streamed.
- 📚 **Course Management**: Organized playlists for easy learning.
- 💬 **Responsive Design**: Accessible across mobile, tablet, and desktop devices.
- 🔑 **Authentication**: Secure login and role-based access (admin, user).

## 🛠 Tech Stack
- **Frontend**: React.js (Vite) + TailwindCSS
- **Backend**: Node.js + Express.js
- **Authentication**: JWT Tokens + Auth Service
- **Database**: MongoDB Atlas
- **Hosting**: versal
- **Cloud Storage**: Cloudinary 

## 📂 Project Structure
```bash
MHWeb/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── routes/
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── README.md
├── package.json
└── tailwind.config.js
```

🧑‍💻 Getting Started
1. Clone the Repository
```bash
git clone https://github.com/Shaiksultan54/MHWeb
cd MHWeb
```
2. Install Dependencies
```bash 
# Install frontend dependencies
npm install
# Move to backend folder if separate
cd server
npm install
```
3. Set up Environment Variables
Create a .env file inside the server/ folder:
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
CLOUD_STORAGE_URL=your-cloud-storage-url
```
4. Run the Development Server
```bash
# Start backend
npm run server
# Start frontend
npm run dev
```
5. Open in Browser
```bash
Go to:
http://localhost:5173/
```
🙌 Contributing
Contributions are welcome!
Feel free to fork this repo, open issues, or submit pull requests.

📃 License
This project is licensed under the MIT License.

📬 Contact
If you have any questions or feedback:

📧 Email: sultan541790@gmail.com
