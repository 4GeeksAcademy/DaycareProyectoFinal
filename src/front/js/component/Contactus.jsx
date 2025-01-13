import React from "react";


const Contactus = () => {
    return (
        <div className="container contact-section">
          <div className="stars">
            <img src="https://via.placeholder.com/30" alt="Star" />
            <img src="https://via.placeholder.com/30" alt="Star" />
            <img src="https://via.placeholder.com/30" alt="Star" />
          </div>
    
          <h5 className="text-uppercase text-warning">Get in Touch</h5>
          <h2 className="contact-title">Needs Help? Let’s Get in Touch</h2>
    
          <form className="mt-4">
            <div className="row g-3">
              <div className="col-md-6">
                <input type="text" className="form-control" placeholder="Your name" />
              </div>
              <div className="col-md-6">
                <input type="email" className="form-control" placeholder="Your email" />
              </div>
            </div>
            <div className="mt-3">
              <input type="text" className="form-control" placeholder="Subject" />
            </div>
            <div className="mt-3">
              <textarea className="form-control" rows="5" placeholder="Message"></textarea>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-submit">Submit</button>
            </div>
          </form>
    
          <div className="bottom-stars">
            <img src="https://via.placeholder.com/30" alt="Star" />
            <img src="https://via.placeholder.com/30" alt="Star" />
            <img src="https://via.placeholder.com/30" alt="Star" />
          </div>
        </div>
      );
    };

export default Contactus;