$(document).ready(function(){
     myPopup();
});

function myPopup() {
    if ($(".mine").text() === "HELLO WORLD") {
        alert("confirmed");
    }
    else {
        alert("no greeting");

    }
}