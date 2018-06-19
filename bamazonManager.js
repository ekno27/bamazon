var mysql = require("mysql");
var inquirer = require("inquirer");


 
var connection= mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",

    password: "root.",
    database: "bamazon_DB"
});

// connection.connect(function(err){
//     if(err) throw err;
//     console.log("connected as id " + connection.threadId + "\n");
    
// });

/*
*function declaration
*/

//function used in order to display all the items in the database
function viewProducts(){
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        var item_id;
        var product_name;
        var department_name;
        var price; 
        var stock_quantity;
        for(var i = 0; i<res.length;i++){
            item_id = res[i].item_id;
            product_name = res[i].product_name;
            department_name = res[i].department_name;
            price = res[i].price;
            stock_quantity = res[i].stock_quantity;
            
            console.log("item ID: "+ item_id +"  Product Name: "+product_name + "\nDepartment: "+department_name+ "\nPrice: "+price+"\nStock Quantity: "+stock_quantity +"\n" );

            
        }//end of loop
        connection.end();
    })//end of query 
}//end of function

//function used to show the items with low inventory 
function ViewLowInventory(){
    connection.query("SELECT * FROM products where stock_quantity<5", function(err,res){
        if(err) throw err;
        var item_id;
        var product_name;
        var department_name;
        var price; 
        var stock_quantity;
        for(var i = 0; i<res.length;i++){
            item_id = res[i].item_id;
            product_name = res[i].product_name;
            department_name = res[i].department_name;
            price = res[i].price;
            stock_quantity = res[i].stock_quantity;
            
            console.log("item ID: "+ item_id +"  Product Name: "+product_name + "\nDepartment: "+department_name+ "\nPrice: $ "+price+"\nStock Quantity: "+stock_quantity +"\n" );

            
        }//end of loop
        connection.end();
    })//end of query
}//end of function 

//function used to add stock of an item picked 
function addInventory(){
    connection.query("SELECT item_id, product_name FROM products", function(err,res){
        if(err) throw err;
        var idOptions= [];
        // loop retrieve each item id and name to put in the array of choices in the inquirer
        for (var i= 0; i <res.length;i++){
            idOptions.push("id "+ res[i].item_id+ ": "+ res[i].product_name);
        }
        inquirer.prompt([
            {
                type: "list",
                message:"What item would you like to restock?",
                choices: idOptions,
                name: "restock_choiceID"

            },
            {
                type:"input",
                message:"How many are you adding?",
                name: "restockAmount"
            }
         
        ])//end of questions
        .then(function(data,error){
            var restock_choiceID = parseInt(data.restock_choiceID.match(/\d+/)[0]);
            var restockAmount = parseInt(data.restockAmount);
            console.log(restock_choiceID);
            console.log(restockAmount);
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ? where item_id = ?", [restockAmount, restock_choiceID],function(err,res){
                if (err) throw err;
                console.log("Cool thanks for the cargo");
                connection.end();
            });//end of inner query


        });//end of .then
    })//end of connection.query
}


//function used to allow client to add items to inventory database
function addNewProduct(){
    inquirer.prompt([
        {
            type:"input",
            message: "Enter name of product: ",
            name: "newName"
        },
        {
            type:"input",
            message:"What department does this item belong in?",
            name: "newDepartment"
        },
        {
            type: "input",
            message: "Enter price:",
            name: "newPrice"
        },
        {
            type:"input",
            message: "Enter amount of the product you'd like to add: ",
            name:"newQuantity"
        }

    ])//end of query
    .then(function(data,error){
        if(error){
            console.log("error: "+ error);
        }
       
        var newName = data.newName;
        var newDepartment = data.newDepartment;
        var newPrice= parseFloat(data.newPrice);
        newPrice= newPrice.toFixed(2);
        var newQuantity = parseInt(data.newQuantity);
        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) values(?,?,?,?)",[newName,newDepartment,newPrice,newQuantity],function(err,res){
            if(err) throw err;

            console.log("Product added successfully now get out of my warehouse");
            connection.end();
        });//end of query
        
    });//end of then
}//end of function

//main menu
function mainMenu(){
    inquirer.prompt([{
        type: "list",
        message: "We got a business mogul in the house everyone PLEASE watch out --What would you like to do?",
        choices: ["View Products for sale", "View low inventory", "Add to inventory", "Add New Product"],
        name: "clientOption"
    }])//end of prompt
    .then(function(data,error){
        if(error){
            console.log(error);
        }
        switch(data.clientOption){
            case "View Products for sale":
            //viewProducts
            viewProducts();
            break;

            //2nd case 
            case "View low inventory":
            //view low inventory 
            ViewLowInventory();
            break;
            ///TODO: FINISH 3RD AND 4TH CASE

            //3rd option
            case "Add to inventory":
            //add inventory
            addInventory();
            break;
            
            //4th option
            case "Add New Product":
            //add a new product
            addNewProduct();
            break;

        }

    })//end of .then

}//end of function

mainMenu();