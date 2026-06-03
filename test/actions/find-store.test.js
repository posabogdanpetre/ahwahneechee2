const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object with stores array', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).toHaveProperty('stores')
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('returns error message when country is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/provide.*country/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('returns error message when country is empty string', async () => {
        const out = await handler({ country: '   ' })
        expect(out.content[0].text).toMatch(/provide.*country/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found \d+ Patagonia store/i)
    })

    test('filters by city when provided', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Manchester' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        const stores = out.structuredContent.stores
        expect(stores.some(s => s.name.toLowerCase().includes('manchester'))).toBe(true)
    })

    test('returns empty results for unknown country', async () => {
        const out = await handler({ country: 'Nonexistent Country' })
        expect(out.structuredContent.stores).toEqual([])
        expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
    })

    test('returns empty results for unknown city', async () => {
        const out = await handler({ country: 'United Kingdom', city: 'Nonexistent City' })
        expect(out.structuredContent.stores).toEqual([])
        expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
    })

    test('each store has required fields', async () => {
        const out = await handler({ country: 'United Kingdom' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        
        stores.forEach(store => {
            expect(store).toHaveProperty('name')
            expect(store).toHaveProperty('address')
            expect(store).toHaveProperty('phone')
            expect(store).toHaveProperty('directions_url')
            expect(typeof store.name).toBe('string')
            expect(typeof store.address).toBe('string')
            expect(typeof store.phone).toBe('string')
            expect(typeof store.directions_url).toBe('string')
        })
    })

    test('adds Google Maps directions URL when not present', async () => {
        const out = await handler({ country: 'United Kingdom' })
        const stores = out.structuredContent.stores
        
        stores.forEach(store => {
            expect(store.directions_url).toMatch(/google\.com\/maps/)
            expect(store.directions_url).toContain(encodeURIComponent(store.address))
        })
    })
})
