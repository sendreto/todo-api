const express = require('express')
const User = require('../models/users')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(req.body)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
         res.status(500).send()
    }
 })
 
 router.get('/users/:id', async (req, res) => {
     const _id = req.params.id
 
     try {
         const user = await User.findById(_id)
         
         if(!user){
             return res.status(404).send()
         }
         res.send(user)
     } catch (error) {
         res.status(500).send()
     }
 })
 
 router.patch('/users/:id', async (req, res) =>{
     const updates = Object.keys(req.body)
     const allowedUpdate = ["name", "email", "password", "age"]
     const isValidOperation = updates.every((update) => allowedUpdate.includes(update))
 
     if(!isValidOperation){
         return res.status(400).send({error: 'Esses campos não podem ser atualizados'})
     }
 
     try {
         const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
 
         if(!user){
             return res.status(404).send()
         }
 
         res.send(user)
     } catch (error) {
         res.status(500).send(error)
     }
 })
router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router