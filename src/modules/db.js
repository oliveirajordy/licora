import PouchDB from 'pouchdb-browser'

class DB {

    constructor(db) {
        this._dataBase = new PouchDB(db)
        this.getAllDoc = this.getAllDoc.bind(this)
        this.saveDoc = this.saveDoc.bind(this)
        this.deleteDb = this.deleteDb.bind(this)
    }

    getAllDoc() {
        const promise = new Promise(
            (resolve, reject) => {
                this._dataBase.allDocs({ include_docs: true })
                    .then(resp => {
                        if (resp.total_rows > 0) {
                            const docs = resp.rows.map(doc => doc)
                            resolve(docs)
                        } else {
                            resolve(resp)
                        }
                    })
                    .catch(err => console.log(err))
            }
        )
        return promise
    }

    saveDoc(doc, list) {
        const promise = new Promise(
            (resolver, reject) => {
                this._dataBase.put(doc)
                    .then(resp => {
                        const dbList = new PouchDB(resp.id)
                        dbList.bulkDocs(list)
                            .then(resp => {
                                resolver && resolver()
                            })
                    })
                    .catch(err => console.log(err))
            }
        )
        return promise
    }

    deleteDb(dbName) {
        const promise = new Promise(
            (resolver, reject) => {
                new PouchDB(dbName).destroy()
                    .then(() => this._dataBase.get(dbName)
                        .then((resp) => this._dataBase.remove(resp)
                            .then(() => resolver && resolver())))
                    .catch(err => console.log(err))
            }
        )
        return promise
    }

}

export default DB