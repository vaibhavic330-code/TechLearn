import { Link } from "react-router-dom";

function Admin() {
  const courses = [
    {
      id: "python",
      name: "Python Programming",
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
    },
    {
      id: "dbms",
      name: "Database Management System",
    },
  ];

  return (
    <main className="page-container">
      <section className="page-header">
        <span className="page-badge">EDUCATOR PANEL</span>

        <h1>TechLearn Dashboard</h1>

        <p>
          Manage courses, students and study resources.
        </p>
      </section>

      {/* ADMIN STATS */}
      <section className="admin-stats">
        <div className="admin-stat">
          <span>📚</span>
          <strong>3</strong>
          <p>Courses</p>
        </div>

        <div className="admin-stat">
          <span>👨‍🎓</span>
          <strong>0</strong>
          <p>Students</p>
        </div>

        <div className="admin-stat">
          <span>📄</span>
          <strong>0</strong>
          <p>Resources</p>
        </div>

        <div className="admin-stat">
          <span>💰</span>
          <strong>₹0</strong>
          <p>Revenue</p>
        </div>
      </section>

      {/* COURSES */}
      <section className="detail-section">
        <div className="section-heading">
          <span>COURSES</span>
          <h2>Manage Courses</h2>
        </div>

        <div className="admin-course-list">
          {courses.map((course) => (
            <div className="admin-course" key={course.id}>
              <h3>{course.name}</h3>

              <Link
                to={`/admin/courses/${course.id}`}
                className="secondary-btn"
              >
                Manage
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* STUDY MATERIAL */}
      <section className="admin-actions">
        <Link
          to="/study-material/notes"
          className="secondary-btn"
        >
          Manage Notes
        </Link>

        <Link
          to="/study-material/papers"
          className="secondary-btn"
        >
          Manage Papers
        </Link>

        <Link
          to="/study-material/practicals"
          className="secondary-btn"
        >
          Manage Practicals
        </Link>
      </section>
    </main>
  );
}

export default Admin;