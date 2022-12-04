
const { isAsyncFunction } = require('util/types');

//npm install --save http-errors PARA INSTALAR
const createError = require('http-errors')

// server.js
const express = require('express')
    , app = express()
    , fs = require('fs')
    , getStat = require('util').promisify(fs.stat);

    const multer = require("multer");

app.use(express.static('public'));

// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  20;
const filePath = './audios'

    
var musicas = listaPatch(filePath)
       
    let indexMusica=0;

    console.log("Passei por aqui!")
   console.log(musicas[indexMusica])
   console.log(musicas)

   app.set('view engine','ejs');



   const storage = multer.diskStorage({
       destination: function(req, file, cb){
           cb(null,"audios/")
       },
       filename: function(req,file,cb){
           cb(null, file.originalname);
       }
   })
   
   const upload = multer({storage})
   
   const user = {
    firstName: 'Fillipe',
    lastName: 'Welausen',
    admin: true,
    musica:musicas[indexMusica],
    index: indexMusica
}


//UPLOAD DE ARQUIVOS
app.get('/upload',(req,res)=>{
    res.render("upload.ejs");
})
   
   app.post('/upload',upload.single("file"),(req, res) => {
       // res.send("Arquivo recebido")
    })
   

    app.get('/incrementa',(req, res) => {
       if(indexMusica < musicas.length -1){
        indexMusica++;
    }else{
      indexMusica=0;
    }

    user.musica=musicas[indexMusica];
    user.index=indexMusica;
    selecionaMusica();


    res.redirect('/home2')
        //res.render('home.ejs',{
       // user:user
    
     //})
    
    })


    app.get('/decrementa',(req, res) => {
        if(indexMusica > 0){
        indexMusica--;
        
    }else{
      indexMusica = musicas.length -1
    }
    user.musica=musicas[indexMusica];
    user.index=indexMusica;
    selecionaMusica();

       // res.render('home.ejs',{
          res.redirect('/home2')
       
      //    user:user
    
    // })
    
    })

 
   
    // app.set('view engine', 'ejs')
   // HOME (PLAYER)
   app.get('/home',(req, res) => {
       res.render('home.ejs',{
        
    user:user

    })
   })
   
   app.get('/home2',(req, res) => {
    res.render('home2.ejs',{
     
 user:user

 })
})
   


   app.get('/lista',(req, res) => {
    res.render('lista.ejs',{
musicas,

 }) 
})




selecionaMusica();


 function listaPatch(diretorio){
    let listaDeArquivos = fs.readdirSync(diretorio) 
    return listaDeArquivos
    }
    


    const errorPic = "img/erro.jpg";


    // 404
    app.use((req, res, next) => {
        next(createError(404));
    });
    
    // error handler
    app.use((err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        res.status(err.status || 500);
        res.render('error',{
            errorPic,
        });
        
    });
    



function selecionaMusica(){

    app.get('/audio', async (req, res) => {
          
        const filePath = './audios/'+ musicas[indexMusica];
        const stat = await getStat(filePath);
            console.log(stat);    
            
            // informações sobre o tipo do conteúdo e o tamanho do arquivo
            res.writeHead(200, {
               'Content-Type': 'audio/mpeg',
                'Content-Length': stat.size
            });
            
           
          

            const stream = fs.createReadStream(filePath, { highWaterMark });
        
            // só exibe quando terminar de enviar tudo
            // stream.on('end', () => console.log('acabou'));
            stream.on('end', function(){
              console.log('acabou');
            }); 


            // interrompe o stream anterior para iniciar o novo
            // stream.on('data',function (chunk){
            //   readStream.destroy();
            //   console.log('Trocou de musica');
            // })

            // faz streaming do audio 
            stream.pipe(res);
        });
        
        
}//fim do loop






app.listen(3000, () => console.log('Servidor rodando...'));


