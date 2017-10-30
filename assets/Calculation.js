
function myFunction() {


    var price = parseFloat(document.getElementById("Rate").value);

    var Quant = parseFloat(document.getElementById("Quantity").value);

    var tax = parseFloat(document.getElementById("Tax").value);


    var total = wagecalculator(price, Quant, tax);
    $("#Calculate").css("color", "Red"); //Using Jquery for the css component


    $("#Calculate").html("Your Total Price is : " + total);
}


function wagecalculator(price, Quant, tax) {

    if (price <= 0 || Quant <= 0 || tax <= 0) {

        return 'Number cannot be negative';

    }

    else {

        return ((price * Quant) + (price * Quant * tax / 100));

    }

}