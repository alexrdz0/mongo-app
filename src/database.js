const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/registrosDB', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    //(node:24635) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
    useUnifiedTopology: true
})
    .then(db=> console.log('Database is connected'))
    .catch(err => console.error(err));