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

router.get("/:id", async(req,res) => {
    const id = req.params.id

    try {
        const data = JSON.parse(await readFile(global.fileName))
        let user = id -1
        res.send(data.accounts[user])

    } catch (error) {
        res.status(400).send({ Error: error.message })
        
    }

})

router.delete("/:id", async(req, res) => {
    
    try {
        const data = JSON.parse(await readFile(global.fileName))
        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id))
        
        await writeFile(global.fileName, JSON.stringify(data, null, 2))

        res.end()
    } catch (error) {
        res.status(400).send({ Error: error.message })
        
    }
})



export default router;
