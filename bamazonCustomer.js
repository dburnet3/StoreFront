var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon"
});

var display = function() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.log("");
        console.log("Find below our Products List");
        console.log("");
        var table = new Table({
          head: ["Product Id", "Product Description", "Quantity", "Cost"],
          colWidths: [12, 50, 12, 8],
          colAligns: ["center", "left","center", "right"],
          style: {
            head: ["aqua"],
            compact: true
          }
        });

        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, res[i].stock_quantity, res[i].price]);
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
    inquirer.prompt([
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
]).then(function(answer){
        connection.query("SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?",{ item_id: answer.item_id }, function(err, res){
            if (err) throw err;
            if (res[0].stock_quantity >= answer.quantity) {
                var itemsRemaining = res[0].stock_quantity - answer.quantity;
                var purchaseTotal = answer.quantity * res[0].price;
                connection.query(`UPDATE products SET stock_quantity=${itemsRemaining} WHERE item_id=${answer.item_id}`, 
                function(err, res) {
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
    display();


