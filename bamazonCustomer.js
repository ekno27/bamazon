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

//function declarations

//asks the user to select a product
function questionOne(){
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
                message:"Enter the id of the Product you'd like to buy",
                choices: idOptions,
                name: "user_choiceID"

            }
         
        ])//end of questions
        .then(function(data,error){
            var number = parseInt(data.user_choiceID.match(/\d+/)[0]);
           
            questionTwo(number);

        });//end of .then
    })//end of connection.query

}//end of questionOne

//Ask the client for amount of product to purchase and change records accordingly
function questionTwo(idNumber){ //idNumber to         reference in database 
    inquirer.prompt([
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "purchaseAmount"
        }
    ])//end of question
    .then(function(data,error){
        var purchaseAmount = parseInt(data.purchaseAmount);
        connection.query("SELECT product_name, stock_quantity, price FROM products WHERE item_id= ?",[idNumber],function(err,res){
           if (err) throw err;
            else{
                //easing access of database variables
                var product_name = res[0].product_name;
                var stock_quantity = res[0].stock_quantity;
                var product_price = res[0].price;
                var purchase_price= purchaseAmount * product_price;
                //if there is not enough product in stock to satisfy customer request
                if(stock_quantity< purchaseAmount){
                    console.log("Look--We get it. You're Ballin' out, but unfortunately we don't have enough of that...thanks for trying though");
                    connection.end();
                }
                else{
                    /**
                     * * updating the SQL database to reflect the remaining quantity.
                    * Once the update goes through, show the customer the total cost of their purchase and amount of product left.
                     */ 
                
                    console.log("hey wait gimme a sec");
                    connection.query("UPDATE products SET stock_quantity = ? where item_id= ?", [stock_quantity-purchaseAmount, idNumber],function(err,res){
                      if(err) throw err;
                       console.log("Thanks for buying some " + product_name+ ". Give us "+purchase_price+ " dollars." );
                       console.log(product_name+  " left: " + (stock_quantity-purchaseAmount));
                       connection.end();
                    });


                }//end of inner else
            
            }//end of outer else

        });//end of query
        
    })//end of .then


}//end of Question2



//main
questionOne();
// connection.end();