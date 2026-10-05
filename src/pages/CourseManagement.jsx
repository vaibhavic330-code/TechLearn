import { Link, useParams } from "react-router-dom";
import { courses } from "../data";

function CourseManagement() {
  const { courseId } = useParams();

  const course = courses.find(
    (item) => item.id === courseId
  );

  if (!course) {
    return (
      <main className="page-container">
        <section className="page-header">
          <span className="page-badge">COURSE MANAGEMENT</span>

          <h1>Course Not Found</h1>

          <p>
            The selected course could not be found.
          </p>

          <Link to="/admin" className="secondary-btn">
            ← Back to Dashboard
          </Link>
        </section>
      </main>
    );
  }

  const modules = course.modules || [];

  return (
    <main className="page-container">
      {/* HEADER */}
      <section className="page-header">
        <span className="page-badge">
          COURSE MANAGEMENT
        </span>

        <h1>{course.title || course.name}</h1>

        <p>
          Manage modules, lectures, recordings and
          learning resources.
        </p>
      </section>

      {/* COURSE OVERVIEW */}
      <section className="admin-stats">
        <div className="admin-stat">
          <span>📚</span>
          <strong>{modules.length}</strong>
          <p>Modules</p>
        </div>

        <div className="admin-stat">
          <span>🎥</span>
          <strong>0</strong>
          <p>Lectures</p>
        </div>

        <div className="admin-stat">
          <span>🔴</span>
          <strong>0</strong>
          <p>Live Classes</p>
        </div>

        <div className="admin-stat">
          <span>▶️</span>
          <strong>0</strong>
          <p>Recordings</p>
        </div>
      </section>

      {/* COURSE ACTIONS */}
      <section className="detail-section">
        <div className="section-heading">
          <span>COURSE TOOLS</span>
          <h2>Manage Course</h2>
        </div>

        <div className="admin-actions">
          <Link
            to={`/admin/lectures?course=${course.id}`}
            className="secondary-btn"
          >
            🎥 Manage Lectures
          </Link>

          <button
            className="secondary-btn"
            onClick={() =>
              alert("Recording management will be connected next.")
            }
          >
            ▶️ Manage Recordings
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              alert("Study material management will be connected next.")
            }
          >
            📄 Course Materials
          </button>
        </div>
      </section>

      {/* MODULES */}
      <section className="detail-section">
        <div className="section-heading">
          <span>CURRICULUM</span>
          <h2>Course Modules</h2>
        </div>

        {modules.length === 0 ? (
          <p>No modules available for this course yet.</p>
        ) : (
          <div className="admin-course-list">
            {modules.map((module, index) => {
              const moduleTitle =
                typeof module === "string"
                  ? module
                  : module.title || module.name || `Module ${index + 1}`;

              return (
                <div
                  className="admin-course"
                  key={index}
                >
                  <div>
                    <span className="page-badge">
                      MODULE {index + 1}
                    </span>

                    <h3>{moduleTitle}</h3>
                  </div>
                   
                   <Link
                    to={`/admin/courses/${course.id}/modules/${index}`}
                    className="secondary-btn"
                    >
                    Manage
                   </Link>
                  
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* BACK */}
      <section className="admin-actions">
        <Link to="/admin" className="secondary-btn">
          ← Back to Dashboard
        </Link>
      </section>
    </main>
  );
}

export default CourseManagement;