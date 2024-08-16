export default function Star({ rate }) {
    const stars = Array(5).fill(0).map((_, index) => (
        <span key={index} className="star">
      {index < rate ? '★' : '☆'}
    </span>
    ));

    return <>
        {stars}
    </>;
}