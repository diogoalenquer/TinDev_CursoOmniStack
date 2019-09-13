const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {

        const { devId } = request.params;
        const { user } = request.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            response.status(400).json({ error : 'Dev not exist'});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('MATCH!');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return response.json(loggedDev);
    }
}