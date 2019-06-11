var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"root",
    database:"bamazon"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    getStoreInfo();
    
    connection.end();
});

function getStoreInfo() {
    connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            console.log(res);
            customerInquiry();
        });
}

function customerInquiry() {
    inquirer
    .prompt({
        name:"inquire",
        type:"input",
        message:"what's the the ID of the product you would like to buy?",
        
    })
    .then(function(answer){
        var query = "SELECT product_name, department_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query,{ item_id: answer.item_id }, function(err, res){
            for (var i = 0; i < res.length; i++){
                console.log("Product: " + res[i].product_name + " || Department: " + res[i].department_name + " || Price: " + res[i].price + " || Stock: " + res[i].stock_quantity);
            }
        });
    });
}

