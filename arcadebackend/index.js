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

app.use(json())
app.use(cors());

process.chdir(DIRECTORY);

app.post('/executeShortcut', (req, res) => {
    const { path: relativePath } = req.body

    const absolutePath = path.join(process.cwd(), relativePath);

    exec(`"${absolutePath}"`, (error, stdout, stderr) => {
        if (error) {
        console.error(`Error executing shortcut: ${error}`);
        res.status(500).send('Error executing shortcut');
        return;
        }

        if (stderr) {
        console.error(`Error output from shortcut: ${stderr}`);
        res.status(500).send('Error executing shortcut');
        return;
        }

        console.log(`Output from shortcut: ${stdout}`);
        res.status(200).send('Shortcut executed successfully');
    });
});

app.get("/getGames", (req, res) => {
    try {
        const over18 = req.query.over18;
        const games = []
        let exepath = ""
        
        const items = fs.readdirSync("./react-arcade/assets/games/young")
        items.forEach(item => {
            const newItem = fs.readdirSync(`./react-arcade/assets/games/young/${item}`)
            newItem.forEach(content => {
                if (content.includes(".exe") && !content.includes("UnityCrashHandler32.exe")) {
                    exepath = `young/${item}/${content}`
                }
            })
            games.push({game: item, folderContents: newItem, exepath: exepath})
        });
        
        if (over18 == "true") {
            console.log(over18)
            const items = fs.readdirSync("./react-arcade/assets/games/old")
            items.forEach(item => {
                const newItem = fs.readdirSync(`./react-arcade/assets/games/old/${item}`)
                newItem.forEach(content => {
                    if (content.includes(".exe") && !content.includes("UnityCrashHandler32.exe")) {
                        exepath = `old/${item}/${content}`
                    }
                })
                games.push({game: item, folderContents: newItem, exepath: exepath})
            });
        }
        res.status(200).json({path : "./react-arcade/assets/games", games: games})
    } catch (error) {
        res.status(404).json({error: error})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

export default app;