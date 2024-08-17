import Navbar from "./components/Navbar.jsx";
import Game from "./components/Game.jsx";
import "./styles/App.css";
import * as Img from "./Images.jsx";

function App() {

  const games = [
    { title: "Elden Ring", image: Img.Elden, hours: "34", fullTime: "60", rate: "5" },
    { title: "Red Dead Redemption 2", image: Img.Red, hours: "74", fullTime: "50", rate: "5" },
    { title: "God of War", image: Img.Gow, hours: "24", fullTime: "20", rate: "5" },
    { title: "Diablo IV", image: Img.Diablo, hours: "5", fullTime: "194", rate: "5" },
    { title: "Counter-Strike 2", image: Img.CS, hours: "1809", fullTime: "0", rate: "4" },
    { title: "Resident Evil 4 2023", image: Img.RE4, hours: "20", fullTime: "16", rate: "5" },
    { title: "League of Legends", image: Img.LoL, hours: "1447", fullTime: "0", rate: "1" },
    { title: "Terraria", image: Img.Terraria, hours: "37", fullTime: "103", rate: "5" },
    { title: "EAFC24", image: Img.EAFC24, hours: "56", fullTime: "0", rate: "2" },
    { title: "Hades", image: Img.Hades, hours: "28", fullTime: "23", rate: "5" },
    { title: "The Witcher 3", image: Img.TW3, hours: "36", fullTime: "51", rate: "3" },
    { title: "Stardew Valley", image: Img.Stardew, hours: "8", fullTime: "53", rate: "5" },
    { title: "PUBG", image: Img.PUBG, hours: "59", fullTime: "0", rate: "3" },
    { title: "R6", image: Img.R6, hours: "30", fullTime: "0", rate: "4" },
    { title: "Valheim", image: Img.Valheim, hours: "23", fullTime: "77", rate: "5" },
    { title: "Palworld", image: Img.Palworld, hours: "11", fullTime: "37", rate: "4" },
    { title: "DeadCells", image: Img.DeadCells, hours: "8", fullTime: "14", rate: "4" },
  ];

  return (
    <>
      <main>
        <Navbar />
        <section id="description">
          <p>
            Welcome, here you can view the games I played, with their
            respective ratings, number of hours and percentage of completion,
            enjoy! Percentages only tell the main story of the games.
          </p>
        </section>
        <section className="row">
          {games.map((game, i) => (
              <Game
                  key={i}
                  title={game.title}
                  image={game.image}
                  hours={game.hours}
                  fullTime={game.fullTime}
                  rate={game.rate}
              />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
