# Tsunami Data Resources

POST sources

## Description

Adds a tsunami source to the database and returns the tsunami source you posted

***

## POST format
To create a new source, one must send an object with the following keys and values:


- **SOURCE_ID** — Unique id of the source.
- **YEAR** — Year the source was first discovered.
- **MONTH** — Month the source was first discovered.
- **COUNTRY** — Country where the source was first discovered.
- **STATEPROVINCE** — State/Province where the source was first discovered.
- **LOCATION** — Location where the source was first discovered.
- **LATITUDE** — Latitude where the source was first discovered.
- **LONGITUDE** — Longitude where the source was first discovered.
- **MAXIMUM_HEIGHT** — The maximum height that all waves from this source reached.
- **FATALITIES** — The number of fatalities caused by all waves from this source.
- **FATALITY_ESTIMATE** — The estimated number of fatalities caused by all waves from this source.
- **ALL_DAMAGE_MILLIONS** — The dollar amount of damage caused by all waves from this source.
- **DAMAGE_ESTIMATE** — The estimated dollar amount of damage caused by all waves from this source.

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

   POST api/v1/sources/

**Returns**

201 status code

```
[
  {
    "SOURCE_ID": "5556",
    "YEAR": "1341",
    "MONTH": "1",
    "COUNTRY": "UKRAINE",
    "STATEPROVINCE": null,
    "LOCATION": "CRIMEA",
    "LATITUDE": "44.3",
    "LONGITUDE": "34.3",
    "MAXIMUM_HEIGHT": "",
    "FATALITIES": "",
    "FATALITY_ESTIMATE": "",
    "ALL_DAMAGE_MILLIONS": "",
    "DAMAGE_ESTIMATE": "",
    "created_at": "2017-10-12T23:00:52.991Z",
    "updated_at": "2017-10-12T23:00:52.991Z"
  }
]
```
