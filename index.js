const tracer = require('@google-cloud/trace-agent').start();

const express = require('express');

const app = express();

setInterval(() => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);    
}, 2000)

// This incoming HTTP request should be captured by Trace
app.get('/', async (req, res) => {
  const customSpan = tracer.createChildSpan({name: 'my-custom-span'});
  try {
    res.status(200).send('hello').end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
  customSpan.endSpan();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
