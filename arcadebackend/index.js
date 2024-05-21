import express, {json} from "express"
import { exec } from "child_process"
import cors from "cors"
import path from "path"
import fs from "fs"
import dotenv from "dotenv";
const app = express();
dotenv.config();

const PORT = process.env.PORT
//repo directory e.g "D:/third-year-studio-2024-rainy-arcade" 
const DIRECTORY = process.env.REPO_DIRECTORY
let isRunning = false
app.use(json())
app.use(cors());

process.chdir(DIRECTORY);

app.post('/executeShortcut', (req, res) => {
    if (isRunning) {
        res.status(500).send('Shortcut already running');
        return;
    }
    isRunning = true;
    const { path: relativePath } = req.body;

    const absolutePath = path.join(process.cwd(), relativePath);

    exec(`start "" "${absolutePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing shortcut: ${error}`);
            res.status(500).send('Error executing shortcut');
            isRunning = false;
            return;
        }

        if (stderr) {
            console.error(`Error output from shortcut: ${stderr}`);
            res.status(500).send('Error executing shortcut');
            isRunning = false;
            return;
        }

        console.log(`Output from shortcut: ${stdout}`);
        isRunning = false;
        res.status(200).send('Shortcut executed successfully');
    });
});


app.get("/getGames", (req, res) => {
    try {
        const age = req.query.age;
        const games = []
        let exepath = ""
        let path = "./move"
        let items = []
        const ratings = [{rating:"E", age:0}, {rating:"E10+", age:10}, {rating:"T", age:13}, {rating:"M", age:17}, {rating:"AO", age:18}]
        
        ratings.forEach(rating => {

            if (age >= rating.age){
                path = `./move/${rating.rating}`
                let gamesDir = fs.readdirSync(path)

                if (gamesDir !== null){

                    gamesDir.forEach(game => {
                        path = `./move/${rating.rating}/${game}`
                        const newItem = fs.readdirSync(path)

                        newItem.forEach(content => {

                            if (!content.includes(".")){ 
                                const folderContents = fs.readdirSync(`${path}/${content}`)
                                folderContents.forEach(gamescontent => {

                                    if (gamescontent.includes(".exe") && !content.includes("UnityCrashHandler32.exe")) {
                                        exepath = `${rating.rating}/${game}/${content}`
                                    }
                                })
                            } 
                        })
                        games.push({game: game, folderContents: newItem, exepath: exepath})
                    })
                }
            }
        })

        res.status(200).json({path : "./move", games: games})
    } catch (error) {
        res.status(404).json({error: error})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

export default app;