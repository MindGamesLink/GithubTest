const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = Router();
const mongo = require('./mongo');

///////////////////////////////MONGO SUBPROCESS//////////////////////////////////////////
// const spawn = require('child_process').spawn;
// const mongod = spawn('mongod');

// function mongodCleanup () {
//   console.log("Cleaning up MongoD");
//   mongod.kill("SIGINT");
//   process.exit(0);
// }

// mongod.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

// mongod.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`);
// });

// mongod.on('close', (code) => {
//   console.log(`child process exited with code ${code}`);
// });

// process.on('SIGINT', mongodCleanup);
// process.on('exit', mongodCleanup);
///////////////////////////////MONGO SUBPROCESS//////////////////////////////////////////

app.use(bodyParser());

router.get('/', async (ctx) => {
    var nameLineItems = '';
    var namesArray = await mongo.getLastFiveNames();
    namesArray.forEach((name) => nameLineItems += `<li>${name.comment}</li>\n`);
    const content = `
<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Si vis pacem, para bellum</title>
    </head>
    <body>
      <h1>Welcome</h1>
        <br>
      <fieldset>
        <legend>What is your name?</legend>
        <form action="/name-handler" method="POST">
          <div>
            <label for="name">Enter name:</label>
            <input type="text" id="name" name="comment">
          </div>
          <div class="button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </fieldset>
      <h3>Last 5 names:</h3>
      <div>
      <ul>
        ${nameLineItems}
      </ul>
    </div>
    </body>
    </html>`;

    ctx.body = content;
});

router.post('/name-handler', async (ctx) => {
    console.log(ctx.request.body);
    //JSON.parse(ctx.request.body.comment)
    await mongo.registerName(ctx.request.body);
    ctx.status = 301;
    ctx.redirect('/');
});

app.use(router.routes());
app.listen(3000);
console.log("Server started.");
