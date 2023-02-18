migrate((db) => {
  const collection = new Collection({
    "id": "cbe8lffuxlgn3p1",
    "created": "2023-02-18 15:49:32.516Z",
    "updated": "2023-02-18 15:49:32.516Z",
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
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("cbe8lffuxlgn3p1");

  return dao.deleteCollection(collection);
})
