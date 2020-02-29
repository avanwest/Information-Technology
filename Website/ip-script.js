
const ipv4 = $("#ipv4");
const ipv6 = $("#ipv6");

const addressScheme = $("#address-scheme");
const classless = $("#classless");
const classfull = $('#classfull');

const classA = $('#class-a');
const classB = $('#class-b');
const classC = $('#class-c');
const classD = $("#class-d");
const classE = $("#class-e");

const radioButtons = $("input[type=radio]");

$(document).ready(function() {
    addressScheme.hide();
    classless.hide();
    classfull.hide();
    classA.hide();
    classB.hide();
    classC.hide();
    classD.hide();
    classE.hide();
    ipv6.hide();

});


const selectButton = radioButtons.click(function (event) {
    console.log($(this).val());

    // Path if IPv4 is selected
    if ($(this).val() === 'IPv4') {

        // Display the IPv4 addressing scheme when the user selets IPv4
        addressScheme.show();

        // Hide other fields 
        classless.hide();
        classfull.hide();
        ipv6.hide();

        for(i = 0; i < radioButtons.length; i++){
            if($(radioButtons[i]).val() != 'IPv4'){
                $(radioButtons[i]).prop('checked', false);
            }
        }

    // Path if Ipv6 is selected
    } else if ($(this).val() === 'IPv6') {

        ipv6.show();

        addressScheme.hide();
        classless.hide();
        classfull.hide();
        classA.hide();
        classB.hide();
        classC.hide();
        classD.hide();
        classE.hide();

        for(i = 0; i < radioButtons.length; i++){

            if($(radioButtons[i]).val() != 'IPv6'){
                $(radioButtons[i]).prop('checked', false);
            }
        }

      // Select classless
    } else if ($(this).val() === 'classless') {

        console.log('*** IPv4 Classless ***');
        classless.show();
        classfull.hide();

     // Select classfull
    } else if ($(this).val() === 'classfull') {
        classfull.show();
        classless.hide();

      // Select class-A  
    } else if ($(this).val() === 'class-a') {
        classA.show();
        classB.hide();
        classC.hide();
        classD.hide();
        classE.hide();
    
      // Select class-B
    } else if ($(this).val() === 'class-b') {
        classA.hide();
        classB.show();
        classC.hide();
        classD.hide();
        classE.hide();

      // Select class-C
    } else if ($(this).val() === 'class-c') {
        classA.hide();
        classB.hide();
        classC.show();
        classD.hide();
        classE.hide();

      // Select class-D
    } else if ($(this).val() === 'class-d') {
        classA.hide();
        classB.hide();
        classC.hide();
        classD.show();
        classE.hide();

      // Select class-E
    } else if ($(this).val() === 'class-e') {
        classA.hide();
        classB.hide();
        classC.hide();
        classD.hide();
        classE.show();
    }

});

