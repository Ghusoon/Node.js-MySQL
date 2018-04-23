var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
})
//--------------------------------------------------------------------
connection.connect(function (err) {
  console.log("conected as id: " + connection.threadId);
  start()
})

//----------------------------------------------------------------------
function start() {

  connection.query("SELECT * FROM products", function (err, res) {

    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
  });
  postProducts()
}

//------------------------------------------------
function postProducts() {

  inquirer
    .prompt([{
      name: "id",
      type: "input",
      message: "Pleace inter the number of item you would like to buy?\n",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }, {
      name: "q",
      type: "input",
      message: "Pleace inter the quantity?\n",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]).then(function (answer) {
      // console.log(answer);
      //the quantity of the custmer.
      var qCustmer = parseInt(answer.q);

      connection.query("SELECT * FROM products where id =?", answer.id, function (err, res) {


        if (err) throw err;

        // console.log(res);
        function quantity() {
          for (var i = 0; i < res.length; i++) {
            var qstore = res[i].stock_quantity;
            if (qstore < qCustmer) {
              //tell the custmer there is Insufficient quantity.
              console.log("Insufficient quantity!")
            } else {
              //the total cost for the custmer.
              function cost(price, quantity) {
                return price * quantity;
              }
              console.log("-------------casher--------------");
              console.log(" the total cost is: $" + cost(res[i].price, qCustmer));
              console.log("------------update item--------------");
              console.log("the stock_quantity for item " + answer.id + " was update ");
              console.log("---------------end------------");
              //update the remnding quantity.
              function updateQ(q1, q2) {
                return q1 - q2;
              }

              connection.query("UPDATE products SET ? WHERE ?", [{
                  stock_quantity: updateQ(qstore, qCustmer)
                }, {
                  id: answer.id
                }],
                function (err, res) {
                  if (err) throw err;

                  start();
                });



            }
          }
        }

        quantity()

      })


    })
}