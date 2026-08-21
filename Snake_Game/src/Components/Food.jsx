function Food({ food }) {
  return (
    <div
      className="food"
      style={{
        left: `${food.x}px`,
        top: `${food.y}px`,
      }}
    ></div>
  );
}

export default Food;