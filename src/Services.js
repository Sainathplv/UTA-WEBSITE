import React from 'react';
import Header from './Header'; // Adjust path as necessary
import Footer from './Footer'; // Adjust path as necessary

import "./style.css";

function Services() {
  return (
    <div>
      <Header />
      
      <main>
        <div className="about-section">
            <div className="Background-image"></div>
            <div className="overlay-content">
                <h1>SERVICES</h1>
                <p>
                    There are lot many services provided by the department to serve students with wide variety and make
                    students feel comfortable in achieving the goals.Everything you need to make the most of your time
                    as a student (and beyond) is all on campus. Below are a few resources to get you started. 
                </p>
            </div>
        </div>
        <section className="services-content">
            <h2>Our Services</h2>
            <ol>
                <li>Advising and academic resources to ensure your success</li>
                <li>Tutoring</li>
                <li>Internship and job placement services</li>
                <li>On-campus housing and dining services</li>
                <li>Recreational sports and intramural activities</li>
                <li>Student organizations and leadership opportunities</li>
                <li>Cultural events, lectures, and concerts</li>
                <li>Health and wellness programs</li>
                <li>Accessibility and disability resources</li>
                <li>Transportation services and parking</li>
                <li>International programs and study abroad opportunities</li>
                <li>Career development and networking events</li>
                <li>Research opportunities and initiatives</li>
                <li>Libraries and study spaces</li>
            </ol>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default Services;
