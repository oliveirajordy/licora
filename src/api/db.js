import PouchDB from 'pouchdb-browser'

class DB {

    constructor(db) {
        this._dataBase = new PouchDB(db)
        this.deleteDb = this.deleteDb.bind(this)
    }

    async getAllLists() {
        const resp = await this._dataBase.allDocs({ include_docs: true })
        if (resp.total_rows > 0) {
            const docs = resp.rows.map(doc => doc.doc)
            docs.sort((a, b) => {
                return (Date.parse(b.listDate) - Date.parse(a.listDate))
            })
            return docs
        }
    }

    async saveDoc(doc, list) {
        this._dataBase.put(doc)
            .then(res => {
                const dbList = new PouchDB(res.id)
                dbList.bulkDocs(list)
            })
            .catch(err => err)
    }

    async deleteDb(dbName) {
        new PouchDB(dbName).destroy()
            .then(() => {
                console.log(this._dataBase, dbName)
                this._dataBase.get(dbName)
                    .then((resp) => this._dataBase.remove(resp))
            })
            .catch(err => err)
    }

}

export default DB