const bcrypt = require('bcrypt');

const ResponseHelper = require('../helpers/response')

const { User } = require('../models')

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } })

        if (!user) {
            res.status(401).send(ResponseHelper.generateResponse(401, 'Email or password is incorrect.'))
            return
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            res.status(401).send(ResponseHelper.generateResponse(401, 'Password is incorrect.'))
            return
        }

        res.send(ResponseHelper.generateResponse(200, 'Success', { user }));
    }
}