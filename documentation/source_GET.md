# Tsunami Data Resources

GET sources

## Description

Returns all tsunami sources in the database

***

## Parameters

To return a single source by id. Follow below format:

```
/api/v1/sources/:SOURCE_ID
```

***

## Return format
An array of objects with the following keys and values:


- **SOURCE_ID** — Unique id of the source.
- **YEAR** — Year the source was first discovered.
- **MONTH** — Month the source was first discovered.
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

Errors 404 and 500 will return in the format:

```
{
    "error": "Error message"
}
```

***

## Example
**Request**

   GET api/v1/sources/

**Returns**
__Below is a shortened example of the response__

``` [
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
    },
    {
        "SOURCE_ID": "5570",
        "YEAR": "1607",
        "MONTH": "1",
        "COUNTRY": "UK",
        "STATEPROVINCE": null,
        "LOCATION": "BRISTOL CHANNEL, ENGLAND",
        "LATITUDE": "51.5",
        "LONGITUDE": "-2.7",
        "MAXIMUM_HEIGHT": "",
        "FATALITIES": "2000",
        "FATALITY_ESTIMATE": "4",
        "ALL_DAMAGE_MILLIONS": "",
        "DAMAGE_ESTIMATE": "3",
        "created_at": "2017-10-12T23:00:52.999Z",
        "updated_at": "2017-10-12T23:00:52.999Z"
    },
    {
        "SOURCE_ID": "5520",
        "YEAR": "1839",
        "MONTH": "",
        "COUNTRY": "NEW ZEALAND",
        "STATEPROVINCE": null,
        "LOCATION": "WAIKAWA, SOUTHLAND",
        "LATITUDE": "-46.627",
        "LONGITUDE": "169.126",
        "MAXIMUM_HEIGHT": "",
        "FATALITIES": "",
        "FATALITY_ESTIMATE": "",
        "ALL_DAMAGE_MILLIONS": "",
        "DAMAGE_ESTIMATE": "",
        "created_at": "2017-10-12T23:00:53.074Z",
        "updated_at": "2017-10-12T23:00:53.074Z"
    }, ...]
```