// Calculate classless IPv4 scheme
const calculateClassless = $('#calculate-button').click(function (event) {
    event.preventDefault();

    // Retrieve values from input
    var firstOct = document.getElementById('first-oct').value;
    var secondOct = document.getElementById('second-oct').value;
    var thirdOct = document.getElementById('third-oct').value;
    var fourthOct = document.getElementById('fourth-oct').value;
    var cidrSize = document.getElementById('cidr-size').value;

    // Check if input is valid
    if (
        (firstOct >= 0 && firstOct <= 255) &&
        (secondOct >= 0 && secondOct <= 255) &&
        (thirdOct >= 0 && thirdOct <= 255) &&
        (fourthOct >= 0 && fourthOct <= 255) &&
        (cidrSize >= 0 && cidrSize <= 32)
    ) {
        // Output IP address
        document.getElementById('ip').innerHTML = firstOct + "." + secondOct + "." + thirdOct + "." + fourthOct;

        // Calculate binaries 
        var ipArray = {};
        ipArray[1] = String("00000000" + parseInt(firstOct, 10).toString(2)).slice(-8);
        ipArray[2] = String("00000000" + parseInt(secondOct, 10).toString(2)).slice(-8);
        ipArray[3] = String("00000000" + parseInt(thirdOct, 10).toString(2)).slice(-8);
        ipArray[4] = String("00000000" + parseInt(fourthOct, 10).toString(2)).slice(-8);

        // Calculate class
        var getClass = "";
        if (firstOct <= 126) {
            getClass = "A";
        } else if (firstOct == 127) {
            getClass = "loopback"
        } else if (firstOct >= 128 && firstOct <= 191) {
            getClass = "B";
        } else if (firstOct >= 192 && firstOct <= 223) {
            getClass = "C";
        } else if (firstOct >= 224 && firstOct <= 239) {
            getClass = "D (Multicast Address)";
        } else if (firstOct >= 240 && firstOct <= 225) {
            getClass = "E (Experimental)";
        } else {
            getClass = "Out of range";
        }

        // Calculate getMask
        var getMask = cidrSize;
        var lastBlock = Math.ceil(getMask/8);
        var lastBlockBinary = ipArray[lastBlock];
        var maskBinaryCount = getMask % 8;
        if (maskBinaryCount == 0) lastBlock++;
        var getMaskBinaryBlock = "";
        var getMaskBlock = "";
        for (var i = 1; i <= 8; i++) {
            if (maskBinaryCount >= i) {
                getMaskBinaryBlock += "1";
            } else {
                getMaskBinaryBlock += "0";
            }
        }
        
        // Convert getMask binary to decimal
        getMaskBlock = parseInt(getMaskBinaryBlock, 2);

        // Calculate net and broadcast addresses
        var netBinaryBlock = "";
        var bcBinaryBlock = "";
        for (var i = 1; i <= 8; i++) {
            if (getMaskBinaryBlock.substr(i - 1, 1) == "1") {
                netBinaryBlock += lastBlockBinary.substr(i - 1, 1);
                bcBinaryBlock += lastBlockBinary.substr(i - 1, 1);
            } else {
                netBinaryBlock += "0";
                bcBinaryBlock += "1";
            }
        }

        
        var getMask = "";
        var getMaskBinary = "";
        var net = "";
        var bc = "";
        var netBinary = "";
        var bcBinary = "";
        var rangeA = "";
        var rangeB = "";
      
        for (var i = 1; i <= 4; i++) {
            if (lastBlock > i) {
                // Blocks before the lastBlock.
                getMask += "255";
                getMaskBinary += "11111111";
                netBinary += ipArray[i];
                bcBinary += ipArray[i];
                net += parseInt(ipArray[i], 2);
                bc += parseInt(ipArray[i], 2);
                rangeA += parseInt(ipArray[i], 2);
                rangeB += parseInt(ipArray[i], 2);
            } else if (lastBlock == i) {
                // The lastBlock
                getMask += getMaskBlock;
                getMaskBinary += getMaskBinaryBlock;
                netBinary += netBinaryBlock;
                bcBinary += bcBinaryBlock;
                net += parseInt(netBinaryBlock, 2);
                bc += parseInt(bcBinaryBlock, 2);
                rangeA += (parseInt(netBinaryBlock, 2) + 1);
                rangeB += (parseInt(bcBinaryBlock, 2) - 1);
            } else {
                // Block after the lastBlock
                getMask += 0;
                getMaskBinary += "00000000";
                netBinary += "00000000";
                bcBinary += "11111111";
                net += "0";
                bc += "255";
                rangeA += 0;
                rangeB += 255;
            }
           
            if (i < 4) {
                getMask += ".";
                getMaskBinary += ".";
                netBinary += ".";
                bcBinary += ".";
                net += ".";
                bc += ".";
                rangeA += ".";
                rangeB += ".";
            }
        }
        // Output results
        document.getElementById('mask').innerHTML = getMask;
        document.getElementById('net').innerHTML = net;
        document.getElementById('bc').innerHTML = bc;
        document.getElementById('range').innerHTML = rangeA + " - " + rangeB;
        document.getElementById('binIp').innerHTML = ipArray[1] + "." + ipArray[2] + "." + ipArray[3] + "." + ipArray[4];
        document.getElementById('binMask').innerHTML = getMaskBinary;
        document.getElementById('binNet').innerHTML = netBinary;
        document.getElementById('binBc').innerHTML = bcBinary;
        document.getElementById('sClass').innerHTML = getClass;

    } else {
        alert("invalid value");
    }


    return false;
});