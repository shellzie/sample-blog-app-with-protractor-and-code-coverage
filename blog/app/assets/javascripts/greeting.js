$(document).ready(function() {
    $("#greeting").on("click", show_text);
    $("#greeting").hide();
});

mine = "michelle";

function show_text() {
    if(mine === "michelle") {
        $("#greeting").show();
    }
    else {
        hide_text();
    }

}

function hide_text(){
    $("#greeting").hide();
}


