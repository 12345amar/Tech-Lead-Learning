const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (req.url === "/") {
        res.write('<form method="POST" action="/submit">');
        res.write('<input name="message" />');
        res.write('<button type="submit">Submit</button>');
        res.write('</form>');
        res.end(); // required to complete response
    }
    if (req.method === "POST" && req.url === "/submit") {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            console.log('Received data:', Buffer.concat(body));
            body = Buffer.concat(body).toString();
            // const parsedData = querystring.parse(body);
            // console.log('Received message:', parsedData);
            fs.writeFile('message.txt', body, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                    res.statusCode = 500;
                    res.end('Internal Server Error');
                    return;
                }
                console.log('Message saved to message.txt');
            });
            res.end('Message received');
            // process.exit(0);
        });
    }
    if (req.method === "GET" && req.url === "/read") {
        fs.readFile('message.txt', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.statusCode = 500;
                res.end('Internal Server Error');
                return;
            }
            res.end(`Message from file: ${data}`);
        });
    }
    // res.statusCode = 200;
    // res.end('Message received');
    // console.log(`req.method`, req.method);     // e.g., "GET", "POST"
    // console.log('req.url', req.url);        // e.g., "/api/users?name=amar"
    // console.log('req.headers', req.headers);    // object with request headers
    // console.log('req.httpVersion', req.httpVersion); // e.g., "1.1"
    // process.exit(0);
});

server.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});