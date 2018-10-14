const mongoose = require('mongoose');
const config = require('./config');
module.exports = (app,PORT) => {
    console.log('connecting to server');
    mongoose.connect(config.database_url, { useNewUrlParser: true })
        .then(() => {
            app.listen(PORT, () => {
                console.log(`server started at ${PORT}`);
            });
        });
}; 