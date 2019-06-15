var mysql = require("mysql");// invoking mysql package from npm
var inquirer = require("inquirer");// invoking inquirer package from npm
var Table = require("cli-table2");// invoking the unicode-aided tables from npm

var connection = mysql.createConnection({// creating a connection to the database bamazon
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon"
});

var display = function() {
    connection.query("SELECT * FROM products", function(err, res){// running a query against the db and selecting all the fields from the products table
        if (err) throw err;
        console.log("");
        console.log("Find the list of products below");
        console.log("");
        var table = new Table({
          head: ["Product Id", "Product Description", "Quantity", "Cost"],
          colWidths: [8, 30, 12, 8],
          colAligns: ["center", "left","center", "right"],
          style: {
            head: ["aqua"],
            compact: true
          }
        });
        for (var i = 0; i < res.length; i++) {//created a for loop to iterate through the query as shown the display variable.
            table.push([res[i].item_id, res[i].product_name, res[i].stock_quantity, res[i].price]);//then pushing the identified items into the table created on line 19
          }
          console.log(table.toString());
          console.log("");
          customerInquiry();
        }); 
      };


// connection.connect(function(err){
//     if (err) throw err;
//     getStoreInfo();
    
// });

// function getStoreInfo() {
//     connection.query("SELECT * FROM products", function(err, res) {
//             if (err) throw err;
//             console.log(res);
//             customerInquiry();
//         });
// }

function customerInquiry() {
    inquirer.prompt([//passing my questions through a prompt
        {
        name:"item_id",
        type:"input",
        message:"what's the the ID of the product you would like to buy?",
    },
    {
        name: "quantity",
        type: "input",
        message: "Please enter the # of items you wish to buy:"
    }
]).then(function(answer){//using the answer to run a query and search for said item, throw an error if it doesn't exists, or update the quantity for said item and also provide a purchase total.
        connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?",{ item_id: answer.item_id }, function(err, res){
            if (err) throw err;
            if (res[0].stock_quantity >= answer.quantity) {
                var itemsRemaining = res[0].stock_quantity - answer.quantity;
                var purchaseTotal = answer.quantity * res[0].price;
                connection.query(`UPDATE products SET stock_quantity=${itemsRemaining} WHERE item_id=${answer.item_id}`, 
                function(err, res) {//running a query against the db to update the table with the new stock quantity value 
                    if (err) throw err;
                    console.log(`Your total is: ${purchaseTotal}`);
                    connection.end();
                });
        } 
            else {
                console.log("Quantity requested exceeds available inventory for this product.");
                getStoreInfo();
            }
        })
    })
}
 display();//calling the display function to show the product table


