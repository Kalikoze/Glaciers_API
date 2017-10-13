# Tsunami Data Resources

DELETE waves

## Description

Deletes a specified tsunami wave

***

## Parameters

To DELETE a single wave by id. Follow below format:

```
/api/v1/waves/:WAVE_ID
```

***

## Return format
Returns a 204 status


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

   DELETE api/v1/waves/1

**Returns**

```
204 No Content
```
