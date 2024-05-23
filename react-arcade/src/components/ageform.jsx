import { getGames } from "../utils/Arcade-Backend-Functions"
const Ageform = ({setGames, setPath}) => { 
    return(
        <div className="ageCheck">
            <h2>Select Maximum Age Rating</h2>
            <button onClick={() => getGames(setGames, setPath, true)} className="ynButton">18+</button>
            <button onClick={() => getGames(setGames, setPath, false)} className="ynButton">Teen</button>
        </div>
    )
}

export default Ageform