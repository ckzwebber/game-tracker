import "../styles/Navbar.css";
import gitHub from "../assets/images/github-logo.png"
import linkedin from "../assets/images/linkedin.png"

export default function Navbar() {
  return (
    <nav>
      <h1>Carlos Miguel's Game Tracker</h1>
      <div id="socials">
          <a href="https://github.com/ckzwebber" target="_blank" rel="noopener noreferrer">
              <img className="social" src={gitHub} alt="GitHub logo"/>
          </a>
          <a href="https://www.linkedin.com/in/cmiguelwm/" target="_blank" rel="noopener noreferrer">
              <img className="social" src={linkedin} alt="Linkedin"/>
          </a>
      </div>
    </nav>
  );
}
