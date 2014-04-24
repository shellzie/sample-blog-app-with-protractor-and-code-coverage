$(document).ready(function() {
    $("#greeting").on("click", show_text);
    $("#hello").hide();
});

mine = "michelle";

function show_text() {
    if(mine === "michelle") {
        $("#hello").show();
    }
    else {
        hide_text();
    }

}

function hide_text(){
    $("#greeting").hide();
}


