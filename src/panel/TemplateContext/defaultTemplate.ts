export const defaultTemplate = `{
  "actions": [
    {
      "click": {
        "query": [["button"]]
      }
    },
    {
      "click": {
        "query": [["button"]]
      }
    },
    {
      "waitfor": {
        "query": [["h1"]]
      }
    },
    {
      "select": [ 
        {
          "name": "name",
           "query": [["h1"]]
        },
        {
          "name": "description",
          "query": [["p"]]
        },
        {
          "name": "foo",
          "type": "number",
          "query": [[]]
        },
        {
          "name": "bar",
          "type": "boolean",
          "required": true,
          "query": [[]]
        },
        {
          "name": "baz",
          "type": "object",
          "repeated": true,
          "required": true,
          "query": [[]]
        }
      ]
    },
    {
      "waitfor": {
        "query": [["h1"]]
      }
    },
    {
      "select": [ 
        {
          "name": "description",
          "query": [["p"]]
        }
      ]
    }  
  ]
}`;