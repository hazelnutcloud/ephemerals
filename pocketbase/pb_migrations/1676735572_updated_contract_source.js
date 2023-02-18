migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iz27q1lsp9msta")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "siz8bf5x",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4iz27q1lsp9msta")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
