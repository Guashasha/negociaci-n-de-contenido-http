const express = require("express");
const app = express();

app.use(express.json());

app.get('/cache', (req, res) => {
  const data = {mensaje: "mensaje a enviar por el server"};
  const accept = req.accepts(["json", "xml", "html"]);
  res.set({
    "Cache-Control": "public, max-age=60",
    "Expires": new Date(Date.now()+60000).toUTCString(),
    "Pragma": "no-cache",
  });

  switch (accept) {
    case "json":
      res.json(data);
      console.log("enviado mensaje en json\n")
      break;

    case "xml":
      res.type("application/xml");
      res.send(`<mensaje>${data.mensaje}</mensaje>`);
      break;

    case "html":
      res.type("text/html");
      res.send(`<h1>${data.mensaje}</h1>`);
      break;

    default:
      res.status(406).send();
  }
});

app.listen(3001, () => {
  console.log("servidor escuchando desde el puerto 3001");
})
