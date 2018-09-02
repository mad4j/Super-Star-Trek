
var output = "";
var commandstring = "";
var prompt_string = "Command:";
var any_key_is_input = false;

var buffer = "";


var outputBuffer = "";
var inputBuffer = "";
var isEditingFlag = false;

function refresh() {

    var temp = document.getElementById('output_area');

    temp.innerHTML = outputBuffer;
    
    if (isEditingFlag) {
        temp.innerHTML +=
        "<span class='command_echo'>" + inputBuffer + "</span>" +
        "<span class='command_cursor'>_</span>";
    }
}


function clearOutput() {
    outputBuffer = "";
}

function clearInput() {
    inputBuffer = "";
}

function writeString(text) {
    
    outputBuffer += text;
    refresh();
}

function readString() {

    clearInput();
    isEditingFlag = true;

    waitForInput();

    refresh();

    return inputBuffer;
}

function waitForInput() {

    if (isEditingFlag) {
        setTimeout(waitForInput, 100);
    }
}

function getChar() {

}

function userkeypress(event) {

    if (!isEditingFlag) {
        return;
    }


//        var input = document.getElementById(input_id).value;
        var keynum = event.which;
        
        if (keynum === 8) {
            // Backspace (delete)
            inputBuffer = inputBuffer.slice(0,-1);
        }
        else if (keynum === 13) {
            isEditingFlag = false;
        }
        else if (keynum === 27) {
            // escape key so clear input
            inputBuffer = "";
        } else {
            var keychar = String.fromCharCode(keynum);
            if (event.key.length == 1) {
                inputBuffer += event.key;
            }
        }
       refresh();

}
