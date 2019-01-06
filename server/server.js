const path = require('path');
const express = require('express');
//拼接路径
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//     res.render(publicPath + 'index.html');
// })

app.listen(port, () => {
    console.log(`server start for ${port}`);
})