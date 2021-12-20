import Model from './model_custom'

function createModel(data = [], options = {}) {
    return new Model({
        ...options,
        data
    })
}

test('new works', () => {
    expect(createModel()).toBeInstanceOf(Model)
})

test('model structure', () => {
    expect(createModel()).toEqual(expect.objectContaining({ 
        $collection: expect.any(Array),
        $options: expect.objectContaining({
            primaryKey: 'id'
        }),
        record: expect.any(Function),
        all: expect.any(Function),
        find: expect.any(Function),
        update: expect.any(Function), 
    })) 
})

describe('customizations', () => {
    test('we can customize the primaryKey', () => {
        const model = createModel([], {
            primaryKey: 'name'
        })
        expect(model.$options.primaryKey).toBe('name')
    })
})

describe('record', () => {
    const heroes = [{id: 1, name: 'Batman'}, {name: 'Black Panther'}]

    test('can add data to the collection', () => {    
        const model = createModel()
        model.record(heroes)
        expect(model.$collection).toEqual([
            heroes[0],
            {
                id: expect.any(Number),
                name: heroes[1].name
            }
        ])
    })

    test('gets called when data is passed to Model', () => {
        const spy = jest.spyOn(Model.prototype, 'record') 
        const model = createModel(heroes)
        expect(spy).toHaveBeenCalled()
        spy.mockRestore()
    })

})

describe('all', () => {
    test('returns empty model', () => {
        const model = createModel()
        expect(model.all()).toEqual([])      
    })
    test('returns model data', () => {
        const model = createModel([{ name: 'Batman' }, { name: 'Joker' }])
        expect(model.all().length).toBe(2)
    })

    test('original data stays intact', () => {
        const model = createModel([{ name: 'Batman' }])
        const data = model.all()
        data[0].name = 'Joker'
    })                                                 
}) 

describe('find', () => {
    const heroes = [{ id: 1, name: 'Batman' }, { name: 'Black Panther' }]

    test('returns null if nothing matches', () => {  // 1. self explanitory
        const model = createModel()
        expect(model.find(1)).toEqual(null)
    })

    test('find returns a matching entry', () => {
        const model = createModel(heroes)
        expect(model.find(1)).toEqual(heroes[0])
    })
})

describe('update', () => {
    const heroesAndVillians = [{ id: 1, name: 'Batman' }]
    let model

    beforeEach(() => {
        const dataset = JSON.parse(JSON.stringify(heroesAndVillians))
        model = createModel(dataset)
    })

    test('an entry by id', () => {
        model.update(1, { name: 'Joker' })
        expect(model.find(1).name).toBe('Joker')
    })

    test('extend an entry by id', () => {
        model.update(1, { cape: true })
        expect(model.find(1)).toEqual(
        expect.objectContaining({
            name: 'Batman',
            cape: true
        })
        ) 
    })

    test('return false if no entry matches', () => {
        expect(model.update(2, {})).toBe(false)
    })
})