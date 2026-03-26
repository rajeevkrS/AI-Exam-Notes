<div align="center">
    <h1>PrepMate Ai</h1>

This application is deployed on Vercel. Please check it out [here](https://hiremeett.vercel.app/).

![prepmate-thumbnail](client/public/PrepMateAi.png)

</div>

## Introduction

PrepMate AI is an AI-powered exam preparation platform designed to help students learn smarter, revise faster, and stay organized. Built using the MERN stack, the application leverages artificial intelligence to generate structured, exam-oriented notes enriched with diagrams and charts for better visualization and deeper understanding.

The platform provides a seamless experience for creating, managing, and revisiting study materials, ensuring users can focus on productivity rather than manual note-taking. With features like personalized note history, intuitive navigation, and premium-based revision tools, PrepMate AI simplifies the entire study workflow.

Designed with a modern and responsive user interface, PrepMate AI combines performance, scalability, and usability—making it a reliable companion for students preparing for exams.

## 🖥️ Tech Stack

**Frontend:**

![React](https://img.shields.io/badge/react_js-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
&nbsp;
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
&nbsp;
![Static Badge](https://img.shields.io/badge/redux-%23764ABC?style=for-the-badge&logo=redux&logoColor=white)
&nbsp;
![Static Badge](https://img.shields.io/badge/tailwindcss-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black)
&nbsp;
![Static Badge](https://img.shields.io/badge/motion-%23FFD100?style=for-the-badge&logo=monster&logoColor=black)
&nbsp;
![Static Badge](https://img.shields.io/badge/mermaid-%23FF3670?style=for-the-badge&logo=mermaid&logoColor=white)
&nbsp;
![Static Badge](https://img.shields.io/badge/firebase-%23DD2C00?style=for-the-badge&logo=firebase&logoColor=black)

**Backend:**

![Static Badge](https://img.shields.io/badge/Node_JS-%235FA04E?style=for-the-badge&logo=nodedotjs&logoColor=black)
&nbsp;
![Static Badge](https://img.shields.io/badge/Express_JS-%23000000?style=for-the-badge&logo=express&logoColor=white)
&nbsp;
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=black)
&nbsp;
![Static Badge](https://img.shields.io/badge/stripe-%23635BFF?style=for-the-badge&logo=stripe&logoColor=white)

**Deployed On:**

![Static Badge](https://img.shields.io/badge/vercel-%23000000?style=for-the-badge&logo=vercel&logoColor=white)
&nbsp;

## 🚀 Key Features

### 🧠 AI-Powered Notes Generation

- Generate structured, exam-oriented notes using AI
- Customizable inputs: topic, class level, and exam type
- Supports diagram and chart-based explanations for better understanding
- Smart prompt system for high-quality content generation

### 📚 Notes History & Management

- Access all previously generated notes in one place
- View detailed notes with structured content
- Delete notes securely with user-specific access
- Notes linked directly to user accounts for personalization

### 💎 Premium Revision Mode

- Dedicated Exam Revision Mode for focused learning
- Available only for premium users
- Optimized content for quick revision and retention

### 💳 Credit-Based System & Payments

- Credit-based usage system for generating notes
- Integrated Stripe payment gateway for purchasing credits
- Secure payment verification and credit allocation
- Prevents duplicate transactions and ensures consistency

### 📄 PDF Export Functionality

- Download generated notes as well-structured PDFs
- Includes:
  - Subtopics
  - Notes
  - Revision points
  - Questions (short & long)
- Clean formatting for offline study and sharing

### 🔐 Authentication & Security

- Google-based authentication system
- Secure session handling using HTTP-only cookies
- Personalized user data and note tracking

### ⚡ Performance & User Experience

- Fast and responsive UI built with React & Tailwind
- Seamless navigation between notes and history
- Optimized backend with Express & MongoDB
- Scalable architecture for future enhancements

## Installation

1. **Clone the repository**:

   ```sh
   git clone https://github.com/rajeevkrS/AI-Exam-Notes
   ```

2. **Install dependencies in admin, backend and frontend**:

   ```sh
   cd server
   npm install

   cd client
   npm install
   ```

3. **Set up environment `.env` variables**:

   ```dotenv
                        # BACKEND ENV GUIDE

   PORT= your port no.

   DB_URL= your mongodb url

   JWT_SECRET= your jwt key

   CLIENT_URL= your client/frontend url

   GEMINI_API_KEY= your gemini api key

   STRIPE_SECRET_KEY= your stripe secret key


                        # FRONTEND ENV GUIDE

   VITE_BACKEND_URL= your backend url
   VITE_FIREBASE_APIKEY= your firebase pi key
   ```

4. **Run the application**:

   In the `server` directory, start the server:

   ```sh
   npm run server
   ```

   In the `client` directory, start the Frontend React app:

   ```sh
   npm run dev
   ```

## API Endpoints

Here are listed all available API endpoints along with a brief description of each.

#### Authentication Routes:

- `POST /api/auth/google`: ogin or signup using Google
- `GET /api/auth/logout`: logout the current user

#### User Routes:

- `GET /api/user/currentuser`: get current logged-in user details

#### Notes Routes:

- `POST /api/notes/generate-notes`: generate AI-powered notes (supports diagrams & charts)
- `GET /api/notes/getnotes`: get all notes of the logged-in user
- `GET /api/notes/:id`: get a specific note by ID
- `DELETE /api/notes/:id`: delete a specific note

#### Credits & Payment Routes:

- `POST /api/credit/order`: create Stripe payment session for credits
- `POST /api/credit/verify-payment`: verify payment and add credits to user

#### PDF Routes:

- `POST /api/pdf/generate-pdf`: generate and download notes as PDF

## 👤 Developer

[RAJEEV KUMAR SUDHANSU](https://github.com/rajeevkrS)

## 📬 Contact

If you want to contact me, you can reach me through below handles.

<a href="https://www.linkedin.com/in/rajeev-kumar-sudhansu-b52027326/" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>

<a href="mailto:rajeevkumarr1221@gmail.com"><img  alt="Gmail" src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" /></a>

## Contribution:

Feel free to contribute to the project by opening issues or creating pull requests. Your feedback and suggestions are highly appreciated.

### Show your support by Star 🌟 this repo!
