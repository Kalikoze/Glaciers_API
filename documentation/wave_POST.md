# Tsunami Data Resources

POST waves

## Description

Adds a wave source to the database and returns the wave source you posted

***

## POST format
To create a new wave, one must send an object with the following keys and values:


- **WAVE_ID** — Unique id of the wave.
- **SOURCE_ID** — Unique id of the wave.
- **YEAR** — Year the wave hit.
- **MONTH** — Month the wave hit.
- **LOCATION** — Location where the wave hit.
- **MAXIMUM_HEIGHT** — The maximum height wave reached.
- **FATALITIES** — The number of fatalities caused by this wave.
- **FATALITY_ESTIMATE** — The estimated number of fatalities caused by this wave.
- **ALL_DAMAGE_MILLIONS** — The dollar amount of damage caused by this wave.
- **DAMAGE_ESTIMATE** — The estimated dollar amount of damage caused by this wave.

***

## Errors

Errors 422 and 500 will return in the format:

```
{
    "error": "Error message"
}
```

***

## Example
**Request**

   POST api/v1/waves/

**Returns**

201 status code

```
[
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
]
```
