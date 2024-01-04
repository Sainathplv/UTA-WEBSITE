/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import "./style.css";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import video from "./Computer Science and Engineering.mp4"

const Homepage = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main">
        <div className="content">
          <section>
            <h1>DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING</h1>
            <div className="video-container">
              <video controls loop autoPlay muted playsInline>
                <source
                  src={video}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </section>
          <section className="Overview-section">
            <h2>Master's in Computer Science Overview</h2>
            <p>
              The Master's program in Computer Science at UT Arlington aims to
              provide students with an advanced understanding of computing
              principles, theories, and practical skills. Students engage in
              cutting-edge research, collaborate with faculty members who are
              experts in their fields, and delve deep into subjects ranging from
              artificial intelligence to data science. Our academic program is
              designed to provide students with the knowledge and skills they
              need to excel in their field. The objectives of the program are
              tailored to ensure comprehensive understanding and application of
              key concepts.Performance measurement and assessment are crucial in
              evaluating the effectiveness of our program.They ensure that our
              curriculum remains up-to-date and that our students are
              well-prepared for their future careers.
            </p>
          </section>
          <section className="Program-Objectives-section">
            <h2>Program Objectives (POs)</h2>
            <div className="split-container">
              <img src={image3} alt="Program Overview Image" />
              <div className="split-description">
                <ul className="star-list">
                  <li>
                    Advanced Knowledge: Equip students with advanced concepts in
                    computer science to prepare them for research, teaching, or
                    top-tier professional careers.
                  </li>
                  <li>
                    Research Skills: Foster abilities in identifying,
                    understanding, and solving complex computational problems.
                  </li>
                  <li>
                    Professional Development: Enhance communication, teamwork,
                    and leadership skills to prepare students for leadership
                    roles in technology.
                  </li>
                  <li>
                    Specialized Learning: Offer electives and research
                    opportunities in niche areas, allowing students to tailor
                    their learning experience according to their professional
                    goals and areas of interest.
                  </li>
                  <li>
                    Specialized Learning: Offer electives and research
                    opportunities in niche areas, allowing students to tailor
                    their learning experience according to their professional
                    goals and areas of interest.
                  </li>
                  <li>
                    Ethics and Social Responsibility: Educate students about the
                    social, ethical, and professional responsibilities
                    associated with the computing profession.
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="performance-section">
            <div className="performance-overlay"></div>
            <div className="overlayed-image">
              <img
                src={image2}
                alt="Performance Image"
                className="borderedImage"
              />
            </div>
            <div className="description">
              <h2>Performance Measurement and Assessment</h2>
              <ul>
                <li>
                  <h3>Improvement:</h3> Performance measurement ensures that
                  students are meeting the learning objectives set by the
                  program. By understanding areas of strength and weakness, the
                  department can make necessary changes to the curriculum or
                  instructional methods.
                </li>
                <li>
                  <h3>Accreditation and Standards:</h3> Many institutions rely
                  on regular performance assessment to maintain accreditation.
                  Meeting certain standards is essential for the program's
                  reputation and the value of the degree for graduates.
                </li>
                <li>
                  <h3>Confidence:</h3> Regular assessment builds confidence
                  among stakeholders, including students, faculty, potential
                  employers, and others, ensuring that the program produces
                  high-quality professionals.
                </li>

                <li>
                  <h3>Feedback for Students:</h3> Performance measurement offers
                  individualized feedback, allowing students to understand their
                  performance, areas of improvement, and how they compare to
                  their peers.
                </li>
                <li>
                  <h3>Allocation:</h3> Assessment results can inform
                  decision-makers where to allocate resources, be it in the form
                  of faculty recruitment, laboratory facilities, or technology
                  investments. In conclusion, the Master's program in Computer
                  Science at UT Arlington aims to deliver a high-quality
                  education tailored to the needs and aspirations of its
                  students. Regular performance measurement and assessment are
                  vital to ensuring that the program meets its objectives and
                  continues to evolve in response to the demands of the rapidly
                  changing field of computer science.
                </li>
              </ul>
            </div>
          </section>

          {/* ... (Rest of your content sections) ... */}

          <section className="courses-section">
            <h2>Courses</h2>
            <div className="courses-columns">
              <ul className="courses-list">
                <li>Advanced Algorithms and Data Structures</li>
                <li>Machine Learning and Data Mining</li>
                <li>Computer Networks</li>
                <li>Advanced Operating Systems</li>
                <li>Artificial Intelligence</li>
                <li>Distributed Systems</li>
                <li>High Performance Computing</li>
                <li>Database Management Systems</li>
                <li>Cloud Computing and Virtualization</li>
                <li>Computer Vision</li>
              </ul>
              <ul className="courses-list">
                <li>Natural Language Processing</li>
                <li>Cybersecurity and Cryptography</li>
                <li>Software Engineering</li>
                <li>Human-Computer Interaction</li>
                <li>Mobile App Development</li>
                <li>Parallel Computing</li>
                <li>Quantum Computing</li>
                <li>Bioinformatics</li>
                <li>Graphics and Game Design</li>
                <li>Embedded Systems</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
