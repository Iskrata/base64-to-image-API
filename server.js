const express = require('express');
const bodyParser = require('body-parser');
md5 = require('js-md5');

const app = express();  
app.use(express.static('data/images'));

const port = 80;

app.use(bodyParser.urlencoded( { extended: true } ))

app.post('/', (req, res) => {
    let data = req.body.image.toString();
    let commaPos = data.search(",");
    let base64Data = data.substring(commaPos+1);
    let hash = md5(base64Data);
    let hashFile = '/' + hash + '.png'
    require("fs").writeFile('./data/images' + hashFile, base64Data, 'base64', function(err) {
        if (err != null){
            console.log(`Generated ${hashFile}`);
        }else{
            console.log(err);
        }
    });
    res.send(hashFile);
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
