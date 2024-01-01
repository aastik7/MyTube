import express from "express";
import ffmpeg from "fluent-ffmpeg";


const app = express();
app.use(express.json());


app.post("/process-video", (req, res) => {
    // get path of the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing file path");
    }

    ffmpeg(inputFilePath)
        .outputOptions('-vf', "scale=-1:360" ) //360
        .on("end", () => {
            return res.status(200).send("Video Processing started");
        })
        .on("error", (err) => {
            console.log(`An error occured: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        .save(outputFilePath); 
    
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`video processing service listening at http://localhost:${port}`);
    });