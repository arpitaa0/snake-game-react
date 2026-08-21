function Snake({ snake }) {
  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake"
          style={{
            left: `${segment.x}px`,
            top: `${segment.y}px`,
          }}
        ></div>
      ))}
    </>
  );
}

export default Snake;