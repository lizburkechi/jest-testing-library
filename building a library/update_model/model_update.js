export default class Model {
    constructor(data = []) {
        this.$collection = []
                                                        
        if(data.length)
            this.record(data)
        }
        record(data) {
            const primaryKey = 'id'                                 //4. Update record method to make sure each item in the array has an id
            const mappedData = data.map(entry => {
                if(entry[primaryKey]) return entry          // if there is no id then we should assign one
                entry[primaryKey] = Date.now()              // << in real life this should assign to a random number
                return entry
            })
            this.$collection.push(...mappedData)
        } 
        all() { 
            return this.$collection.map(entry => Object.assign( {}, entry) ) 
        }

        update(key, data) {
            const primaryKey = 'id'                                         // 2. id is a unique key to filter by so we can call it the primaryKey
            const index = this.$collection.findIndex(entry => entry
                [primaryKey] === key)
                if (index < 0) return false
                this.$collection.splice(index, 1, Object.assign(this.$collection
                [index], data))
        }

        find(key) {
            const primaryKey = 'id'                                         // 2. id is a unique key to filter by so we can call it the primaryKey
            const entry = this.$collection.find(entry => entry[primaryKey] 
                === key)                                                  // 3. Next we need to find the correct entry. We can use the native 
                                                                            // array find method. It will loop through each entry and see if the 
            return entry ? Object.assign({}, entry) : null                  // names match. If there is an entry we need to copy it and return it
        }

        
    }