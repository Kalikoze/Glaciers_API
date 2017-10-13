# Tsunami Data Resources

GET waves

## Description

Returns all tsunami waves in the database

***

## Parameters

To return a single wave by id, follow format:

```
/api/v1/waves/:SOURCE_ID
```

To return all waves in a year, follow format below:

```
/api/v1/waves?year=2016
```

***

## Return format
An array of objects with the following keys and values:


- **WAVE_ID** — Unique id of the wave.
- **SOURCE_ID** — Unique id of the wave.
- **YEAR** — Year the wave hit.
- **MONTH** — Month the wave hit.
- **MONTH** — Month the wave hit.
- **LOCATION** — Location where the wave hit.
- **MAXIMUM_HEIGHT** — The maximum height wave reached.
- **FATALITIES** — The number of fatalities caused by this wave.
- **FATALITY_ESTIMATE** — The estimated number of fatalities caused by this wave.
- **ALL_DAMAGE_MILLIONS** — The dollar amount of damage caused by this wave.
- **DAMAGE_ESTIMATE** — The estimated dollar amount of damage caused by this wave.

***

## Errors

Errors 404 and 500 will return in the format:

```
{
    "error": "Error message"
}
```

***

## Example
**Request**

   GET api/v1/waves?year=2013

**Returns**
__Below is a shortened example of the response__

``` [
{
    "WAVE_ID": "28688",
    "SOURCE_ID": "5519",
    "YEAR": "2013",
    "MONTH": "8",
    "LOCATION": "KAIKOURA",
    "MAXIMUM_HEIGHT": "0.08",
    "FATALITIES": "",
    "FATALITY_ESTIMATE": "",
    "ALL_DAMAGE_MILLIONS": null,
    "DAMAGE_ESTIMATE": "",
    "created_at": "2017-10-12T23:00:55.589Z",
    "updated_at": "2017-10-12T23:00:55.589Z"
},
{
    "WAVE_ID": "28728",
    "SOURCE_ID": "5533",
    "YEAR": "2013",
    "MONTH": "10",
    "LOCATION": "KUJIKO",
    "MAXIMUM_HEIGHT": "0.4",
    "FATALITIES": "",
    "FATALITY_ESTIMATE": "",
    "ALL_DAMAGE_MILLIONS": null,
    "DAMAGE_ESTIMATE": "",
    "created_at": "2017-10-12T23:00:55.980Z",
    "updated_at": "2017-10-12T23:00:55.980Z"
},
{
    "WAVE_ID": "29556",
    "SOURCE_ID": "5555",
    "YEAR": "2014",
    "MONTH": "3",
    "LOCATION": "TOCOPILLA",
    "MAXIMUM_HEIGHT": "0.07",
    "FATALITIES": "",
    "FATALITY_ESTIMATE": "",
    "ALL_DAMAGE_MILLIONS": null,
    "DAMAGE_ESTIMATE": "",
    "created_at": "2017-10-12T23:00:55.987Z",
    "updated_at": "2017-10-12T23:00:55.987Z"
}, ...]
```
