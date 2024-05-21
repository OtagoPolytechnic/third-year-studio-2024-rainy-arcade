import "../styles/Game.css"
const Game = (props) => {

    return (
        <div className="game-container">
            <h1>{props.name}</h1>
        </div>
    )
}

export default Game