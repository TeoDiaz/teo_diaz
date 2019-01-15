# MessageApp
***
#### This is the definitive guide to use this amazing API
 
Send all request to: 
```
http://localhost:9001
```
*Paths:*

|  Path | Method  | Response  | Content-type|  Request Required|
|---|---|---|---|---|
|   /| Get  |  This is my first, 'Hello World' | | No   
|   /messages| Get  | All messages on DataBase ||No
| /messages  |  Post | OK |'application/json'  |Yes
|/credit|Post|Now your credit is: "credit"|'aplication/json|Yes


<details open><summary>/messages Post Request Details</summary> 

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

Cost of message 1€

*If error sending message, credit retuns to client 
```
</details>

<details><summary>/credit Post Request Details</summary> 

```
Request: 

{
  "amount": Number
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
Message Post Errors:

  You can't provide an empty field
  Numbers are not allowed
  Destination or Body fields missing
  Destination name or message text had exceed the length limit

Amount Error:
  No credit avalible
```
Status 500:
```
Internal Server error
Error sending message
```
