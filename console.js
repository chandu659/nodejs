let http = require('http')
http.createServer(function(res,req)
{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('This is a an example of a node.js web based application');
})/listen(5000,
    ()=> console.log('Server running at '));
