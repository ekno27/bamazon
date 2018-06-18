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
            break;
            //2nd case 
            case "View low inventory":
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
            break;



            ///TODO: FINISH 3RD AND 4TH CASE



            //3rd option
            case "Add to inventory":
            connection.query("SELECT item_id, product_name from products")
            break;
            case "View low inventory":
            console.log("2nd option");
            break;

        }

    })//end of .then

}//end of function

mainMenu();