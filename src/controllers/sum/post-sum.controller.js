export const postSumController = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        try {
            const payload = JSON.parse(body);
            const a = Number(payload.a);
            const b = Number(payload.b);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ result: a + b }));
        } catch (err) {
            res.writeHead(400);
            res.end('Invalid JSON');
        }
    });
}