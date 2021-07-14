import { Router } from 'express';
import User from './../models/user.model';

const router = Router();

router.get('', async (_req, res, _next) => {
    const users = await User.find();
    res.json(users);
})

router.get('/:id', async (req, res, _next) => {
    const user = await User.findOne({_id: req.params.id});
    
    if (user) res.json(user);
    else res.status(404).send('User not found');
})

router.post('', async (req, res, _next) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        age: req.body.age,
    });

    try {
        const userSaved = await user.save();
        res.json(userSaved);
    } catch(err) {
        res.status(500).send(err)
    }
})

router.delete('/:id', async (req, res, _next) => {
    await User.findOneAndDelete({_id: req.params.id});
    res.status(204).send();
})

router.put('/:id', async (req, res, _next) => {
    try {
        await User.findOneAndReplace(
            {
                _id: req.params.id
            }, {
                name: req.body.name,
                lastName: req.body.lastName,
                age: req.body.age,
                updatedAt: new Date(),
            });
    
        const userUpdated = await User.findById(req.params.id); 
        res.json(userUpdated);
    } catch (err) {
        res.status(500).send(err);
    }
})

export default router;