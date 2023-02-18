migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cbe8lffuxlgn3p1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hdrimm8x",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cbe8lffuxlgn3p1")

  // remove
  collection.schema.removeField("hdrimm8x")

  // remove
  collection.schema.removeField("tjw0q2sm")

  return dao.saveCollection(collection)
})
