const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
require('./config/passport')
const router = require('./routes/index')
const { application } = require('express')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

//Validate production state
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname + "/client/build/index.html"));
    });
}

const PORT = process.env.PORT;
const HOST = process.env.HOST || "0.0.0.0";

//Server listening
// const server = app.listen(PORT, HOST, () =>
//     console.log(`Server listening on port ${PORT} (${HOST})`)
// );
app.listen(4000, () => console.log('Server listening on port 4000'))