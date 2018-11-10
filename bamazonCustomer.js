//Required Node Packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//Start Connection with Mysql via localhost
var connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'root',
  database: 'bamazon_db'
});

//Called our function to show all products
connection.connect(function(err) {
  if (err) throw err;
  printProducts();
});

//This function will run while all the products are selected from our database.
function printProducts() {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    //The next for loop will itirate over the results and will print each product
    for (var i = 0; i < res.length; i++) {
      console.log('-------------------');
      console.log('ID: ' + res[i].id);
      console.log('Product Name: ' + res[i].product_name);
      console.log('Department Name: ' + res[i].department_name);
      console.log('Price: ' + res[i].price);
      console.log('Stock Quantity: ' + res[i].stock_quantity);
    }
    console.log('\n');

    //Run select function
    selectFunction();
  });
}

//Prompt the user all the choices available to buy from. Ask for the quantity.
function selectFunction() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What item number would you like to purchase?',
        choices: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        name: 'choice'
      },
      {
        type: 'input',
        message: 'How many would you like to purchase?',
        name: 'quantity'
      },
      {
        type: 'confirm',
        message: 'Are you sure?',
        name: 'confirmChoice',
        default: true
      }
    ])
    .then(function(response) {
      var choice = response.choice;
      var quantity = parseInt(response.quantity);
      var confirm = response.confirmChoice;

      //If the user confirms the purchase, run next function.
      if (confirm) {
        processingPurchase(choice, quantity);

        //Otherwise the user will receive the prompt again.
      } else {
        selectFunction();
      }
    });
}

//Procced with the purchase according to the prior selection from our user.
function processingPurchase(choice, quantity) {
  connection.query('SELECT * FROM products WHERE id=?', [choice], function(
    err,
    res
  ) {
    if (err) throw err;
    var cost;
    var currentStock;

    //The next conditional will allow the user to buy the products if there is enough in stock and will calculate the final price.
    if (quantity <= parseInt(res[0].stock_quantity)) {
      currentStock = parseInt(res[0].stock_quantity) - quantity;

      //Call update function to reflect the purchase in our stock.
      updateProduct(currentStock, choice);

      //Math operation to calculare and display the final price of the purchase.
      price = parseInt(res[0].price);
      cost = quantity * price;
      console.log('\n Your total cost is: ' + cost.toFixed(2) + '\n');

      //Give user opp to purchase more product. 
      getNewInput();
    } else {
      //If there is not enough product we will log the next msg and ask the user to select again.
      console.log('Insufficient quantity!');
      selectFunction();
    }
  });
}

//Updates the stock according to the user input in our first propmt.
function updateProduct(quantity, choice) {
  var query = connection.query(
    'UPDATE products SET stock_quantity=? WHERE id=?',
    [quantity, choice],
    function(err, res) {}
  );
}

//Function that gives user opp to purchase more product.
function getNewInput() {
  inquirer
    .prompt({
      type: 'list',
      message: 'Would you like to buy another product?',
      choices: ['Yes', 'No'],
      name: 'choice'
    })
    .then(function(response) {
      var choice = response.choice;

      //If the result is yes, display stock to the user
      if (choice === 'Yes') {
        printProducts();
      } else {
        //Otherwise we will display the next msh
        console.log(
          '\n Thank you for your purchase, we hope to see you soon! \n'
        );

        //End connection
        connection.end();
      }
    });
}