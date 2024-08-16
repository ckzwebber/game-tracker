import "../styles/Game.css";

export default function Game(props) {
  let title = props.title;
  let hours = props.hours;
  let image = props.image;

  return (
    <section className="game">
      <h1>
        {title} - {hours}h
      </h1>
      <img src={image} alt={title} />
    </section>
  );
}
