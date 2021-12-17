// 1. export a class, so we can test it afterwards.

// export default class Model {
//     constructor() {                // 6. to assign values to our model we need an constructor (tests green)
//         this.$collection = []
//     }
//     record() {}                 // 8. Now update class to make test pass
//     all() {}
//     find() {}
//     update() {}
// }


// export default class Model {
//     constructor() {                
//         this.$collection = []
//     }
//     record(data) {                      //12. implement record method, it will need to accept an arg (data)
//         this.$collection.push(...data) //12a. use Array.push method REMEMBER: the data is an array!
//     }       
//     all() {}
//     find() {}
//     update() {}
// }

export default class Model {
    constructor(data = []) { //13. accept an arg and set a default 
        this.$collection = []

        if(data.length)         //14. call the record method if data is passed along
            this.record(data)
    }
    record(data) {
        this.$collection.push(...data)
    }       
    all() {}
    find() {}
    update() {}
}

