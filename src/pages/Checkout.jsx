import { Link, useNavigate, useParams } from "react-router-dom";
import { courses } from "../data";
import { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find(
    (item) => item.id === courseId
  );

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);

  if (!course) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <h1>Course Not Found</h1>

          <p>
            The course you are trying to purchase could
            not be found.
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

  const handlePayment = (e) => {
    e.preventDefault();

    const loggedIn =
      localStorage.getItem("techlearnLoggedIn");

    if (loggedIn !== "true") {
      alert("Please login before enrolling in a course.");
      navigate("/login");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const existingCourses =
        JSON.parse(
          localStorage.getItem("techlearnCourses")
        ) || [];

      if (!existingCourses.includes(course.id)) {
        existingCourses.push(course.id);
      }

      localStorage.setItem(
        "techlearnCourses",
        JSON.stringify(existingCourses)
      );

      setProcessing(false);

      alert(
        "Demo payment successful! Course enrolled."
      );

      navigate("/student");
    }, 1500);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        {/* LEFT */}
        <div className="checkout-left">
          <span className="page-badge">
            CHECKOUT
          </span>

          <h1>
            Complete Your Enrollment
          </h1>

          <p className="checkout-intro">
            You're one step away from starting your
            learning journey.
          </p>

          <div className="checkout-course">
            <div className="checkout-course-icon">
              {course.icon}
            </div>

            <div>
              <h2>{course.title}</h2>

              <p>{course.description}</p>

              <div className="checkout-course-meta">
                <span>
                  ⏱ {course.duration}
                </span>

                <span>
                  📊 {course.level}
                </span>
              </div>
            </div>
          </div>

          <div className="secure-note">
            🔒 Your payment information is securely
            processed.
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Course</span>
            <strong>{course.title}</strong>
          </div>

          <div className="summary-row">
            <span>Price</span>

            <strong>
              ₹{course.price.toLocaleString("en-IN")}
            </strong>
          </div>

          <div className="summary-line"></div>

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ₹{course.price.toLocaleString("en-IN")}
            </strong>
          </div>

          <form onSubmit={handlePayment}>
            <h3>Payment Method</h3>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={
                  paymentMethod === "upi"
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <span>
                <strong>UPI</strong>
                <small>
                  Google Pay, PhonePe, Paytm
                </small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={
                  paymentMethod === "card"
                }
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              <span>
                <strong>Card</strong>
                <small>
                  Credit / Debit Card
                </small>
              </span>
            </label>

            <button
              type="submit"
              className="primary-btn payment-btn"
              disabled={processing}
            >
              {processing
                ? "Processing..."
                : `Pay ₹${course.price.toLocaleString(
                    "en-IN"
                  )}`}
            </button>
          </form>

          <p className="demo-payment">
            Demo payment mode — real payment gateway
            will be connected later.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Checkout;