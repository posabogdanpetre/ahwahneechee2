const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.stores is an array', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/location|provide/i)
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ location: 'Manchester' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.structuredContent.stores[0]).toHaveProperty('name')
        expect(out.structuredContent.stores[0]).toHaveProperty('address')
        expect(out.structuredContent.stores[0]).toHaveProperty('phone')
    })

    test('filters stores by location query', async () => {
        const out = await handler({ location: 'Bristol' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBe(1)
        expect(stores[0].name).toBe('Patagonia Bristol')
    })

    test('returns empty stores array when no match found', async () => {
        const out = await handler({ location: 'InvalidCity' })
        expect(out.structuredContent.stores).toEqual([])
        expect(out.content[0].text).toMatch(/No.*stores found/i)
    })

    test('search is case-insensitive', async () => {
        const out = await handler({ location: 'MANCHESTER' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    })
})
