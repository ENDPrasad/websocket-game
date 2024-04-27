const Box = ({ data, onClickHandler, idx }) => {
  return (
    <div className="board-box" onClick={() => onClickHandler(idx)}>
      <p>{data !== "." ? data : ""}</p>
    </div>
  );
};

export default Box;
