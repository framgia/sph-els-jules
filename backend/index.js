const express = require('express');

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})