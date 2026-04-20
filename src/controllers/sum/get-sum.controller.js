
export const getSumController = (req, res) => {
   const query = req.url.split('?')[1];
   if(query) {
      const searchParams = new URLSearchParams(query);
      const a = Number(searchParams.get('a'));
      const b = Number(searchParams.get('b'));
      res.end(JSON.stringify({result: a + b}));
   }
}