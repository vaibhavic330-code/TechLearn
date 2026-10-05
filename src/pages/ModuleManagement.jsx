import { Link, useParams } from "react-router-dom";
import { courses } from "../data";

function ModuleManagement() {
  const { courseId, moduleIndex } = useParams();

  const course = courses.find(
    (item) => item.id === courseId
  );

  const index = Number(moduleIndex);

  const module = course?.modules?.[index];

  const lectures = JSON.parse(
    localStorage.getItem("techlearnLectures") || "[]"
  );

  const moduleLectures = lectures.filter(
    (lecture) =>
      lecture.courseId === courseId &&
      Number(lecture.moduleIndex) === index
  );

  if (!course || !module) {
    return (
      <main className="page-container">
        <section className="page-header">
          <span className="page-badge">
            MODULE MANAGEMENT
          </span>

          <h1>Module Not Found</h1>

          <p>
            The selected module could not be found.
          </p>

          <Link
            to={`/admin/courses/${courseId}`}
            className="secondary-btn"
          >
            ← Back to Course
          </Link>
        </section>
      </main>
    );
  }

  const moduleTitle =
    typeof module === "string"
      ? module
      : module.title ||
        module.name ||
        `Module ${index + 1}`;

  return (
    <main className="page-container">

      {/* HEADER */}
      <section className="page-header">
        <span className="page-badge">
          MODULE {index + 1}
        </span>

        <h1>{moduleTitle}</h1>

        <p>
          {course.title} · Manage lectures and
          learning content.
        </p>
      </section>

      {/* MODULE STATS */}
      <section className="admin-stats">

        <div className="admin-stat">
          <span>🎥</span>
          <strong>{moduleLectures.length}</strong>
          <p>Lectures</p>
        </div>

        <div className="admin-stat">
          <span>🔴</span>

          <strong>
            {
              moduleLectures.filter(
                (lecture) => lecture.liveLink
              ).length
            }
          </strong>

          <p>Live Classes</p>
        </div>

        <div className="admin-stat">
          <span>▶️</span>

          <strong>
            {
              moduleLectures.filter(
                (lecture) => lecture.recordingLink
              ).length
            }
          </strong>

          <p>Recordings</p>
        </div>

        <div className="admin-stat">
          <span>📚</span>
          <strong>{index + 1}</strong>
          <p>Module</p>
        </div>

      </section>

      {/* MODULE ACTIONS */}
      <section className="detail-section">

        <div className="section-heading">
          <span>LECTURES</span>
          <h2>Module Lectures</h2>
        </div>

        <div className="admin-actions">

          <Link
            to={`/admin/lectures?course=${courseId}&module=${index}`}
            className="secondary-btn"
          >
            🎥 Manage Lectures
          </Link>

          <button
            className="secondary-btn"
            onClick={() =>
              alert(
                "Add lecture functionality will be connected next."
              )
            }
          >
            + Add Lecture
          </button>

        </div>
      </section>

      {/* LECTURE LIST */}
      <section className="detail-section">

        <div className="section-heading">
          <span>SCHEDULED CONTENT</span>
          <h2>Lectures in this Module</h2>
        </div>

        {moduleLectures.length === 0 ? (
          <div className="admin-course">
            <div>
              <h3>No lectures scheduled</h3>

              <p>
                Add a live class or recorded lecture
                for this module.
              </p>
            </div>

            <Link
              to={`/admin/lectures?course=${courseId}&module=${index}`}
              className="secondary-btn"
            >
              Add Lecture
            </Link>
          </div>
        ) : (
          <div className="admin-course-list">

            {moduleLectures.map((lecture) => (
              <div
                className="admin-course"
                key={lecture.id || lecture.title}
              >

                <div>
                  <h3>{lecture.title}</h3>

                  <p>
                    📅 {lecture.date || "Date not set"}
                    {" · "}
                    🕐 {lecture.time || "Time not set"}
                  </p>

                  <p>
                    {lecture.liveLink
                      ? "🔴 Live Class Available"
                      : "⚪ Live Class Not Added"}

                    {" · "}

                    {lecture.recordingLink
                      ? "▶️ Recording Available"
                      : "⚪ Recording Pending"}
                  </p>
                </div>

                <Link
                  to={`/admin/lectures?course=${courseId}&module=${index}`}
                  className="secondary-btn"
                >
                  Manage
                </Link>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* NAVIGATION */}
      <section className="admin-actions">

        <Link
          to={`/admin/courses/${courseId}`}
          className="secondary-btn"
        >
          ← Back to Course
        </Link>

        <Link
          to="/admin"
          className="secondary-btn"
        >
          Dashboard
        </Link>

      </section>

    </main>
  );
}

export default ModuleManagement;