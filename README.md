
# 🌐 PortfolioCodev

**PortfolioCodev** is a developer portfolio and discovery platform that allows users to showcase their coding profiles, skills, and projects—all in one place. Recruiters can explore developer profiles based on skills, streamlining the hiring process.

## 🚀 Features

- 👤 **Profile Showcase**  
  - Add coding platform usernames (e.g., LeetCode, GitHub)  
  - List skills and upload projects  
  - Upload profile photo to Cloudinary  

- 🧭 **Explore Page**  
  - Browse developers by skill  
  - Visit public profiles at `/explore/[username]`

## 🏗️ Tech Stack

  Next.js (App Router), Tailwind CSS, Framer Motion, MongoDB with Mongoose, JWT tokens, Cloudinary for images and resumes, Redux for state management 

## 📁 Folder Structure

  ```bash

  src/
├── app/
│   ├── (auth)/                      # Authentication pages
│   │   ├── login/                  
│   │   └── signup/
│   ├── api/                         # API route handlers
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── me/
│   │   │   └── register/
│   │   ├── platforms/
│   │   │   └── [platformId]/        # CRUD for platforms
│   │   ├── projects/
│   │   │   └── [projectId]/         # CRUD for projects
│   │   └── users/
│   │       ├── password/            # Change/reset password
│   │       └── [username]/          # Get/update user profile
│   ├── dashboard/
│   │   └── edit-profile/            # Profile editing
│   └── explore/
│       └── [username]/              # Public user profiles
├── components/
│   ├── DashboardComponents/         # Components for dashboard UI
│   ├── EditProfileComponents/       # Components for editing profile
│   ├── ProfileComponents/           # Components for public profile view
│   └── ui/                          # Reusable UI components
├── lib/                             # Helpers (e.g., API, auth utils)
├── models/                          # Mongoose models
└── redux/
    └── features/                    # Redux slices

public/
└── platforms/                       # Platform logos/icons

```

## 🛠️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Surbhijain00/PortfolioCodev.git
   cd Portfoliocodev

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
   Create a .env.local file in the root directory with the following:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development or production
   NEXT_PUBLIC_API_URL=http:
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

4. **Run the development server**
   ```bash
   npm run dev

## Contact

Created by Surbhi jain – feel free to reach out!
