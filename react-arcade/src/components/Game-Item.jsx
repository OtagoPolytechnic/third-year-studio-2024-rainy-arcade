import "./App.scss";

const Item = (item) => {
  // console.log(item)
  const className = "";
  return (
    <div className={"game-item"}>
      {item.item.game}
    </div>
  );
};

export default Item