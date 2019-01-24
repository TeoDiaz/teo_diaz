# MessageApp
***
#### This is the definitive guide to use this amazing API
 
Request to: 
```
http://localhost:80
```
*Paths:*

|  Path | Method  | Response  | Content-type|  Request Required|
|---|---|---|---|---|
|   /| Get  |  This is my first, 'Hello World' | | No   
|   /messages| Get  | All messages on DataBase ||No
| /messages  |  Post | Your message is on queue with id: "Unique ID" |'application/json'  |Yes
|/messages/:id/status|Get|The status of your message is: "status"||No
|/health|Get|status:200||No

*/health path is defined for haproxy check function*

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

***

*Responses:*


Message Status:

*Status sending message:*
```
Pending
Error while saving paiment on Database
Not enough credit
No credit registered
Error while checking credit
Timeout: Message Sent without confirmation
```
*Success sending message*
```
Message sent
```

Message Get Errors:
```
Database is empty
```

Request to: 
```
http://localhost:9017
```
*Paths:*

|  Path | Method  | Response  | Content-type|  Request Required|
|---|---|---|---|---|
|/credit|Get|Your credit is: "credit"||No
|/credit|Post|Now your credit is: "credit"|'aplication/json|Yes

<details open><summary>/credit Post Request Details</summary> 

```
Request: 

{
  "amount": Number
}
```

</details>

Credit errors: 
```
No credit avalaible
```
