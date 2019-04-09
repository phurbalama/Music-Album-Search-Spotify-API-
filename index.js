const http = require("http"); //http module
const fs = require("fs");     //file system module
const url = require("url");   //URL module


//reading from the html
const stream = fs.createReadStream(__dirname + '/html/search-form.html');
const imageStream = fs.createReadStream(__dirname + '/album-art/5c3cf2ee3494e2da71dcf26303202ec491b26213.jpg')



const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    const urlObject = url.parse(req.url,true).query;
    const text = urlObject.q;
  
 
    //request for root Directory
    if(req.url==='/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        stream.pipe(res);

        
        
        
    }
    //request for asset that starts with /favicon.ico
    if(req.url==='/favicon.ico'){
        //error 404 sets a not found response
        res.writeHead(404);
        res.end();
    }
    //request for an asset inside a directory album-art
    if(req.url=='/album-art'){
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        imageStream.on("error",(err)=>{
            console.log(err);
            res.writeHead(404);
            return res.end();
        })
        imageStream.pipe(res);
    }
    //request for a page search 
    if(req.url==='/search'){
        console.log('Hi');
        res.write(text);
        res.end();
    }
    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});





server.listen(3000);

console.log("Server Bound: 3000");