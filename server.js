const express = require('express');
const bodyParser = require('body-parser');
md5 = require('js-md5');

const app = express();  
app.use(express.static('data/images'));

const port = 8000;

//require('./app/routes')(app, {});
app.use(bodyParser.urlencoded( { extended: true } ))

app.post('/', (req, res) => {
    let data = req.body.image.toString();
    let commaPos = data.search(",");
    let base64Data = data.substring(commaPos+1);
    let hash = md5(base64Data);
    require("fs").writeFile('./data/images/'+hash+'.png', base64Data, 'base64', function(err) {
    //console.log(err);
    });

    //console.log(req.body);
    res.send('/'+hash+'.png');
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})
