
# 🌐 PortfolioCodev

**PortfolioCodev** is a developer portfolio and discovery platform that allows users to showcase their coding profiles, skills, and projects—all in one place. Recruiters can explore developer profiles based on skills, streamlining the hiring process.

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/screenshots/SS1.png) 

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

<br>


#  🖥️ User View


## 1. Login Page
![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS2.png) 

   <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS3.png) 

<br>
<br>


## 2. Home Page
![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/screenshots/SS1.png)) 

   <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS4.png) 

<br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS5.png) 

<br>
<br>


## 3. Dashboard Page
![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS7.png)) 

   <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS8.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS9.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS10.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS11.png) 


<br>
<br>

## 🛣️ Let's create Portfolio
![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS18.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS13.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS14.png) 

  <br>



![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS20.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS15.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS16.png) 

  <br>
  <br>

  

## 4. Dashboard
![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS6.png) 

<br>


![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS21.png) 

<br>
<br>

## 🚀 PORTFOLIO
![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS22.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS23.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS24.png) 

  <br>

![image](https://github.com/Surbhijain00/PortfolioCodev/blob/main/public/SS25.png) 

  <br>







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
