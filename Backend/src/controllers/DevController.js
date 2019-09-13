const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {

    async index(request, response){
        const { user } = request.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and : [
                { _id: { $ne: user }},
                { _id: { $nin: loggedDev.likes }},
                { _id: { $nin: loggedDev.dislikes }}
            ]
        });

        return response.json(users);
    },

    async store(request, response){

        const {username} = request.body;
        console.log('Checks if user exists');
        const userExists = await Dev.findOne({user: username});
        console.log(userExists);
        if(userExists)
        {
            console.log('returning user');
            return response.json({userExists});
        }

        console.log('call axios to return user information from github public api');
        const gitHubResponse = await axios.get(`https://api.github.com/users/${username}`);

        const {name, bio, avatar_url, login} = gitHubResponse.data;

        console.log('Creating user');
        const dev = await Dev.create({
            name,
            user: login,
            bio,
            avatar: avatar_url
        });

        return response.json(dev);
    }
}