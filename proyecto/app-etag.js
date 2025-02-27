const express = require("express");
const crypto = require("crypto");
const app = express();

app.use(express.json());

app.get('/etag', (req, res) => {
  const data = {mensaje: "mensaje a enviar por el server"};
  const json_response = JSON.stringify(data);

  const etag = crypto.createHash("md5").update(json_response).digest("hex");
  if (req.header["if-none-match"]==etag) {
    return res.status(304).end();
  }
  res.set("Etag", etag);
  res.json(data);
});

app.listen(3001, () => {
  console.log("servidor escuchando desde el puerto 3001");
})
