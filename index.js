const express = require('express');


const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    return res.json({
        message: "This is a basic node app to test CI/CD pipeline with Github actions and Jenkins"
    })
})


app.listen(3000)