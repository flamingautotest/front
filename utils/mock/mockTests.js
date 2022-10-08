const mockTestsJson = JSON.parse(`{
    "id": "3456789-GHJKLMC-567890-VGBHJKLOD",
    "url": "https://jsonapi.com",
    "name": "Get some fake data from the JSON placeholder API",
    "testActions": [
      {
        "description": "Make sure we have the right ID",
        "request": {
          "path": "/posts/1",
          "method": "GET"
        },
        "expectedResponse": {
          "statusCode": 200,
          "json": {
            "id": 1,
            "userId": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehender"
          }
        }
      },
      {
        "description": "Make sure number is returned correctly",
        "request": {
          "path": "/v1.0/{accountId}/instances",
          "parameters": [
            {
              "name": "accountId",
              "required": true,
              "in": "path",
              "type": "string",
              "description": "The account ID of the owner of the specified instance.",
              "value": "toto"
            }
          ],
          "method": "POST",
          "headers": {
            "content-type": "application/json"
          }
        },
        "expectedResponse": {
          "statusCode": 200,
          "json": {
            "osef": {
              "osef": "BUILD",
              "updated": "2012-01-25T21:53:10.000Z"
            }
          }
        }
      }
    ]
  }`)
  
  export default mockTestsJson