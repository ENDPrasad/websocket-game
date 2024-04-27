import Box from "./Box";

const Board = ({ boardData, onClickHandler }) => {
  return (
    <section className="game-section">
      <div className="game-box">
        {boardData.split("").map((item, idx) => (
          <Box
            data={item}
            key={idx}
            idx={idx}
            onClickHandler={onClickHandler}
          />
        ))}
      </div>
    </section>
  );
};

export default Board;
