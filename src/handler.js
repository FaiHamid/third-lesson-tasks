export const requestHttpListener = (req, res) => {

    const baseUrl = `http://${req.headers.host}`;
    const myUrl = new URL(req.url, baseUrl);

    const params = myUrl.searchParams;

    if (!req.url.includes('/sum')) {

        res.end(baseUrl);
        return;
    }

    if (req.method == 'GET') {

        const a = Number(params.get('a'));
        const b = Number(params.get('b'));

        if (a && b) {
            const sum = a + b;
            console.log(`sum result: ${sum}`);
            res.end(JSON.stringify({ "result": sum }));
        }
        else {
            res.end("Need a,b arguments to complete sum");
        }
    } else if (req.method == 'POST') {

        let postBody = '';

        req.on('data', (chunk) => {
            postBody += chunk.toString();
        });

        req.on('end', () => {
            try {

                const data = JSON.parse(postBody);
                console.log('Received data: ' + JSON.stringify(data));

                let result = null;
                if (data.a !== undefined && data.b !== undefined) {
                    result = Number(data.a) + Number(data.b);
                }

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Data get: ", data: data, result: result }));
            }
            catch (error) {

                res.writeHead(400);
                res.end("Invalid JSON");
            }
        });
    } else {
        res.end();
    }
};
