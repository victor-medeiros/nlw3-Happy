import express from 'express';

import './database/connection';

const app = express();

app.get('/', (req, res) => {
  return res.json({message: "Hello wolrd!"});
});

app.listen(3333);
