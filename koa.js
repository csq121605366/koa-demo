
var koa = require('koa');
const app = new koa();

const asyncIO = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() - 1 >= 0 ? resolve() : reject();
    }, 1e3);
  })
}

const mid = () => async (ctx, next) => {
  ctx.body = 'mark';
  await next();
  ctx.body = ctx.body + ' done';
}

app.use(mid());

app.use(async (ctx, next) => {
  await asyncIO().then(() => {
    ctx.body = ctx.body + ' saved';
  }).catch(() => {
    ctx.body = ctx.body + ' not saved';
  })
  await next();
})
app.listen(8080);
