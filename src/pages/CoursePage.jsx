import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courses } from "../data";
import "./CoursePage.css";

const LECTURE_STORAGE_KEY = "techlearnLectures";

function CoursePage() {
  const { courseId } = useParams();

  const course = courses.find(
    (item) => item.id === courseId
  );

  const [completedModules, setCompletedModules] =
    useState([]);

  const [lectures, setLectures] = useState([]);

  /* =========================================
     LOAD STUDENT PROGRESS
  ========================================= */

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("techlearnProgress") ||
        "{}"
    );

    setCompletedModules(
      savedProgress[courseId] || []
    );
  }, [courseId]);

  /* =========================================
     LOAD LECTURES CREATED BY INSTRUCTOR
  ========================================= */

  useEffect(() => {
    const savedLectures = JSON.parse(
      localStorage.getItem(
        LECTURE_STORAGE_KEY
      ) || "[]"
    );

    const courseLectures = savedLectures.filter(
      (lecture) =>
        lecture.courseId === courseId
    );

    setLectures(courseLectures);
  }, [courseId]);

  /* =========================================
     TOGGLE MODULE COMPLETION
  ========================================= */

  const toggleModule = (moduleIndex) => {
    const savedProgress = JSON.parse(
      localStorage.getItem("techlearnProgress") ||
        "{}"
    );

    const currentCompleted =
      savedProgress[courseId] || [];

    const updatedCompleted =
      currentCompleted.includes(moduleIndex)
        ? currentCompleted.filter(
            (index) => index !== moduleIndex
          )
        : [
            ...currentCompleted,
            moduleIndex,
          ];

    const updatedProgress = {
      ...savedProgress,
      [courseId]: updatedCompleted,
    };

    localStorage.setItem(
      "techlearnProgress",
      JSON.stringify(updatedProgress)
    );

    setCompletedModules(
      updatedCompleted
    );
  };

  /* =========================================
     COURSE NOT FOUND
  ========================================= */

  if (!course) {
    return (
      <main className="page-container">
        <div className="empty-state">

          <h1>
            Course Not Found
          </h1>

          <p>
            The course you're looking for
            doesn't exist.
          </p>

          <Link
            to="/"
            className="primary-btn"
          >
            Back to Home
          </Link>

        </div>
      </main>
    );
  }

  /* =========================================
     PROGRESS
  ========================================= */

  const progress = course.modules.length
    ? Math.round(
        (completedModules.length /
          course.modules.length) *
          100
      )
    : 0;

  /* =========================================
     FIND LECTURE FOR MODULE
  ========================================= */

  const getLectureForModule = (
    moduleIndex
  ) => {
    return lectures.find(
      (lecture) =>
        Number(lecture.moduleIndex) ===
        moduleIndex
    );
  };

  return (
    <main className="page-container">

      {/* =====================================
          COURSE HERO
      ===================================== */}

      <section className="course-detail-hero">

        <div>

          <span className="page-badge">
            {course.category}
          </span>

          <h1>
            {course.title}
          </h1>

          <p>
            {course.longDescription}
          </p>

          <div className="course-meta">

            <span>
              📊 {course.level}
            </span>

            <span>
              ⏱ {course.duration}
            </span>

            <span>
              🎓 {course.branches}
            </span>

          </div>

          <div className="course-price">

            <strong>
              ₹
              {course.price.toLocaleString(
                "en-IN"
              )}
            </strong>

            <del>
              ₹
              {course.originalPrice.toLocaleString(
                "en-IN"
              )}
            </del>

          </div>

          <Link
            to={`/checkout/${course.id}`}
            className="primary-btn"
          >
            Enroll Now →
          </Link>

        </div>

      </section>

      {/* =====================================
          COURSE CONTENT
      ===================================== */}

      <section className="detail-section">

        <div className="section-heading">

          <span>
            COURSE CONTENT
          </span>

          <h2>
            Learn Through Live & Recorded Lectures
          </h2>

          <p>
            {completedModules.length} of{" "}
            {course.modules.length} modules
            completed
          </p>

        </div>

        {/* =====================================
            PROGRESS
        ===================================== */}

        <div className="module-progress">

          <div className="module-progress-track">

            <div
              className="module-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <strong>
            {progress}% completed
          </strong>

        </div>

        {/* =====================================
            MODULES
        ===================================== */}

        <div className="module-grid">

          {course.modules.map(
            (module, index) => {

              const isCompleted =
                completedModules.includes(
                  index
                );

              const lecture =
                getLectureForModule(index);

              return (
                <div
                  className={`module-card ${
                    isCompleted
                      ? "module-completed"
                      : ""
                  }`}
                  key={`${course.id}-${index}`}
                >

                  {/* MODULE NUMBER */}

                  <span className="module-number">
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  {/* MODULE TITLE */}

                  <h3>
                    {module}
                  </h3>

                  <p>
                    Learn this topic through
                    instructor-led explanations,
                    practical examples and
                    learning exercises.
                  </p>

                  {/* =================================
                      LECTURE
                  ================================= */}

                  {lecture ? (

                    <div className="lecture-box">

                      <div className="lecture-header">

                        <span className="lecture-icon">
                          🎥
                        </span>

                        <div>

                          <strong>
                            {lecture.title}
                          </strong>

                          <small>
                            📅{" "}
                            {lecture.date}
                            {" • "}
                            ⏰{" "}
                            {lecture.time}
                          </small>

                        </div>

                      </div>

                      <div className="lecture-actions">

                        {/* LIVE CLASS */}

                        {lecture.liveUrl &&
                        lecture.liveUrl !==
                          "#" ? (

                          <a
                            href={
                              lecture.liveUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="live-btn"
                          >
                            🔴 Join Live Class
                          </a>

                        ) : (

                          <button
                            type="button"
                            className="live-btn disabled"
                            disabled
                          >
                            🔴 Live Class
                            Coming Soon
                          </button>

                        )}

                        {/* RECORDING */}

                        {lecture.recordingUrl &&
                        lecture.recordingUrl !==
                          "#" ? (

                          <a
                            href={
                              lecture.recordingUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="recording-btn"
                          >
                            ▶ Watch Recording
                          </a>

                        ) : (

                          <button
                            type="button"
                            className="recording-btn disabled"
                            disabled
                          >
                            ▶ Recording
                            Coming Soon
                          </button>

                        )}

                      </div>

                    </div>

                  ) : (

                    <div className="lecture-box lecture-coming-soon">

                      <span className="lecture-icon">
                        🎥
                      </span>

                      <div>

                        <strong>
                          Lecture Coming Soon
                        </strong>

                        <small>
                          The instructor has
                          not scheduled a
                          lecture for this
                          module yet.
                        </small>

                      </div>

                    </div>

                  )}

                  {/* =================================
                      COMPLETE MODULE
                  ================================= */}

                  <button
                    type="button"
                    className={
                      isCompleted
                        ? "module-complete-btn completed"
                        : "module-complete-btn"
                    }
                    onClick={() =>
                      toggleModule(index)
                    }
                  >
                    {isCompleted
                      ? "✓ Completed"
                      : "Mark as Completed"}
                  </button>

                </div>
              );
            }
          )}

        </div>

      </section>

      {/* =====================================
          INSTRUCTOR
      ===================================== */}

      <section className="detail-section instructor-box">

        <div>

          <span className="page-badge">
            INSTRUCTOR
          </span>

          <h2>
            Vaibhavi Chavan
          </h2>

          <p>
            Learn through practical
            explanations, live lectures,
            recorded classes,
            exam-oriented concepts,
            coding examples and
            project-based learning.
          </p>

        </div>

      </section>

    </main>
  );
}

export default CoursePage;