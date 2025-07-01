## NodeJS ##
## Create Server in NodeJS ##
*For create nodejs server we need to use few core modules*
- http or https
- fs
- path
- OS

```node.js
const http = require('http')
function reListener(req, res) {
  console.log(req)
}
const server = http.createServer(reListener);
server.listen(3000)
```
- http(Hypertext transfer protocol) which use for sending request and getting the response from the other server via network using the IP Address(Domain)
- createServer function taking a callback function which has requestListener(req) and responseListener(res) params
- requestListener has infomartion who send the request
- responseListener send back the info who send the request
- server.listen(3000):  this is server to manage the port for local but on production it can take default port


