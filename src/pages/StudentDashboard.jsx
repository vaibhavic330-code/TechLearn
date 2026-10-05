import { Link, useNavigate } from "react-router-dom";
import { courses } from "../data";
import "./StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  // Get logged-in student
  const user =
    JSON.parse(localStorage.getItem("techlearnUser")) || null;

  // Get enrolled courses
  const enrolledCourseIds =
    JSON.parse(localStorage.getItem("techlearnCourses")) || [];

  // Get saved course progress
  const savedProgress =
    JSON.parse(localStorage.getItem("techlearnProgress")) || {};

  // Convert course IDs into complete course objects
  const enrolledCourses = enrolledCourseIds
    .map((courseId) =>
      courses.find((course) => course.id === courseId)
    )
    .filter(Boolean);

  // Calculate progress for each enrolled course
  const getCourseProgress = (course) => {
    const totalModules = course.modules?.length || 0;
    const completedModules = savedProgress[course.id] || [];

    if (totalModules === 0) return 0;

    return Math.round(
      (completedModules.length / totalModules) * 100
    );
  };

  // Calculate dashboard statistics
  const totalProgress = enrolledCourses.reduce(
    (total, course) => total + getCourseProgress(course),
    0
  );

  const averageProgress =
    enrolledCourses.length > 0
      ? Math.round(totalProgress / enrolledCourses.length)
      : 0;

  const completedCourses = enrolledCourses.filter(
    (course) => getCourseProgress(course) === 100
  ).length;

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("techlearnLoggedIn");
    navigate("/");
  };

  return (
    <main className="student-dashboard">
      <div className="dashboard-container">

        {/* DASHBOARD HEADER */}
        <section className="dashboard-header">
          <div>
            <span className="page-badge">
              STUDENT DASHBOARD
            </span>

            <h1>
              Welcome back
              {user?.name ? `, ${user.name}` : ""}! 👋
            </h1>

            <p>
              Continue learning and build your skills
              with TechLearn.
            </p>
          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </section>

        {/* STUDENT PROFILE */}
        <section className="student-profile">
          <div className="profile-avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "S"}
          </div>

          <div className="profile-info">
            <h2>
              {user?.name || "TechLearn Student"}
            </h2>

            <p>
              {user?.email || "Student account"}
            </p>

            <span>
              🎓 TechLearn Student
            </span>
          </div>
        </section>

        {/* DASHBOARD STATS */}
        <section className="dashboard-stats">
          <div className="dashboard-stat">
            <span>📚</span>
            <strong>{enrolledCourses.length}</strong>
            <p>Enrolled Courses</p>
          </div>

          <div className="dashboard-stat">
            <span>📊</span>
            <strong>
              {enrolledCourses.length > 0
                ? `${averageProgress}%`
                : "—"}
            </strong>
            <p>Average Progress</p>
          </div>

          <div className="dashboard-stat">
            <span>🏆</span>
            <strong>{completedCourses}</strong>
            <p>Completed Courses</p>
          </div>

          <div className="dashboard-stat">
            <span>📄</span>
            <strong>0</strong>
            <p>Certificates</p>
          </div>
        </section>

        {/* MY COURSES */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <span>MY LEARNING</span>
              <h2>My Courses</h2>
            </div>

            <Link to="/" className="secondary-btn">
              Browse Courses →
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="dashboard-empty">
              <div className="empty-icon">📚</div>

              <h3>No courses enrolled yet</h3>

              <p>
                Start your learning journey by
                enrolling in one of our courses.
              </p>

              <Link
                to="/courses/python"
                className="primary-btn"
              >
                Explore Courses →
              </Link>
            </div>
          ) : (
            <div className="student-course-grid">
              {enrolledCourses.map((course) => {
                const progress = getCourseProgress(course);

                return (
                  <article
                    className="student-course-card"
                    key={course.id}
                  >
                    {/* Course Top */}
                    <div className="student-course-top">
                      <div className="student-course-icon">
                        {course.icon}
                      </div>

                      <span className="enrolled-badge">
                        {progress === 100
                          ? "COMPLETED"
                          : "ENROLLED"}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3>{course.title}</h3>

                    {/* Description */}
                    <p>{course.description}</p>

                    {/* Course Information */}
                    <div className="student-course-meta">
                      <span>⏱ {course.duration}</span>
                      <span>📊 {course.level}</span>
                    </div>

                    {/* Course Progress */}
                    <div className="progress-section">
                      <div className="progress-header">
                        <span>Course Progress</span>
                        <strong>{progress}%</strong>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Course Actions */}
                    <div className="student-course-actions">
                      <Link
                        to={`/courses/${course.id}`}
                        className="primary-btn"
                      >
                        {progress === 100
                          ? "Review Course →"
                          : "Continue Learning →"}
                      </Link>

                      <Link
                        to="/study-material/notes"
                        className="secondary-btn"
                      >
                        Notes
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* STUDY MATERIAL */}
        <section className="dashboard-section">
          <div className="dashboard-section-heading">
            <div>
              <span>RESOURCES</span>
              <h2>Study Material</h2>
            </div>
          </div>

          <div className="dashboard-resource-grid">
            <Link
              to="/study-material/notes"
              className="dashboard-resource-card"
            >
              <span>📘</span>
              <div>
                <h3>Subject Notes</h3>
                <p>
                  Topic-wise notes for exam preparation.
                </p>
              </div>
            </Link>

            <Link
              to="/study-material/questions"
              className="dashboard-resource-card"
            >
              <span>❓</span>
              <div>
                <h3>Important Questions</h3>
                <p>
                  Important questions for exams and interviews.
                </p>
              </div>
            </Link>

            <Link
              to="/study-material/papers"
              className="dashboard-resource-card"
            >
              <span>📄</span>
              <div>
                <h3>Previous Year Papers</h3>
                <p>
                  Practice university question papers.
                </p>
              </div>
            </Link>

            <Link
              to="/study-material/practicals"
              className="dashboard-resource-card"
            >
              <span>💻</span>
              <div>
                <h3>Practicals & Coding</h3>
                <p>
                  Coding programs and practical exercises.
                </p>
              </div>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}

export default StudentDashboard;