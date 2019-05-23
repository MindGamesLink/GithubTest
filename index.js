const sqreen = require('sqreen');
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
      <h1>Welcome3</h1>
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
    <footer>
    <a title="Realtime application protection" href="https://www.sqreen.com/?utm_source=badge"><img style="width:109px;height:36px" src="https://s3-eu-west-1.amazonaws.com/sqreen-assets/badges/20171107/sqreen-dark-badge.svg" alt="Sqreen | Runtime Application Protection" /></a>
    </footer>
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


/*
https://dzone.com/articles/vertical-scaling-and-horizontal-scaling-in-aws

How To Achieve Effective Horizontal Scaling:

The first is to make your application stateless on the server side as much as possible. Any time your application has to rely on server-side tracking of what it’s doing at a given moment, that user session is tied inextricably to that particular server. If, on the other hand, all session-related specifics are stored browser-side, that session can be passed seamlessly across literally hundreds of servers. The ability to hand a single session (or thousands or millions of single sessions) across servers interchangeably is the very epitome of horizontal scaling.

The second goal to keep square in your sights is to develop your app with a service-oriented architecture. The more your app is comprised of self-contained but interacting logical blocks, the more you’ll be able to scale each of those blocks independently as your use load demands. Be sure to develop your app with independent web, application, caching and database tiers. This is critical for realizing cost savings – because, without this microservice architecture, you’re going to have to scale up each component of your app to the demand levels of the services tier getting hit the hardest.

When designing your application, you must factor a scaling methodology into the design – to plan for handling increased load on your system, when that time arrives. This is should not be done as an afterthought, but rather as part of the initial architecture and its design.
*/
