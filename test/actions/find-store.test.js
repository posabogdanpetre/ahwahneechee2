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

    test('structuredContent.locations is an array', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(Array.isArray(out.structuredContent.locations)).toBe(true)
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ country: 'United Kingdom' })
        expect(out.structuredContent.locations.length).toBeGreaterThan(0)
        const firstLocation = out.structuredContent.locations[0]
        expect(firstLocation).toHaveProperty('name')
        expect(firstLocation).toHaveProperty('address')
        expect(firstLocation).toHaveProperty('phone')
        expect(firstLocation).toHaveProperty('directions_url')
    })

    test('filters by city when provided', async () => {
        const out = await handler({ city: 'Manchester' })
        const locations = out.structuredContent.locations
        expect(locations.length).toBeGreaterThan(0)
        expect(locations.every(l => l.address.toLowerCase().includes('manchester'))).toBe(true)
    })

    test('returns empty array when no stores match city filter', async () => {
        const out = await handler({ city: 'NonexistentCity' })
        expect(out.structuredContent.locations).toEqual([])
        expect(out.content[0].text).toMatch(/No Patagonia stores found/)
    })

    test('includes directions_url in each location', async () => {
        const out = await handler({ country: 'United Kingdom' })
        const locations = out.structuredContent.locations
        locations.forEach(location => {
            expect(location.directions_url).toMatch(/^https:\/\/www\.google\.com\/maps\/search\//)
            expect(location.directions_url).toContain(encodeURIComponent(location.address))
        })
    })

    test('works with no parameters provided', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(out).toHaveProperty('structuredContent')
        expect(Array.isArray(out.structuredContent.locations)).toBe(true)
    })
})
