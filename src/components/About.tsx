import React from "react";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <h4>Introduction</h4>
        <h2>About me</h2>

        <div className="about-content">
          {/* Placeholder for image */}
          <div className="about-image">{/* Image goes here */}</div>

          <div className="about-details">
            <p>
              I am an experienced Frontend Developer with over a decade of
              professional expertise in the field. Throughout my career, I have
              had the privilege of collaborating with prestigious organizations,
              contributing to their success and growth.
            </p>

            <div className="about-cards">
              <div className="card">
                {/* Icon placeholder */}
                <h5>Languages</h5>
                <p>
                  HTML, CSS, JavaScript
                  <br />
                  React Js, Next Js
                </p>
              </div>
              <div className="card">
                {/* Icon placeholder */}
                <h5>Education</h5>
                <p>
                  B.Tech in Computer
                  <br />
                  Science
                </p>
              </div>
              <div className="card">
                {/* Icon placeholder */}
                <h5>Projects</h5>
                <p>
                  Built more than 5<br />
                  projects
                </p>
              </div>
            </div>

            <div className="tools-used">
              <h4>Tools i use</h4>
              <div className="tool-icons">{/* Tool icons go here */}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
