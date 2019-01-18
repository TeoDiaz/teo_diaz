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
| /messages  |  Post | Your message is on queue with id: "Unique ID" |'application/json'  |Yes
}/messages/:id/status|Get|The status of your message is: "status"||No
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

Message Status:

*Errors sending message:*
```
Error sending message
Timeout: Message Sent without confirmation
Error: No credit available
```
*Success sending message*
```
Message sent
```
