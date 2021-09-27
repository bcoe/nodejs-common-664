const got = require('got');
setInterval(async () => {
  const res = await got('http://localhost:8080');
  console.info(res.body);
}, 250);
