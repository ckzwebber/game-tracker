import Navbar from "./components/Navbar.jsx";
import Game from "./components/Game.jsx";
import EldenRingImage from "./assets/images/gamesImages/elden.jpg";
import GodOfWarImage from "./assets/images/gamesImages/gow.jpg";
import "./styles/App.css";

function App() {
  return (
    <>
      <main>
        <Navbar />
        <section className="row">
          <Game title={"EldenRing"} image={EldenRingImage} hours={"35"} />
          <Game title={"God of War"} image={GodOfWarImage} hours={"28"} />
          <Game title={"title1"} image={"title1"} hours={"title1"} />
        </section>
      </main>
    </>
  );
}

export default App;
