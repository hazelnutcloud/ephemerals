migrate((db) => {
  const collection = new Collection({
    "id": "4iz27q1lsp9msta",
    "created": "2023-02-18 14:45:37.101Z",
    "updated": "2023-02-18 14:45:37.101Z",
    "name": "contract_source",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9vja0njn",
        "name": "address",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 42,
          "max": 42,
          "pattern": "^0x"
        }
      },
      {
        "system": false,
        "id": "siz8bf5x",
        "name": "field",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "ethereum"
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
  const collection = dao.findCollectionByNameOrId("4iz27q1lsp9msta");

  return dao.deleteCollection(collection);
})
