import express, {json} from "express"
import { exec } from "child_process"
import cors from "cors"
import path from "path"

const app = express()

const PORT = 3001

app.use(json())
app.use(cors());

process.chdir("C:/Users/Rkoks/OneDrive/Desktop/third-year-studio-2024-rainy-arcade"); //Set the directory

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

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

export default app;