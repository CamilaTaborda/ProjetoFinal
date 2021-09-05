const express = require("express");
const app = express();
const bcrypt = require('bcrypt');
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const alert = require('alert');
const cadastro = require("./models/cadastro");
const despesa = require("./models/despesa");




app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas
app.get('/lista', function(req, res){
     despesa.find({}).then(function(despesas){
        res.render('lista', {despesas: despesas});
    })


   
    
});


app.get('/despesa', function(req, res){
    res.render('despesa');
});

app.get('/usuario', function(req, res){
    res.render('usuario');
});

app.post('/authenticate', async(req, res)=>{
    const {email, password} = req.body;
    const user = await cadastro.findOne({email}).select ('+password');
    if(!user)
         return alert('Cadastra-se primeiro')

    if(!await bcrypt.compare(password, user.password))
        return alert('Senha inválida')

    res.redirect('/despesa');
});


app.get('/cadastro', function(req, res){
    res.sendFile(__dirname + "/views/cadastro.html");
})


app.post('/register', async(req, res)=>{
    const {email} = req.body;
    try {
        if(await cadastro.findOne({email}))
            return alert('E-mail já cadastrado')

        const cadastros = await cadastro.create(req.body);
        cadastros.password = undefined;
        return alert('Cadastro realizado com sucesso. Acesse com seu cadastro')
    }catch(err){
        return res.status(400).send({error: 'Registro falhou'})
    }
});

 app.post('/add-despesa', function(req, res){
    despesa.create({
        despesa:req.body.despesa,
        valor: req.body.valor,
        ccusto: req.body.ccusto,
        orcamento: req.body.orcamento
    }).then(function(){
        res.redirect('/lista')
    }).catch(function(erro){
       alert("Erro: Cadastro não foi realizado com sucesso!" )
    })
 })


app.listen(8080);