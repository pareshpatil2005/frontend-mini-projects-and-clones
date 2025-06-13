const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const { mergePdfs } = require('./merge');

const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async function (req, res, next) {
    if (!req.files || req.files.length < 2) {
        return res.status(400).send('Please upload two PDF files.');
    }
    const mergedFileName = await mergePdfs(
        path.join(__dirname, req.files[0].path),
        path.join(__dirname, req.files[1].path)
    );
    res.redirect(`/static/${mergedFileName}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})