# Tsunami Data Resources

PATCH waves

## Description

Update properties of a tsunami source in the database

***

## Parameters

To update a source, follow below format:

```
/api/v1/waves/:SOURCE_ID
```

***

## PATCH format
Any of these properties can be updated by passing them in through the body.


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

   PATCH api/v1/waves/1

 ```
	 {
		"SOURCE_ID": "1",
		"WAVE_ID": "1",
		"YEAR": "1999",
		"MONTH": "1",
		"COUNTRY": "USA",
		"STATEPROVINCE": "COLORADO",
		"MAXIMUM_HEIGHT": "1000",
		"FATALITIES": "999",
		"FATALITY_ESTIMATE": "",
		"ALL_DAMAGE_MILLIONS": "1000000",
		"DAMAGE_ESTIMATE": ""
	 }

```

**Returns**

```
	{
		"SOURCE_ID": "1",
		"WAVE_ID": "1",
		"YEAR": "1999",
		"MONTH": "1",
		"COUNTRY": "USA",
		"STATEPROVINCE": "COLORADO",
		"MAXIMUM_HEIGHT": "1000",
		"FATALITIES": "999",
		"FATALITY_ESTIMATE": "",
		"ALL_DAMAGE_MILLIONS": "1000000",
		"DAMAGE_ESTIMATE": ""
		"created_at": "2017-10-12T23:00:55.987Z",
		"updated_at": "2017-10-12T23:02:55.987Z"
	}

```
