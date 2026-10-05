
import { Link, useParams } from "react-router-dom";
import { resources } from "../data";

function StudyMaterialPage() {
  const { type } = useParams();

  const resource = resources.find((item) => item.id === type);

  if (!resource) {
    return (
      <main className="page-container">
        <div className="empty-state">
          <h1>Material Not Found</h1>

          <p>
            The study material section you are looking for does not exist.
          </p>

          <Link to="/" className="primary-btn">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const handleOpen = (item) => {
    if (item.action === "coming-soon") {
      alert(`${item.title} will be available soon.`);
      return;
    }

    alert(`Opening ${item.title}...`);
  };

  return (
    <main className="page-container">
      {/* =========================================
          PAGE HEADER
      ========================================= */}
      <section className="page-header">
        <span className="page-badge">
          {resource.category}
        </span>

        <h1>{resource.title}</h1>

        <p>{resource.description}</p>
      </section>

      {/* =========================================
          RESOURCE LIST
      ========================================= */}
      <section className="material-list">
        {resource.items.map((item) => (
          <article
            className="material-card"
            key={item.title}
          >
            {/* Resource Icon */}
            <div className="material-icon">
              {resource.icon}
            </div>

            {/* Resource Information */}
            <div className="material-content">
              <span className="material-type">
                {item.type}
              </span>

              <h2>{item.title}</h2>

              <p>
                {item.subject} study material for
                concept learning, revision and exam
                preparation.
              </p>
            </div>

            {/* Action */}
            <button
              type="button"
              className="secondary-btn"
              onClick={() => handleOpen(item)}
            >
              Open →
            </button>
          </article>
        ))}
      </section>

      {/* =========================================
          BACK TO HOME
      ========================================= */}
      <section className="material-footer">
        <Link
          to="/"
          className="secondary-btn"
        >
          ← Back to TechLearn
        </Link>
      </section>
    </main>
  );
}

export default StudyMaterialPage;