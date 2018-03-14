const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function calculateRate(weight, mailType) {
  var price;

  if ( weight == 0 ){
    return 0;
  }

  if ( mailType == "stamped" ){
    price = .5 + ( .21 * ( weight - 1 ) );
  } else if ( mailType == "metered") {
    price = .47 + ( .21 * ( weight - 1 ) );
  } else if ( mailType == "flat" ) {
    price = 1 + ( .21 * ( weight - 1 ) );
  } else if ( mailType == "retail" ) {
    if ( weight < 5 ){
      price = 3.5;
    } else if ( weight >= 5 && weight < 9 ) {
      price = 3.75;
    } else if ( weight >= 9 ) {
      price = 3.75 + ( .35 * ( weight - 8 ) );
    }
  }

  return price.toFixed(2);
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getRate', (req, res) => {
    var weight = req.query.weight;
    var mailType = req.query.mailType;

    var price = calculateRate(weight, mailType);

    console.log(weight);
    console.log(mailType);
    console.log(price);

    res.render("pages/result", {price: price, weight: weight, mailType: mailType} );
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
