const userService = require('../services/User');

exports.getUser = async (req, res, next) => {
    const query = req.query;
    if (!Object.keys(query).length) return res.status(404).json({status: 404, message: 'Invalid request'});
    try {
        const user = await userService.getUser(query);
        return res.status(200).json({status: 200, data: user});
    } catch(e) {
        return res.status(404).json({status: 404, message: e.message});
    }
}

exports.createUser = async (req, res, next) => {
    const userObj = {
        username: req.body.username,
        password: req.body.password,
        session_id: req.body.session_id ? req.body.session_id : ''
    }

    try {
        const createdUser = await userService.createUser(userObj);
        return res.status(200).json({status: 200, data: createdUser});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.loginUser = async (req, res, next) => {
    const username = req.body.username;
    const loggingUser = await userService.getUser({username});

    if (!loggingUser) return res.status(400).json({status: 400, message: `Invalid user`});

    try {
        if (await loggingUser.passwordIsValid(req.body.password)) {
            loggingUser.setSessionId(req.body.session_id);
            await loggingUser.update({logged_in: true});
            return res.status(200).json({status: 200, message: `${username} logged succesfully`});
        } else {
            return res.status(404).json({status: 404, message: `Invalid password for ${username}`});
        }
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.logoutUser = async (req, res, next) => {
    const username = req.body.username;
    const loggingUser = await userService.getUser({username});

    try {
        loggingUser.session_id = '';
        loggingUser.logged_in = false;
        await loggingUser.save();

        return res.status(200).json({status: 200, message: 'Log out succesful'});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.deleteUser = async (req, res, next) => {
    const id = req.params.id;
    if (!id) return res.status(400);
    
    try {
        userService.deleteUser(id);
        return res.status(200).json({status: 200, message: 'User deleted succesfully'});
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}