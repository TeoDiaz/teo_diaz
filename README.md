# MessageApp
***
#### This is the definitive guide to use this amazing API
 
Send all request to: 
```
http://localhost:9001
```
*Methods:*

|  Method | Path  | Response  |   
|---|---|---|
|   Get| /  |  This is my first, 'Hello World' |   |  
|   Get| /messages  | All messages on DataBase 

|  Method | Path  | Content-Type  |  Required|
|---|---|---|---|
| Post  |  /messages | 'application/json'  |Yes

<details open><summary> Post Request Details</summary> 

```
Request: 

{
  "destination": "STRING",
  "body": "STRING"
}

Max length:
  "destination" = 50 characters
  "body" = 100 characters

Simple Example: 

{
  "destination": "User1",
  "body": "Hello World"
}
```
</details>

***

*Responses:*

Status 200:
```
OK
```

*ERRORS:* 

Status 400:
```
You can't provide an empty field
Numbers are not allowed
Destination or Body fields missing
Destination name or message text had exceed the length limit
```
Status 500:
```
Internal Server error
```
