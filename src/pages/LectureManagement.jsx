import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data";
import "./LectureManagement.css";

const STORAGE_KEY = "techlearnLectures";

function LectureManagement() {
  const [lectures, setLectures] = useState([]);

  const [formData, setFormData] = useState({
    courseId: courses[0]?.id || "",
    moduleIndex: 0,
    title: "",
    date: "",
    time: "",
    liveUrl: "",
    recordingUrl: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  /* =========================================
     LOAD LECTURES
  ========================================= */

  useEffect(() => {
    const savedLectures = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    setLectures(savedLectures);
  }, []);

  /* =========================================
     SELECTED COURSE
  ========================================= */

  const selectedCourse = useMemo(() => {
    return courses.find(
      (course) => course.id === formData.courseId
    );
  }, [formData.courseId]);

  /* =========================================
     FORM HANDLING
  ========================================= */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;

    setFormData((previous) => ({
      ...previous,
      courseId,
      moduleIndex: 0,
    }));
  };

  /* =========================================
     SAVE LECTURES
  ========================================= */

  const saveLectures = (updatedLectures) => {
    setLectures(updatedLectures);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedLectures)
    );
  };

  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = () => {
    setFormData({
      courseId: courses[0]?.id || "",
      moduleIndex: 0,
      title: "",
      date: "",
      time: "",
      liveUrl: "",
      recordingUrl: "",
    });

    setEditingId(null);
  };

  /* =========================================
     CREATE / UPDATE LECTURE
  ========================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setMessage("Please enter a lecture title.");
      return;
    }

    if (!formData.date) {
      setMessage("Please select a lecture date.");
      return;
    }

    if (!formData.time) {
      setMessage("Please select a lecture time.");
      return;
    }

    const course = courses.find(
      (item) => item.id === formData.courseId
    );

    if (!course) {
      setMessage("Please select a valid course.");
      return;
    }

    const moduleIndex = Number(
      formData.moduleIndex
    );

    const lectureData = {
      id:
        editingId ||
        `lecture-${Date.now()}`,

      courseId: formData.courseId,

      moduleIndex,

      title: formData.title.trim(),

      date: formData.date,

      time: formData.time,

      liveUrl:
        formData.liveUrl.trim() || "#",

      recordingUrl:
        formData.recordingUrl.trim() || "#",

      courseTitle: course.title,

      moduleTitle:
        course.modules[moduleIndex],

      createdAt:
        editingId
          ? undefined
          : new Date().toISOString(),
    };

    let updatedLectures;

    if (editingId) {
      updatedLectures = lectures.map(
        (lecture) =>
          lecture.id === editingId
            ? {
                ...lecture,
                ...lectureData,
              }
            : lecture
      );

      setMessage(
        "Lecture updated successfully."
      );
    } else {
      updatedLectures = [
        ...lectures,
        lectureData,
      ];

      setMessage(
        "Lecture scheduled successfully."
      );
    }

    saveLectures(updatedLectures);
    resetForm();
  };

  /* =========================================
     EDIT LECTURE
  ========================================= */

  const handleEdit = (lecture) => {
    setEditingId(lecture.id);

    setFormData({
      courseId: lecture.courseId,

      moduleIndex:
        lecture.moduleIndex,

      title:
        lecture.title,

      date:
        lecture.date,

      time:
        lecture.time,

      liveUrl:
        lecture.liveUrl === "#"
          ? ""
          : lecture.liveUrl,

      recordingUrl:
        lecture.recordingUrl === "#"
          ? ""
          : lecture.recordingUrl,
    });

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================
     DELETE LECTURE
  ========================================= */

  const handleDelete = (lectureId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this lecture?"
    );

    if (!shouldDelete) {
      return;
    }

    const updatedLectures =
      lectures.filter(
        (lecture) =>
          lecture.id !== lectureId
      );

    saveLectures(updatedLectures);

    setMessage(
      "Lecture deleted successfully."
    );
  };

  /* =========================================
     SORT LECTURES
  ========================================= */

  const sortedLectures = [...lectures].sort(
    (a, b) => {
      const first = new Date(
        `${a.date}T${a.time}`
      );

      const second = new Date(
        `${b.date}T${b.time}`
      );

      return first - second;
    }
  );

  return (
    <main className="lecture-management-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <section className="lecture-management-header">

        <div>

          <span className="page-badge">
            INSTRUCTOR DASHBOARD
          </span>

          <h1>
            Lecture Management
          </h1>

          <p>
            Schedule live classes, add recordings
            and manage your course lectures.
          </p>

        </div>

        <Link
          to="/admin"
          className="back-admin-btn"
        >
          ← Admin Dashboard
        </Link>

      </section>

      {/* =====================================
          STATS
      ===================================== */}

      <section className="lecture-stats">

        <div className="lecture-stat-card">
          <span>🎥</span>

          <div>
            <strong>
              {lectures.length}
            </strong>

            <p>Total Lectures</p>
          </div>
        </div>

        <div className="lecture-stat-card">
          <span>📚</span>

          <div>
            <strong>
              {courses.length}
            </strong>

            <p>Courses</p>
          </div>
        </div>

        <div className="lecture-stat-card">
          <span>🔴</span>

          <div>
            <strong>
              {
                lectures.filter(
                  (lecture) =>
                    lecture.liveUrl &&
                    lecture.liveUrl !== "#"
                ).length
              }
            </strong>

            <p>Live Classes</p>
          </div>
        </div>

        <div className="lecture-stat-card">
          <span>▶</span>

          <div>
            <strong>
              {
                lectures.filter(
                  (lecture) =>
                    lecture.recordingUrl &&
                    lecture.recordingUrl !== "#"
                ).length
              }
            </strong>

            <p>Recordings</p>
          </div>
        </div>

      </section>

      {/* =====================================
          FORM
      ===================================== */}

      <section className="lecture-form-section">

        <div className="lecture-section-title">

          <span>
            {editingId
              ? "EDIT LECTURE"
              : "SCHEDULE LECTURE"}
          </span>

          <h2>
            {editingId
              ? "Update Lecture"
              : "Schedule New Lecture"}
          </h2>

        </div>

        <form
          className="lecture-form"
          onSubmit={handleSubmit}
        >

          {/* COURSE */}

          <div className="form-group">

            <label htmlFor="courseId">
              Course
            </label>

            <select
              id="courseId"
              name="courseId"
              value={formData.courseId}
              onChange={handleCourseChange}
            >
              {courses.map(
                (course) => (
                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {course.title}
                  </option>
                )
              )}
            </select>

          </div>

          {/* MODULE */}

          <div className="form-group">

            <label htmlFor="moduleIndex">
              Module
            </label>

            <select
              id="moduleIndex"
              name="moduleIndex"
              value={formData.moduleIndex}
              onChange={handleChange}
            >
              {selectedCourse?.modules.map(
                (module, index) => (
                  <option
                    key={index}
                    value={index}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}{" "}
                    — {module}
                  </option>
                )
              )}
            </select>

          </div>

          {/* TITLE */}

          <div className="form-group form-full">

            <label htmlFor="title">
              Lecture Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Introduction to Python - Live Lecture"
            />

          </div>

          {/* DATE */}

          <div className="form-group">

            <label htmlFor="date">
              Lecture Date
            </label>

            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>

          {/* TIME */}

          <div className="form-group">

            <label htmlFor="time">
              Lecture Time
            </label>

            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />

          </div>

          {/* LIVE URL */}

          <div className="form-group form-full">

            <label htmlFor="liveUrl">
              Live Class Link
            </label>

            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://your-live-class-link.com"
            />

            <small>
              Add your Zoom/live meeting URL here.
            </small>

          </div>

          {/* RECORDING URL */}

          <div className="form-group form-full">

            <label htmlFor="recordingUrl">
              Recording Link
            </label>

            <input
              id="recordingUrl"
              name="recordingUrl"
              type="url"
              value={
                formData.recordingUrl
              }
              onChange={handleChange}
              placeholder="https://your-recording-link.com"
            />

            <small>
              Add the recording after the lecture.
            </small>

          </div>

          {/* MESSAGE */}

          {message && (
            <div className="lecture-message">
              {message}
            </div>
          )}

          {/* ACTIONS */}

          <div className="lecture-form-actions">

            <button
              type="submit"
              className="save-lecture-btn"
            >
              {editingId
                ? "Update Lecture"
                : "Schedule Lecture"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-lecture-btn"
                onClick={() => {
                  resetForm();
                  setMessage("");
                }}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </section>

      {/* =====================================
          LECTURE LIST
      ===================================== */}

      <section className="lecture-list-section">

        <div className="lecture-section-title">

          <span>
            MANAGE LECTURES
          </span>

          <h2>
            Scheduled Lectures
          </h2>

        </div>

        {sortedLectures.length === 0 ? (

          <div className="empty-lectures">

            <div className="empty-lecture-icon">
              🎥
            </div>

            <h3>
              No lectures scheduled yet
            </h3>

            <p>
              Schedule your first lecture using
              the form above.
            </p>

          </div>

        ) : (

          <div className="lecture-list">

            {sortedLectures.map(
              (lecture) => (
                <article
                  className="managed-lecture-card"
                  key={lecture.id}
                >

                  <div className="managed-lecture-main">

                    <div className="managed-lecture-icon">
                      🎥
                    </div>

                    <div>

                      <span className="managed-course">
                        {lecture.courseTitle}
                      </span>

                      <h3>
                        {lecture.title}
                      </h3>

                      <p>
                        Module{" "}
                        {lecture.moduleIndex + 1}
                        {" — "}
                        {lecture.moduleTitle}
                      </p>

                    </div>

                  </div>

                  <div className="managed-lecture-details">

                    <span>
                      📅 {lecture.date}
                    </span>

                    <span>
                      ⏰ {lecture.time}
                    </span>

                    <span
                      className={
                        lecture.liveUrl !== "#"
                          ? "status-active"
                          : "status-pending"
                      }
                    >
                      {lecture.liveUrl !== "#"
                        ? "🔴 Live Link Added"
                        : "⚪ Live Link Pending"}
                    </span>

                    <span
                      className={
                        lecture.recordingUrl !== "#"
                          ? "status-active"
                          : "status-pending"
                      }
                    >
                      {lecture.recordingUrl !== "#"
                        ? "▶ Recording Added"
                        : "⚪ Recording Pending"}
                    </span>

                  </div>

                  <div className="managed-lecture-actions">

                    {lecture.liveUrl !== "#" && (
                      <a
                        href={lecture.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="view-lecture-btn"
                      >
                        Join Live
                      </a>
                    )}

                    {lecture.recordingUrl !== "#" && (
                      <a
                        href={
                          lecture.recordingUrl
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="view-lecture-btn"
                      >
                        Recording
                      </a>
                    )}

                    <button
                      type="button"
                      className="edit-lecture-btn"
                      onClick={() =>
                        handleEdit(lecture)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-lecture-btn"
                      onClick={() =>
                        handleDelete(
                          lecture.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </article>
              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}

export default LectureManagement;