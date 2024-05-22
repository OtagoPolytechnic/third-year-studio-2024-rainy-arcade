import "./App.scss";

const Item = (item) => {
  // console.log(item)
  const className = "";
  return (
    <div className={"game-item"}>
      {/* Game Title taken from folder name */}
      {item.item.game} 
      {/* Game image taken from folder to go here */}
    </div>
  );
};

export default Item