import axios from "axios"
import { useEffect, useState } from "react"
const Ageform = ({setGames, setPath}) => {
    const [age, setAge] = useState("")
    const getGames = async () => {
        try {
            const response = await axios.get("http://localhost:3001/getGames", { params: { age: age }});
            console.log(response)
            setGames(() => response.data.games)
            setPath(() => response.data.path)
          } catch (error) {
            
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        getGames()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Age:
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} name="age"/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default Ageform