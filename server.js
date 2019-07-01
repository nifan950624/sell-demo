var express = require('express')
var config = require('./config/index')
var port = process.env.PORT || config.build.port
var app = express()
var router = express.Router()
router.get('/',(req,res,next)=> {
  req.url = 'index.html'
  next()
})

app.use(router)

var appData=require('./data.json');
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings;

var apiRouter=express.Router();
apiRouter.get('/seller',(req,res)=>{
  res.json({
    errno:0,
    data:seller
  })
})

apiRouter.get('/goods',(req,res)=>{
  res.json({
    errno:0,
    data:goods
  })
})

apiRouter.get('/ratings',(req,res)=>{
  res.json({
    errno:0,
    data:ratings
  })
})

app.use('/api',apiRouter);

app.use(express.static('./dist'))

module.exports = app.listen(port,(err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('http://localhost:'+ port + '\n')
})