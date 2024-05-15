import { getGames } from "../utils/Arcade-Backend-Functions"
const Ageform = ({setGames, setPath}) => { 
    return(
        <div className="ageCheck">
            <h2>Over 18</h2>
            <button onClick={() => getGames(setGames, setPath, true)}>Yes</button>
            <button onClick={() => getGames(setGames, setPath, false)}>No</button>
        </div>
    )
}

export default Ageform