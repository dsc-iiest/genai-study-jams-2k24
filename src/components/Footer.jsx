// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="about-section">
          <img
            src="https://raw.githubusercontent.com/Asif-Tanvir-2006/genai-study-jams-2k24/main/src/assets/codeiiest-gdg.png"
            alt="codeiiest-gdg"
          />
          <div className="text-area">
            <h3>GenAI Study Jams</h3>
            <p>
              Explore GenAI through interactive Study Jams, gaining practical
              skills and industry insights to advance your AI career.
            </p>
          </div>
        </div>

        <div className="link-section">
          <div className="sub-section left">
            <h3>Quick Links</h3>
            <nav>
              <ul>
                <li>
                  <a
                    href="https://gdg.community.dev/gdg-on-campus-indian-institute-of-engineering-science-and-technology-shibpur-howrah-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GDG IIESTS
                  </a>
                </li>
                <li>
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li>
                  <Link to="/">Homepage</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="sub-section right">
            <h3>Maintainers</h3>
            <ul className="footer-links">
              <li><a href="https://iamakashtechie.vercel.app/">Akash Shaw</a></li>
              <li><a href="https://asiftanvir.pages.dev">Sk Asif Tanvir</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>GDG on Campus, IIEST Shibpur</p>
        <div className="socials">
          <a href="https://github.com/CodeIIEST-dev" aria-label="GitHub">󰊤</a>
          <a href="mailto:codeiiest.iiest@gmail.com" aria-label="Email">󰇮</a>
          <a href="https://twitter.com/codeiiest" aria-label="Twitter">𝕏</a>
          <a href="https://www.facebook.com/CodeIIEST" aria-label="Facebook">󰈌</a>
          <a href="https://www.youtube.com/codeiiest" aria-label="YouTube">󰗃</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
