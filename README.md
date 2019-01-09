# MessageApp
***
#### This is the definitive guide to use this amazing API
 
Send all request to: 
```
http://<localhost:9001/messages>
```
*Methods:*

```
Method: post
Content-Type: 'application/json'
Request: 
{
  "destination": "STRING",
  "body": "STRING"
}

Required: Yes

Max length:
  "destination" = 50 characters
  "body" = 100 characters

Simple Example: 

{
  "destination": "User1",
  "body": "Hello World"
}
```

*Response:*

Status 200:
```
OK
```
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