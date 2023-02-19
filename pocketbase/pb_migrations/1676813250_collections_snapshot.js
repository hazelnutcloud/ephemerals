migrate((db) => {
  const snapshot = [
    {
      "id": "_pb_users_auth_",
      "created": "2023-02-18 14:06:08.773Z",
      "updated": "2023-02-18 14:06:08.773Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null
          }
        }
      ],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    },
    {
      "id": "crano11hkpkofl6",
      "created": "2023-02-18 15:48:46.315Z",
      "updated": "2023-02-19 08:45:17.662Z",
      "name": "stages",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ijaigzgq",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "pac4yhgj",
          "name": "owner",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": true,
            "maxSelect": 1,
            "displayFields": [
              "username"
            ]
          }
        },
        {
          "system": false,
          "id": "zlghyvtp",
          "name": "status",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "updating",
              "ready"
            ]
          }
        },
        {
          "system": false,
          "id": "7k3vwz6i",
          "name": "code",
          "type": "file",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "application/zip",
              "application/x-7z-compressed",
              "application/x-rar-compressed",
              "application/gzip"
            ],
            "thumbs": []
          }
        }
      ],
      "listRule": "@request.auth.id = owner.id",
      "viewRule": "@request.auth.id = owner.id",
      "createRule": "@request.auth.id = owner.id",
      "updateRule": "@request.auth.id = owner.id",
      "deleteRule": "@request.auth.id = owner.id",
      "options": {}
    },
    {
      "id": "cbe8lffuxlgn3p1",
      "created": "2023-02-18 15:49:32.516Z",
      "updated": "2023-02-19 09:53:10.106Z",
      "name": "ephemerals",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "n7ygvpr2",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "muwg8rur",
          "name": "stage",
          "type": "relation",
          "required": true,
          "unique": false,
          "options": {
            "collectionId": "crano11hkpkofl6",
            "cascadeDelete": true,
            "maxSelect": 1,
            "displayFields": [
              "id"
            ]
          }
        },
        {
          "system": false,
          "id": "tjw0q2sm",
          "name": "source_type",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "evm_event_log",
              "evm_contract_call",
              "evm_block"
            ]
          }
        }
      ],
      "listRule": "@request.auth.id = stage.owner.id",
      "viewRule": "@request.auth.id = stage.owner.id",
      "createRule": "@request.auth.id = stage.owner.id",
      "updateRule": "@request.auth.id = stage.owner.id",
      "deleteRule": "@request.auth.id = stage.owner.id",
      "options": {}
    },
    {
      "id": "bek1nmrtclnj21l",
      "created": "2023-02-18 15:52:30.063Z",
      "updated": "2023-02-19 11:03:55.105Z",
      "name": "evm_event_log_sources",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "6o13ba3x",
          "name": "abi",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "s6hcq8wz",
          "name": "topic0",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "m3sinxm4",
          "name": "ephemeral",
          "type": "relation",
          "required": true,
          "unique": true,
          "options": {
            "collectionId": "cbe8lffuxlgn3p1",
            "cascadeDelete": true,
            "maxSelect": 1,
            "displayFields": [
              "name"
            ]
          }
        },
        {
          "system": false,
          "id": "h82rfbau",
          "name": "topic1",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": "^0x"
          }
        },
        {
          "system": false,
          "id": "vqxftvzi",
          "name": "topic2",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": "^0x"
          }
        },
        {
          "system": false,
          "id": "xul2oltr",
          "name": "topic3",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": "0x"
          }
        },
        {
          "system": false,
          "id": "rd15n0ge",
          "name": "chains",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "ethereum"
            ]
          }
        },
        {
          "system": false,
          "id": "blwyb8i6",
          "name": "addresses",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        }
      ],
      "listRule": null,
      "viewRule": null,
      "createRule": "@request.auth.id = ephemeral.stage.owner.id",
      "updateRule": null,
      "deleteRule": null,
      "options": {}
    },
    {
      "id": "xyhq45po1y6a82x",
      "created": "2023-02-19 12:33:57.021Z",
      "updated": "2023-02-19 13:11:54.072Z",
      "name": "evm_contract_call_sources",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "fybodej5",
          "name": "selector",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": 10,
            "max": 10,
            "pattern": "^0x"
          }
        },
        {
          "system": false,
          "id": "yz2e4gxx",
          "name": "chains",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "ethereum"
            ]
          }
        },
        {
          "system": false,
          "id": "lezv1rb6",
          "name": "addresses",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "lklyuykv",
          "name": "senders",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "pynrgzzm",
          "name": "abi",
          "type": "json",
          "required": false,
          "unique": false,
          "options": {}
        },
        {
          "system": false,
          "id": "g4effcik",
          "name": "ephemeral",
          "type": "relation",
          "required": true,
          "unique": true,
          "options": {
            "collectionId": "cbe8lffuxlgn3p1",
            "cascadeDelete": true,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id = ephemeral.stage.owner.id",
      "viewRule": "@request.auth.id = ephemeral.stage.owner.id",
      "createRule": "@request.auth.id = ephemeral.stage.owner.id",
      "updateRule": "@request.auth.id = ephemeral.stage.owner.id",
      "deleteRule": "@request.auth.id = ephemeral.stage.owner.id",
      "options": {}
    },
    {
      "id": "icy776dflosoe9b",
      "created": "2023-02-19 13:14:58.807Z",
      "updated": "2023-02-19 13:15:28.881Z",
      "name": "evm_block_sources",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "eo8d5an9",
          "name": "chain",
          "type": "select",
          "required": true,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "values": [
              "ethereum"
            ]
          }
        },
        {
          "system": false,
          "id": "o0ggo2ze",
          "name": "interval",
          "type": "number",
          "required": true,
          "unique": false,
          "options": {
            "min": 1,
            "max": null
          }
        },
        {
          "system": false,
          "id": "itduvpxm",
          "name": "ephemeral",
          "type": "relation",
          "required": true,
          "unique": true,
          "options": {
            "collectionId": "cbe8lffuxlgn3p1",
            "cascadeDelete": true,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "listRule": "@request.auth.id = ephemeral.stage.owner.id",
      "viewRule": "@request.auth.id = ephemeral.stage.owner.id",
      "createRule": "@request.auth.id = ephemeral.stage.owner.id",
      "updateRule": "@request.auth.id = ephemeral.stage.owner.id",
      "deleteRule": "@request.auth.id = ephemeral.stage.owner.id",
      "options": {}
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
