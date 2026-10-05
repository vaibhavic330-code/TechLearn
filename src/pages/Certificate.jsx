import { Link, useParams } from "react-router-dom";
import { courses } from "../data";
import "./Certificate.css";

function Certificate() {
  const { courseId } = useParams();

  const course = courses.find((item) => item.id === courseId);

  const user =
    JSON.parse(localStorage.getItem("techlearnUser") || "null");

  const savedProgress =
    JSON.parse(localStorage.getItem("techlearnProgress") || "{}");

  const completedModules = savedProgress[courseId] || [];
  const totalModules = course?.modules?.length || 0;

  const isCompleted =
    totalModules > 0 &&
    completedModules.length >= totalModules;

  const completionDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!course) {
    return (
      <main className="certificate-page">
        <div className="certificate-message">
          <h2>Course Not Found</h2>
          <Link to="/student" className="primary-btn">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  if (!isCompleted) {
    return (
      <main className="certificate-page">
        <div className="certificate-message">
          <h2>Certificate Not Available Yet</h2>
          <p>
            Complete all course modules to generate your certificate.
          </p>

          <Link
            to={`/courses/${course.id}`}
            className="primary-btn"
          >
            Continue Learning →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="certificate-page">
      <div className="certificate-actions">
        <Link to="/student" className="secondary-btn">
          ← Dashboard
        </Link>

        <button
          type="button"
          className="primary-btn"
          onClick={() => window.print()}
        >
          🖨 Print / Save as PDF
        </button>
      </div>

      <section className="certificate">
        <div className="certificate-border">
          <div className="certificate-content">
            <div className="certificate-brand">
              ⚡ TechLearn
            </div>

            <p className="certificate-label">
              CERTIFICATE OF COMPLETION
            </p>

            <h1>Certificate</h1>

            <p className="certificate-intro">
              This certificate is proudly presented to
            </p>

            <h2 className="certificate-student-name">
              {user?.name || "TechLearn Student"}
            </h2>

            <p className="certificate-description">
              for successfully completing the course
            </p>

            <h2 className="certificate-course-name">
              {course.title}
            </h2>

            <p className="certificate-description">
              demonstrating dedication, commitment, and successful
              completion of all course modules.
            </p>

            <div className="certificate-details">
              <div>
                <strong>{completionDate}</strong>
                <span>Completion Date</span>
              </div>

              <div>
                <strong>Vaibhavi Chavan</strong>
                <span>Course Instructor</span>
              </div>
            </div>

            <div className="certificate-footer">
              <span>TECHLEARN</span>
              <span>Learn. Build. Grow.</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Certificate;