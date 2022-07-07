const express = require('express');
const Router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// 1. get all the notes --/fetchallnotes
Router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.send(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})


// 2. add new note  --/addnote
Router.post("/addnote", fetchuser, [
    body('title', "Enter valid title").isLength({ min: 3 }),
    body('description', "Enter valid description").isLength({ min: 5 }),], async (req, res) => {
        try {

            const { title, description, tag } = req.body;
            // if there are errors, return bad request and errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();
            res.json(saveNote);
            // console.log(req.body);
            // res.send('hiii');

        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
        }
    })

// 3. updating notes --/updatenote
Router.put("/updatenote/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create new note object
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})
// 4. Delete notes --/deletenote
Router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    // const { title, description, tag } = req.body;
    try {

        //find the note to update
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note Deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
})

module.exports = Router