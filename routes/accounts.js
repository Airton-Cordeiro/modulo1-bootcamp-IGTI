import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

global.fileName = "accounts.json";

router.post("/", async (req, res) => {

    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));

        account = {id: data.nextId++, ...account}
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data));

        res.send(account);
    } catch (error) {
        res.status(400).send({ Error: error.message })
    }
})

router.get("/", async(req,res) => {
    try {
        const data = JSON.parse(await readFile(global.fileName))
        delete data.nextId
        res.send(data)
    } catch (error) {
        res.status(400).send({ Error: error.message })
        
    }
})



export default router;
