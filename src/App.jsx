import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
} from "react-router-dom";

import "./App.css";

import CoursePage from "./pages/CoursePage";
import StudyMaterialPage from "./pages/StudyMaterialPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import StudentDashboard from "./pages/StudentDashboard";
import Certificate from "./pages/Certificate";
import LectureManagement from "./pages/LectureManagement";
import CourseManagement from "./pages/CourseManagement";
import ModuleManagement from "./pages/ModuleManagement";

import { courses } from "./data";

const materials = [
  {
    type: "notes",
    icon: "📘",
    title: "Subject Notes",
    text: "Easy-to-understand notes for university subjects.",
    button: "Explore Notes →",
  },
  {
    type: "questions",
    icon: "❓",
    title: "Important Questions",
    text: "Important questions for exam preparation.",
    button: "View Questions →",
  },
  {
    type: "papers",
    icon: "📄",
    title: "Previous Year Papers",
    text: "Practice with previous university question papers.",
    button: "View Papers →",
  },
  {
    type: "practicals",
    icon: "💻",
    title: "Practical & Coding",
    text: "Practicals, programs and project-based learning.",
    button: "Explore Practicals →",
  },
];

/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  return (
    <div className="website">
      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="page-badge">WELCOME TO TECHLEARN</span>

          <h1>
            Learn. Build.
            <br />
            <span>Grow Your Career.</span>
          </h1>

          <p>
            Practical courses, study material and career-focused learning
            designed for CSE, AI/ML and Data Science students.
          </p>

          <div className="hero-actions">
            <Link to="/courses/python" className="primary-btn">
              Start Learning →
            </Link>

            <Link
              to="/study-material/notes"
              className="secondary-btn"
            >
              Free Study Material
            </Link>
          </div>
        </div>

        <div className="hero-code-card">
          <div className="code-header">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <pre>
{`student = "Future Developer"

learn()
practice()
build_projects()

if consistency:
    career = "SUCCESS 🚀"`}
          </pre>
        </div>
      </section>

      {/* ================= LEARNING PATH ================= */}
      <section className="branches section">
        <div className="section-heading">
          <span>FOR STUDENTS</span>
          <h2>Choose Your Learning Path</h2>
        </div>

        <div className="branch-grid">
          <div className="branch-card">
            <span>💻</span>

            <h3>Computer Science</h3>

            <p>
              Programming, DBMS, CN, OS and core CS subjects.
            </p>
          </div>

          <div className="branch-card">
            <span>🤖</span>

            <h3>AI & Machine Learning</h3>

            <p>
              ML algorithms, Python, data processing and projects.
            </p>
          </div>

          <div className="branch-card">
            <span>📊</span>

            <h3>Data Science</h3>

            <p>
              Python, statistics, data analysis and visualization.
            </p>
          </div>
        </div>
      </section>

      {/* ================= COURSES ================= */}
      <section
        className="courses-section section"
        id="courses"
      >
        <div className="section-heading">
          <span>POPULAR COURSES</span>

          <h2>Learn Skills That Matter</h2>
        </div>

        <div className="course-grid">
          {courses.map((course) => (
            <article
              className="course-card"
              key={course.id}
            >
              <div className="course-icon">
                {course.icon}
              </div>

              <h3>{course.title}</h3>

              <p>{course.description}</p>

              <Link
                to={`/courses/${course.id}`}
                className="secondary-btn"
              >
                View Course →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about section" id="about">
        <div className="about-content">
          <span className="page-badge">
            ABOUT TECHLEARN
          </span>

          <h2>
            Learn From Someone Who
            <br />
            <span>Builds & Teaches.</span>
          </h2>

          <p>
            TechLearn is created to help students understand
            technical concepts through simple explanations,
            practical examples, projects and exam-focused
            preparation.
          </p>

          <p>
            <strong>Educator:</strong> Vaibhavi Chavan
          </p>

          <Link
            to="/signup"
            className="primary-btn"
          >
            Join TechLearn →
          </Link>
        </div>
      </section>

      {/* ================= STUDY MATERIAL ================= */}
      <section
        className="resources section"
        id="resources"
      >
        <div className="section-heading">
          <span>STUDY MATERIAL</span>

          <h2>Everything You Need To Prepare</h2>
        </div>

        <div className="resource-grid">
          {materials.map((material) => (
            <article
              className="resource-card"
              key={material.type}
            >
              <div className="resource-icon">
                {material.icon}
              </div>

              <h3>{material.title}</h3>

              <p>{material.text}</p>

              <Link
                to={`/study-material/${material.type}`}
                className="secondary-btn"
              >
                {material.button}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ================= CAREER ================= */}
      <section
        className="career section"
        id="career"
      >
        <div className="section-heading">
          <span>CAREER PREPARATION</span>

          <h2>
            Don't Just Learn. Build Your Career.
          </h2>
        </div>

        <div className="career-grid">
          <div>📄 Resume Building</div>

          <div>💼 Interview Preparation</div>

          <div>🧠 Technical Skills</div>

          <div>🚀 Project Development</div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta section">
        <h2>Ready to Start Learning?</h2>

        <p>
          Join TechLearn and build the skills you need for
          your next opportunity.
        </p>

        <Link
          to="/signup"
          className="primary-btn"
        >
          Create Free Account →
        </Link>
      </section>
    </div>
  );
}

/* =====================================================
   PROTECTED ROUTE
===================================================== */

function ProtectedRoute({ children, role }) {
  const loggedIn =
    localStorage.getItem("techlearnLoggedIn") === "true";

  const user = JSON.parse(
    localStorage.getItem("techlearnUser")
  );

  /* User is not logged in */
  if (!loggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  /* User does not have required role */
  if (role && user.role !== role) {
    /* Student trying to access admin */
    if (user.role === "student") {
      return <Navigate to="/student" replace />;
    }

    /* Admin trying to access student dashboard */
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    /* Unknown role */
    return <Navigate to="/" replace />;
  }

  return children;
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <BrowserRouter>
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <Link
          to="/"
          className="logo"
        >
          <span className="logo-icon">⚡</span>

          <strong>TechLearn</strong>
        </Link>

        <nav>
          <NavLink to="/">Home</NavLink>

          <a href="/#courses">
            Courses
          </a>

          <a href="/#resources">
            Study Material
          </a>

          <a href="/#career">
            Career
          </a>

          <a href="/#about">
            About
          </a>
        </nav>

        <div className="nav-actions">
          <Link
            to="/login"
            className="login-link"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="nav-btn"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ================= ROUTES ================= */}
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* COURSES */}
        <Route
          path="/courses/:courseId"
          element={<CoursePage />}
        />

        {/* STUDY MATERIAL */}
        <Route
          path="/study-material/:type"
          element={<StudyMaterialPage />}
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        
        <Route
        path="/admin/courses/:courseId"
        element={
        <ProtectedRoute role="admin">
        <CourseManagement />
           </ProtectedRoute>
          }
        />

        <Route
        path="/admin/courses/:courseId/modules/:moduleIndex"
        element={
        <ProtectedRoute role="admin">
        <ModuleManagement />
        </ProtectedRoute>
        }
        />

        <Route
          path="/admin/lectures"
          element={
            <ProtectedRoute role="admin">
              <LectureManagement />
            </ProtectedRoute>
          }
        />

        {/* CHECKOUT */}
        <Route
          path="/checkout/:courseId"
          element={<Checkout />}
        />

        {/* ================= STUDENT ================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* CERTIFICATE */}
        <Route
          path="/certificate/:courseId"
          element={<Certificate />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;