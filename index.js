const restify = require('restify');

//settings
const server= restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


const users = {
    1:{
        name: 'Oscar',
        lastName:'Ramirez'
    },
    2:{
        name: 'Camilo',
        lastName:'Ramirez'
    }

}

let userCount =2;
//routes
    server.get('/user', (req,res, next)=>{
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify(users));
    });

    server.get('/user/:userID', (req,res, next)=>{
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        console.log(req.params.userID);
        res.end(JSON.stringify(users[parseInt(req.params.userID)]));
    });

    server.post('/user', (req,res, next)=>{
        console.log(req.body);
        let user = req.body;
        userCount++;
        user.userID = userCount;
        users[user.userID]=user;
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify(user));
    
    });

    server.put('/user/:userID', (req,res, next)=>{
       const user= users[parseInt(req.params.userID)];
        const update = req.body;
        for(let field in update){
            user[field]= update[field];
        }
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify(user));
    
    });

    server.del('/user/:userID', (req,res, next)=>{
        delete users[parseInt(req.params.userID)];
        res.setHeader('Content-Type','application/json');
        res.writeHead(200);
        res.end(JSON.stringify(true));
    
    });
        //start server
server.listen(3000, () =>{
    console.log('server on port 3000');
});