import axios from "axios"

export const getGames = async (setGames, setPath, age) => {
    try {
        const response = await axios.get("http://localhost:3001/getGames", { params: { age: age }});

        setGames(() => response.data.games)
        setPath(() => response.data.path)

        console.log(response)
      } catch (error) {
        console.log(error)
    }
}

export const launchGame = async (path) => {
  try {
    await axios.post("http://localhost:3001/executeShortcut", {
      path: path,
    });
  } catch (error) {
    console.log(error)
  }
}