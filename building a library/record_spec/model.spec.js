//  2. Start by importing the file you care for
import Model from './model'


//  3. To have our first spec, let's check the instantiation.
test('new works', () => {
    expect(new Model).toBeInstanceOf(Model)
})

//  4. Run first test in watch mode:     yarn jest --watch model


//  5. Match the structure and create an outline for our model class
//     We would eventually need a place to store all values of our model (collection) 
//     Prefix it with a $ to mark it as an internal property
//     Upon save tests will fail so we need to assign some values to our model in model.js

test('model structure', () => {
    expect(new Model).toEqual(expect.objectContaining({ //  9. add (expect objectContaining)
        $collection: expect.any(Array), // 7. We need a way to record and update items 
        record: expect.any(Function),  // & not use collection directly so we need a way to 
        all: expect.any(Function),   //  < use all elements from the array or just one
        find: expect.any(Function),  // < way to search for one specific value in collection
        update: expect.any(Function), // < way to update values
    })) //  9. [ add ) here to fix syntax. ]  This checks all key value pairs of object.
})

//      10. Start to structure test by using describe block.
//          We want to describe the functionality of record first

// describe('record', () => {
//     test('can add data to the collection', () => {                   // 11. test record function by adding some data
//         const heroes = [{name: 'Batman'}, {name: 'Black Panther'}]   // < start by defining some data
//         const model = new Model()                                   // < test by creating a new model           
//         model.record(heroes)                                       // < then record some data
//         expect(model.$collection).toEqual(heroes)                   // this will fail until we update model class
//     })

//     test('gets called when data is passed to Model', () => {
    
//     })


// })


describe('record', () => {
    const heroes = [{name: 'Batman'}, {name: 'Black Panther'}]  //. We can use same test data by moving heroes into describe block

    test('can add data to the collection', () => {    
        const model = new Model()
        model.record(heroes)
        expect(model.$collection).toEqual(heroes)
    })

    test('gets called when data is passed to Model', () => {
        const spy = jest.spyOn(Model.prototype, 'record')   //  15. Set up spy (before you use it!) must be called on an object
        const model = new Model(heroes)                    // set to point at the .prototype (object) and not the Model class (not an object)
        expect(spy).toHaveBeenCalled()                    // Verify that the spyOn method gets called
        // expect(model.$collection).toEqual(heroes)
        spy.mockRestore()                                 // And then remove spy! best practice
    })


})

//  16. The final step is to remove expect(model.$collection).toEqual(heroes) from last equation 
// because we have already verified this in the previous tests
