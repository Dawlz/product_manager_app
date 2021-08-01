const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/newDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Connection Successfully established"))
    .catch(()=> console.log("Connection to the database failed"));
