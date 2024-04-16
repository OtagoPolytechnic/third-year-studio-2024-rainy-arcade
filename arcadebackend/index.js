import express, {json} from "express"
import { exec } from "child_process"

const app = express()

const PORT = 3000

app.use(json())

app.post('/executeShortcut', (req, res) => {
    // Replace 'path_to_your_shortcut.lnk' with the path to your shortcut file
    const { path } = req.body

    const shortcutPath = `C:/Users/GGPC/Desktop/${path}`;

    // Execute the shortcut
    exec(shortcutPath, (error, stdout, stderr) => {
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