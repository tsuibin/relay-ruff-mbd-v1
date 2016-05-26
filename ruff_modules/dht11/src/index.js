'use strict';
var kernelModule = require('kernel-module');
var driver = require('ruff-driver');

function getFriendlyValue(data) {
    // Not a number should equal to the meaning not vailad
    if (data) {
        var numberOfData = parseInt(data);
        if (numberOfData) {
            return numberOfData / 1000;
        }
    }
    return -1;
}

function readAsync(fd, handler) {
    function callback(data, err) {
        var value = data && getFriendlyValue(data.toString()) || -1;
        handler(err, value);
    }

    try {
        return uv.fs_read(fd, 16, 0, callback); // jshint ignore:line
    } catch (e) {
        handler(e);
    }
}

function readSync(fd) {
    try {
        return getFriendlyValue(uv.fs_read(fd, 16, 0).toString()); // jshint ignore:line
    } catch (e) {
        return -1;
    }
}

function readFromSysFile(fd, handler) {
    if (handler) {
        return readAsync(fd, handler);
    } else {
        return readSync(fd);
    }
}

module.exports = driver({
    attach: function (inputs) { // jshint ignore:line
        var mode = parseInt('0666', 8);
        kernelModule.install('dht11');
        this.temperatureFd = uv.fs_open('/sys/devices/dht11/iio\:device0/in_temp_input', 'r', mode); // jshint ignore:line
        this.humidityFd = uv.fs_open('/sys/devices/dht11/iio\:device0/in_humidityrelative_input', 'r', mode); // jshint ignore:line
    },

    detach: function () {
        try {
            uv.fs_close(this.temperatureFd); // jshint ignore:line
            uv.fs_close(this.humidityFd); // jshint ignore:line
        } finally {
            // Anyway it should be removed
            kernelModule.remove('dht11');
        }
    },

    exports: {
        getTemperature: function(handler) {
            return readFromSysFile(this.temperatureFd, handler);
        },

        getHumidityRelative: function(handler) {
            return readFromSysFile(this.humidityFd, handler);
        }
    },

    states: {
        temperature: function() {
            return readFromSysFile(this.temperatureFd);
        },

        humidityRelative: function() {
            return readFromSysFile(this.humidityFd);
        }
    }
});
