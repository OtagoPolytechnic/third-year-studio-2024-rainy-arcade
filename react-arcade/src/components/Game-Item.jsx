const Item = ({ id, level }) => {
    const className = `item level${level}`;
    return (
      <div className={className}>
        {id}
      </div>
    );
  };

  export default Item