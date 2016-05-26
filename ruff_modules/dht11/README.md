# Light Intensity Sensor Driver

## Description
This is the driver for light intensity sensor e.g. DHT11

This driver provides ambient temperature and relative humidity around sensor.


## Support Devices

[DHT11](http://rap.ruff.io/devices/dht11)

## Usage

* Query temperature

```javascript
    $('#dht11').getTemperature(function(err, value) {
        console.log(value);
    });
```

* Query relative humidity

```javascript
    $('#dht11').getHumidityRelative(function(err, value) {
        console.log(value);
    });
```

## API

* **getTemperature(callback)**
  - `callback <Function>`:

  The callback get two arguments (err, value), Value is celsius degree of temperature; If it failed to read value, the *err* will carry message;

* **getHumidityRelative(callback)**
  - `callback <Function>`:

  The callback get two arguments (err, value), Value is relative humidity; If it failed to read value, the *err* will carry message;
