migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bek1nmrtclnj21l")

  // update
  collection.schema.addField(new SchemaField({
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
        "address",
        "chain"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bek1nmrtclnj21l")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
