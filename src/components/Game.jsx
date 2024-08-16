import "../styles/Game.css";
import Star from "./Star.jsx";

export default function Game(props) {
  let title = props.title;
  let hours = props.hours;
  let image = props.image;
  let fullTime = props.fullTime;

  let progress = Math.min(Math.max((hours / fullTime * 100), 0), 100);

  return (
      <section className="game">
          <h1>
              {title}
          </h1>
          <p>{hours}h played, {(progress.toFixed(0))}%</p>
          <progress max={fullTime} value={hours}></progress>
          <img src={image} alt={title}/>
          <div id="stars">
              <Star rate={props.rate}/>
          </div>
      </section>
  );
}
