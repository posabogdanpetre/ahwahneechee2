const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('"Find a Patagonia store near me" returns stores with directions URLs', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        const firstStore = out.structuredContent.stores[0]
        expect(firstStore).toHaveProperty('name')
        expect(firstStore).toHaveProperty('address')
        expect(firstStore).toHaveProperty('phone')
        expect(firstStore).toHaveProperty('directions_url')
        expect(firstStore.directions_url).toMatch(/^https:\/\/www\.google\.com\/maps\/search\//)
    })

    test('filters stores by city', async () => {
        const out = await handler({ city: 'Manchester' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        expect(stores.some(s => s.name.toLowerCase().includes('manchester'))).toBe(true)
    })

    test('returns all stores when no filter provided', async () => {
        const out = await handler({})
        expect(out.structuredContent.stores.length).toBe(2)
        expect(out.content[0].text).toMatch(/Found 2 Patagonia stores/)
    })

    test('returns empty array when no stores match city', async () => {
        const out = await handler({ city: 'NonexistentCity' })
        expect(out.structuredContent.stores.length).toBe(0)
        expect(out.content[0].text).toMatch(/No Patagonia stores found/)
    })
})
