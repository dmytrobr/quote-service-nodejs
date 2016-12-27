var express = require('express');
var request = require('request');
var app = express();
var router = express.Router();


router.post('/', function(req, res, next) {
  var action = req.body.action;
  res.send('respond with a resource');
  var productId = req.body.base_currency + "-" + req.body.quote_currency;

  var productOrderBook=null;
  var inversed=false;
  getProductOrderBook(productId);


});

module.exports = router;


function getProductOrderBook(var productId)
{
  request.get({ url: "https://api.gdax.com/products/" + productId + "/book/?level=2" },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
              calculatePrice(body, inversed)
            } else if (!inversed && response.statusCode == 404){
              var reverseProductId =req.body.quote_currency + "-" + req.body.base_currency;
              inversed = true;
              getProductOrderBook(reverseProductId);
            }
         });
}

function calculatePrice(var orderBook, var inversed) {

      switch (action) {
      case BUY:
        ordersToUse = inversed ? orderBook.getBids() : orderBook.getAsks();
        break;
      case SELL:
        ordersToUse = inversed ? orderBook.getAsks() : orderBook.getBids();
        break;

      default:
        return Response.status(400).entity(Messages.ACTION_NOT_SUPPORTED.getMessage()).build();
      }

      quoteResponse = bookAggregator.aggregateOrders(ordersToUse, quote.getAmount(), inversed);
    } catch (

    ApiException e) {
      return Response.status(e.getCode()).entity(e.getMessage()).build();
    }
    quoteResponse.setCurrency(quote.getQuoteCurrency());
    return Response.ok().entity(quoteResponse).build();
}
