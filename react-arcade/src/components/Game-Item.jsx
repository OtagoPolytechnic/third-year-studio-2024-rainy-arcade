const Item = ({ id, level, selected }) => {
    const className = `item level${level}`;
    return (
      <div className={className}>
        {id.game}
      </div>
    );
  };

  export default Item