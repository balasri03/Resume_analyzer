import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import pdfParse from 'pdf-parse';
dotenv.config();
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
//storing uploaded resumes in uploads folder
const storage= multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload= multer({ storage: storage })
// routes
app.post('/api/score',upload.single('resume'), async (req, res) => {
    const JobDescription=req.body.jobDescription
    const filePath=req.file.path
    try{
        // Read the PDF file
        const dataBuffer = fs.readFileSync(filePath)
        const data = await pdfParse(dataBuffer)
        const textData=data.text
        // Here you would implement your logic to analyze the resume and job description
        //send it to NLP service
        const response=await axios.post("http://127.0.0.1:5000/analyze",{
            resume: textData,
            jobDescription: JobDescription
        })
        console.log(response.data.score)
        console.log(response.data.feedback)
        //return NLP response to frontend
        res.json({
            score:response.data.score,
            unmatched_keywords: response.data.unmatched_keywords
        })
         fs.unlinkSync(filePath); // delete the file after use
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error processing the resume' });
        }

})
export { app };
