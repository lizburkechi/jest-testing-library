import Model from './model_all'

test('new works', () => {
    expect(new Model).toBeInstanceOf(Model)
})

test('model structure', () => {
    expect(new Model).toEqual(expect.objectContaining({ 
        $collection: expect.any(Array),
        record: expect.any(Function),
        all: expect.any(Function),
        find: expect.any(Function),
        update: expect.any(Function), 
    })) 
})

describe('record', () => {
    const heroes = [{name: 'Batman'}, {name: 'Black Panther'}]

    test('can add data to the collection', () => {    
        const model = new Model()
        model.record(heroes)
        expect(model.$collection).toEqual(heroes)
    })

    test('gets called when data is passed to Model', () => {
        const spy = jest.spyOn(Model.prototype, 'record') 
        const model = new Model(heroes)
        expect(spy).toHaveBeenCalled()
        spy.mockRestore()
    })

})

describe('all', () => {
    test('returns empty model', () => {
        const model = new Model()
        expect(model.all()).toEqual([])      
    })
    test('returns model data', () => {
        const model = new Model([{ name: 'Batman' }, { name: 'Joker' }])
        expect(model.all().length).toBe(2)
    })

    test('original data stays intact', () => {
        const model = new Model([{ name: 'Batman' }])    // 3. create a model with some data
        const data = model.all()                        // 4. to test the returned data from 'all' method 
        data[0].name = 'Joker'                         //  we'll store it in a variable and alter the entry to see if the original
                                                    // data still shows Batman as the first item in the array.
    })                                                 // The test fails because we have changed the original array. We need to change
})                                                     // model to receive a copy of the array which we can do using map and Object.assign
                                                        