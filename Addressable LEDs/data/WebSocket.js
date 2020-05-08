var rainbowEnable = false;
var connection = new WebSocket('ws://'+location.hostname+':81/', ['arduino']);
connection.onopen = function () {
    connection.send('Connect ' + new Date());
};
connection.onerror = function (error) {
    console.log('WebSocket Error ', error);
};
connection.onmessage = function (e) {  
    console.log('Server: ', e.data);
};
connection.onclose = function(){
    console.log('WebSocket connection closed');
};

function sendRGB() {
	var st1 = document.getElementById("S1").checked
	var st2 = document.getElementById("S2").checked
	var st3 = document.getElementById("S3").checked
	var st4 = document.getElementById("S4").checked
	var st5 = document.getElementById("S5").checked
    var r = document.getElementById('r').value;
    var g = document.getElementById('g').value;
    var b = document.getElementById('b').value;
	rh = ("0"+(Number(r).toString(16))).slice(-2).toUpperCase()
	gh = ("0"+(Number(g).toString(16))).slice(-2).toUpperCase()
	bh = ("0"+(Number(b).toString(16))).slice(-2).toUpperCase()
    var rgbstr = '#' + st1*1 + st2*1 + st3*1 + st4*1 + st5*1 + rh + gh + bh; 
    console.log('RGB: ' + rgbstr); 
    connection.send(rgbstr);
}

function rainbowEffect(){
    rainbowEnable = ! rainbowEnable;
    if(rainbowEnable){
		var st1 = document.getElementById("S1").checked
		var st2 = document.getElementById("S2").checked
		var st3 = document.getElementById("S3").checked
		var Ra = 'R' + st1*1 + st2*1 + st3*1 + st4*1 + st5*1;
        connection.send(Ra);
        document.getElementById('rainbow').style.backgroundColor = '#00878F';
        document.getElementById('r').className = 'disabled';
        document.getElementById('g').className = 'disabled';
        document.getElementById('b').className = 'disabled';
        document.getElementById('r').disabled = true;
        document.getElementById('g').disabled = true;
        document.getElementById('b').disabled = true;
    } else {
		var Na = 'N' + st1*1 + st2*1 + st3*1 + st4*1 + st5*1;
        connection.send(Na);
        document.getElementById('rainbow').style.backgroundColor = '#999';
        document.getElementById('r').className = 'enabled';
        document.getElementById('g').className = 'enabled';
        document.getElementById('b').className = 'enabled';
        document.getElementById('r').disabled = false;
        document.getElementById('g').disabled = false;
        document.getElementById('b').disabled = false;
        sendRGB();
    }  
}
