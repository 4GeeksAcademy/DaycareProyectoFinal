import React, { useState } from "react";
import "../../styles/Contactus.css";

const Contactus = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone_number: "",
    message: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Maneja el cambio de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica si los campos obligatorios están completos
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("https://ominous-system-g459qwwpqqj9hvjp-3001.app.github.dev/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to submit contact.");
        setSuccess(false);
      } else {
        const data = await response.json();
        setSuccess(true);
        setError(null);
        setFormData({
          name: "",
          email: "",
          subject: "",
          phone_number: "",
          message: "",
        });
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
      setSuccess(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#ffffff", padding: "100px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
      <div className="container contact-section">
        <div className="stars">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
        </div>

        <h5 className="text-uppercase text-warning">Get in Touch</h5>
        <h2 className="contact-title">Needs Help? Let’s Get in Touch</h2>

        {/* Formulario */}
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
          </div>
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
            />
          </div>
          <div className="mt-3">
            <textarea
              className="form-control"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Message"
            ></textarea>
          </div>

          {/* Mostrar mensaje de éxito o error */}
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Your message has been sent successfully!</div>}

          {/* Botón de envío */}
          <div className="mt-4">
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
