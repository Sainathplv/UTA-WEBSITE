/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./style.css";

import floatImg from "./floatimg.jpeg"; // Make sure to update the path accordingly

const About = () => {
  return (
    <div>
      <Header />

      <main>
        <div className="about-section">
          <div className="Background-image"></div>
          <div className="overlay-content">
            <h1>ABOUT MASTER'S COMPUTER SCIENCE AND ENGINEERING</h1>
            <p>
              Computer Science is one of the top majors at The University of
              Texas at Arlington, which is a Carnegie Research 1 institution
              with more than 100 years of academic excellence and tradition.
            </p>
          </div>
        </div>
        <section className="about-content">
          <h2>ABOUT COLLEGE</h2>
          <p>
            The second largest university in The University of Texas System, UTA
            is located in the heart of Dallas-Fort Worth, challenging our
            students to engage with the world around them in ways that make a
            measurable impact.
          </p>
          <p>
            UTA offers state-of-the-art facilities that encourage students to be
            critical thinkers. Through academic, internship, and research
            programs, our students receive real-world experiences that help them
            contribute to their community and, ultimately, the world.
          </p>
          <p>
            We have more than 180 baccalaureate, master's, and doctoral degree
            programs, and more than 41,000 students walking our campus or
            engaging in online coursework each year.
          </p>
        </section>
        <section>
          <div className="float-container">
            <div className="float-description">
              <h2>ABOUT PROGRAMS:</h2>
              <p>
                The Computer Science and Engineering Department offers
                undergraduate and graduate degrees in computer engineering,
                computer science and software engineering, as well as several
                graduate certificate programs.
              </p>
              <p>
                We are leaders in areas such as big data and large-scale
                computing; biocomputing and health informatics; networks;
                computer vision and multimedia; database and information
                systems; embedded systems and mobile computing; machine learning
                and data mining; robotics and artificial intelligence; security
                and privacy; software engineering; and sustainable computing.
              </p>
              <p>
                You will develop the skills and knowledge to gain an intricate
                understanding of what it takes to have a successful career in
                these areas and more. Through in-class learning and hands-on
                experiences, you will be ready to take on the challenges of
                today and the future.
              </p>
              <p>
                Students may work alongside faculty on funded research, doing
                real lab work and gaining valuable skills. Qualified students
                may use federal work-study funds to participate in such
                research, and the College of Engineering sponsors more than 40
                undergraduate research projects each year.
              </p>
              <p>
                Finally, all undergraduate students complete a capstone course
                prior to graduation, finding solutions to real-world problems,
                often with financial support from an industry partner.
              </p>
              {/* ... rest of the float-description section ... */}
            </div>
            <div className="image-float-container">
              <img src={floatImg} alt="Description Image" />
            </div>
          </div>
        </section>
        <section className="expected">
        <h2>Educational Objectives and Expected Learning Outcomes</h2>
            <p>
                Program educational objectives of the Computer Science Program are what the program expects its
                graduates to attain within three to five years after graduation. Graduates of the UTA Computer Science
                Program will:
            <ol>
                <li>Be technically competent and commence a computing career or advanced studies.</li>
                <li>In the profession, especially in responsibility for the design of computer-based systems.</li>
                <li>Demonstrate leadership for a changing profession and world.</li>
                <li>
                    Pursue productive careers in industry and organizations that focus on the design and integration of
                    software and
                    hardware in computing systems; or excel as graduate students and become effective researchers.</li>
                <li>Participate effectively in interdisciplinary engineering projects, adapt to changing technologies,
                    and communicate
                    effectively to become leaders in their profession.</li>
                <li>Engage in life-long learning, recognize social needs and constraints, and demonstrate high
                    appreciation of legal,
                    ethical, economic, environmental and social responsibilities.
                </li>
            </ol>
            </p>
            <h2>Student Learning Outcomes</h2>
            <p>
                The department designed the programs to meet the following Program Outcomes, to ensure that its
                graduates are able to:
            <ul className="star-list">
                <li>Analyze a complex computing problem and to apply principles of computing and other relevant
                    disciplines
                    to identify solutions.</li>
                <li>Design, implement, and evaluate a computing-based solution to meet a given set of computing
                    requirements
                    in the context of the program's discipline.</li>
                <li>
                    Recognize professional responsibilities and make informed judgments in computing practice based on
                    legal
                    and ethical principles.
                </li>
                <li>Communicate effectively in a variety of professional contexts.
                    Recognize professional responsibilities and make informed judgments in computing practice based on
                    legal
                    and ethical principles.</li>
                <li>Function effectively as a member or leader of a team engaged in activities appropriate to the
                    program's
                    discipline.</li>
                <li>Apply computer science theory and software development fundamentals to produce computing-based
                    solutions</li>
            </ul>
            </p>
          {/* ... rest of the expected section ... */}
        </section>
        <section className="gridA">
        <h1>Computer Science and Engineering at UTA</h1>
            <div className="info-section">
                <div className="data-box">
                    <span className="data-number">1</span>
                    <span className="data-label">TIER status</span>
                </div>
        
                <div className="data-box">
                    <span className="data-number">3079 Master's</span>
                    <span className="data-label">Students Distribution in 2022</span>
                </div>
        
                <div className="data-box">
                    <span className="data-number">$8.9 M</span>
                    <span className="data-label">Research Expenditures in 2022</span>
                </div>
        
                <div className="data-box">
                    <span className="data-number">HSI</span>
                    <span className="data-label">Hispanic-Serving Institution Designation</span>
                </div>
        
                <div className="data-box">
                    <span className="data-number">#5</span>
                    <span className="data-label">In the Nation for Master's Graduate Diversity</span>
                </div>
        
                <div className="data-box">
                    <span className="data-number">R-1</span>
                    <span className="data-label">Doctoral University - Very High Research Activity</span>
                </div>
        
                <div className="data-box full-row">
                    <span className="data-number">#4</span>
                    <span className="data-label">In the Nation for Veterans and Their Families</span>
                </div>
            </div>
          {/* ... rest of the gridA section ... */}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
