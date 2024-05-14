import axios from "axios"

export const getGames = async (setGames, setPath, over18) => {
    try {
        const response = await axios.get("http://localhost:3001/getGames", { params: { over18: over18 }});

        setGames(() => response.data.games)
        setPath(() => response.data.path)
        console.log(response)
      } catch (error) {
        
    }
}
