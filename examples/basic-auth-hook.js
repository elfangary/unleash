'use strict';

const auth = require('basic-auth');
const User = require('../lib/user');

function basicAuthentication(app) {
    const authUser = new User({
        name: 'admin',
        password: '1234admin',
        email: 'admin@ta3limy.com',
    });
    // const savedUser = new User({ name: userName, password, email });
    app.use('/api/admin/', (req, res, next) => {
        const credentials = auth(req);
        if (credentials) {
            const user = new User({
                name: credentials.name,
                password: credentials.pass,
                email: 'admin@ta3limy.com',
            });
            if (
                user.password === authUser.password &&
                user.name === authUser.name
            ) {
                next();
            } else {
                return res
                    .status('401')
                    .set({ 'WWW-Authenticate': 'Basic realm="example"' })
                    .end('access denied');
            }
        } else {
            return res
                .status('401')
                .set({ 'WWW-Authenticate': 'Basic realm="example"' })
                .end('access denied');
        }
    });

    app.use((req, res, next) => {
        // Updates active sessions every hour
        req.session.nowInHours = Math.floor(Date.now() / 3600e3);
        next();
    });
}

module.exports = basicAuthentication;
