migrate((db) => {
  const collection = new Collection({
    "id": "crano11hkpkofl6",
    "created": "2023-02-18 15:48:46.315Z",
    "updated": "2023-02-18 15:48:46.315Z",
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
  const collection = dao.findCollectionByNameOrId("crano11hkpkofl6");

  return dao.deleteCollection(collection);
})
