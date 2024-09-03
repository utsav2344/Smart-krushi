import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { Cust } from './templates/cust.js';
import { Buyd } from './templates/buyd.js';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
const port = 3000;
mongoose.connect('mongodb://localhost:27017/Smartkrushi');



app.get('/', (req, res) => {

});
app.get('/login', (req, res) => {
    res.render('login', { msg: '' });
});

app.post('/payment', (req, res) => {
    var prise = req.body.prise;
    var iname=req.body.iname;
    var imgsr=req.body.imgsr;
    res.render('payment', { prise: prise,iname:iname ,imgsr:imgsr});
});
app.post('/donot', (req, res) => {
    var e= req.body;
    var c=new Buyd(e);
    c.save();
    res.redirect('/buy.html');
});

app.post('/contact.html', (req, res) => {
    var cname = req.body.cname;
    var cnum = req.body.cnum;
    var csmg = req.body.csmg;
    var cust = new Cust({ cname: cname, cnum: cnum, csmg: csmg });
    cust.save();
    res.redirect('/contact.html');
});

app.post('/login', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if ((username === 'Mitul' && password === 'mitul') || (username === 'Dax' && password === 'dax') || (username === 'Utsav' && password === 'utsav')) {
        var dta = await Cust.find({}).then((data) => {
            return data;
        });
        res.render('admin', { username: username, data: dta });
    } else {
        if (username !== 'mitul') {
            res.render('login', { msg: 'Invalid username' });
        } else {
            res.render('login', { msg: 'Invalid password' });
        }
    }
});

app.get('/order',async (req, res) => {
    var odr= await Buyd.find({}).then((data)=>{return data;});
    res.render('order',{ odr:odr });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});