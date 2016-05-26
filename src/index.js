'use strict';

$.ready(function (error) {
    if (error) {
        console.log(error);
        return;
    }

    $('#led').turnOn();
    setRGB(0xff,0x83,0xfa);



// #4876FF

// 	#7CFC00

    function setRGB(r, g, b) {
    	$('#led').setRGB(r, g, b);
    }

    function getTemperature(){
    	$('#temperature').getTemperature(function(err, value) {
        	console.log('温度:'+value);
    	});
    }

    function getHumidityRelative(){
    	$('#temperature').getHumidityRelative(function(err, value) {
            console.log('湿度:'+value);
    	});
    }

    $('#button').on('push', function() {
        $('#led').turnOn();
        setRGB(0x7c,0xfc,0x00);
        console.log('打开继电器');
        $('#led-r').turnOn();
	      $('#relay').turnOn();
        $('#relayb').turnOn();
    	  getTemperature();
    });


    $('#button').on('release', function() {
        setRGB(0x48,0x76,0xff);
        console.log('关闭继电器');
        $('#led-r').turnOff();
        $('#relay').turnOff();
        $('#relayb').turnOff();
    	  getHumidityRelative();
        $('#led').turnOff();
    });

});

$.end(function () {
    $('#led-r').turnOff();
});
