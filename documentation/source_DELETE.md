# Tsunami Data Resources

DELETE sources

## Description

Deletes specified tsunami source and all waves originating at the source from the database

***

## Parameters

To DELETE a single source by id. Follow below format:

```
/api/v1/sources/:SOURCE_ID
```

***

## Return format
Returns a 204 status


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

   DELETE api/v1/sources/1

**Returns**

```
204 No Content
```
