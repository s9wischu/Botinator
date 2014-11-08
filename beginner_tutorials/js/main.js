var CONTINUOUS_SLIDER_RADIUS = 25;
var CONTINUOUS_SLIDER_HANDLE_RADIUS = 8;
var CONTINUOUS_SLIDER_POSITION_OFFSET = CONTINUOUS_SLIDER_RADIUS - CONTINUOUS_SLIDER_HANDLE_RADIUS;
var CONTINUOUS_SLIDER_THETA_OFFSET = Math.PI / 2;
var HEAD_PAN_MAX = 168;
var HEAD_PAN_MIN = -168;
var HEAD_TILT_MAX = 60;
var HEAD_TILT_MIN = -30;

base_interval = null
function base_command(x, y, z) {
    var params = {type:"base",x:x, y:y, z:z};
    $.get("/", params);
}

base_interval = null
function base_command_start(x, y, z) {
    // Make sure we don't have two base_intervals at the same time. 
    if(base_interval != null) {
        clearInterval(base_interval);
        base_interval = null;
    }

    append_to_log("Move command start: x=" + x + " y=" + y + " z=" + z + ".");
    var params = {type:"base",x:x, y:y, z:z};
    base_interval = setInterval(function() { $.get("/", params); }, 50);
}
function base_command_end() {
    append_to_log("Move command end.");
    clearInterval(base_interval);
    base_interval = null;
}

map_interval = null;
function map_interval_run() {
    append_to_log("called");
    var img = document.getElementById("map_image");
    img.src = "map.gif"

}


function speak_command() {
    var say = $("#speak-text").val();
    $("#speak-text").val("");
    var params = {type:"speak", say:say};
    append_to_log("Say command: \"" + say + "\".");
    $.get("/", params);
}

/*
 * side - should be either "left" or "right"
 * topic - must be a valid image generating topic
 */
function set_image(side, topic) {    

    var iframe = "#" + "left" + "-" + "view";
    $(iframe).attr("src", "http://localhost:8080/stream?topic=/v4l/camera/image_raw?width=300?height=300");
}

function append_to_log(message) {
    var div = document.getElementById('log');
    div.innerHTML = div.innerHTML + message + "<br>";
    console.log(message);
}

// Called when the mode is changed (radio buttons)
function mode_changed(mode) {

    if (mode == "manual") {
        append_to_log("Changed mode: Manual Movement.");
        document.getElementById("block-manual").style.visibility = 'visible';
        document.getElementById("block-map").style.visibility = 'collapse';
        document.getElementById("block-follow").style.visibility = 'collapse';
    } else if (mode == "map") {
        append_to_log("Changed mode: Move to Map Location.");
        document.getElementById("block-manual").style.visibility = 'collapse';
        document.getElementById("block-map").style.visibility = 'visible';
        document.getElementById("block-follow").style.visibility = 'collapse';
    } else {
        append_to_log("Changed mode: Follow Person.");
        document.getElementById("block-manual").style.visibility = 'collapse';
        document.getElementById("block-map").style.visibility = 'collapse';
        document.getElementById("block-follow").style.visibility = 'visible';
    }
}



function click_map_image(event) {
    var offset = document.getElementById("#map_image").offset();
    alert(event.clientX - offset.left);
    alert(event.clientY - offset.top);
}

$( document ).ready(function() {
        document.getElementById("block-manual").style.visibility = 'visible';
        document.getElementById("block-map").style.visibility = 'collapse';
        document.getElementById("block-follow").style.visibility = 'collapse';

        document.getElementById("radiobutton1").checked = true;
        document.getElementById("radiobutton2").checked = false;
        document.getElementById("radiobutton3").checked = false;

        
        $("#map_image").click(function(e) {
            var offset = $(this).offset();
            var x = e.clientX - offset.left;
            var y = e.clientY - offset.top;
            append_to_log("Clicked on map image at (" + x + ", " + y + ")");
        });

        map_interval = setInterval(function() { map_interval_run(); }, 50);
});

var play_interval = null;
