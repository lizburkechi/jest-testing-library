// export default class Model {
//     constructor(data = []) {
//         this.$collection = []

//         if(data.length)
//             this.record(data)
//     }
//     record(data) {
//         this.$collection.push(...data)
//     }       
//     all() {
//         return this.$collection          // 2. return the collection
//     }
//     find() {}
//     update() {}
// }

export default class Model {
    constructor(data = []) {
        this.$collection = []
                                                        
        if(data.length)
            this.record(data)
        }
        record(data) {
            this.$collection.push(...data)
        }       
        all() {                                     // 5. Map will iterate over the array and in the process return a new array
            return this.$collection.map(entry => Object.assign( {}, entry) ) // Object.assign() allows us to merge two objects
        }                                                                      // so we can just merge the entry with an empty object
        find() {}
        update() {}
    }