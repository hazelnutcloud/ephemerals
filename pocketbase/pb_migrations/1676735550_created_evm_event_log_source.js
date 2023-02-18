migrate((db) => {
  const collection = new Collection({
    "id": "bek1nmrtclnj21l",
    "created": "2023-02-18 15:52:30.063Z",
    "updated": "2023-02-18 15:52:30.063Z",
    "name": "evm_event_log_source",
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
        "id": "bxvlbdiq",
        "name": "topic",
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
        "id": "e7jvvd4a",
        "name": "contracts",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "4iz27q1lsp9msta",
          "cascadeDelete": false,
          "maxSelect": null,
          "displayFields": [
            "address"
          ]
        }
      },
      {
        "system": false,
        "id": "l8r79z7a",
        "name": "chains",
        "type": "select",
        "required": false,
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
        "id": "q7borrgp",
        "name": "filters",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
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
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("bek1nmrtclnj21l");

  return dao.deleteCollection(collection);
})
