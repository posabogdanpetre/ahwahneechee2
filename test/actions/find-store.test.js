const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ location: 'Boulder, CO' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ location: 'Boulder, CO' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
    expect(out.structuredContent).toHaveProperty('stores')
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/location|provide/i)
    expect(out.structuredContent.stores).toEqual([])
  })

  test('"Find a Patagonia store near me" returns store locations', async () => {
    const out = await handler({ location: '80302' })
    expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    expect(out.structuredContent.stores[0]).toHaveProperty('name')
    expect(out.structuredContent.stores[0]).toHaveProperty('address')
    expect(out.structuredContent.stores[0]).toHaveProperty('phone')
  })

  test('filters by radius_miles', async () => {
    const out = await handler({ location: 'Boulder, CO', radius_miles: 5 })
    const stores = out.structuredContent.stores
    expect(stores.every(s => s.distance_miles <= 5)).toBe(true)
  })

  test('returns empty results for very small radius', async () => {
    const out = await handler({ location: 'Boulder, CO', radius_miles: 0.5 })
    expect(out.structuredContent.stores).toEqual([])
    expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
  })

  test('uses default radius of 50 miles when not specified', async () => {
    const out = await handler({ location: 'Denver, CO' })
    const stores = out.structuredContent.stores
    expect(stores.every(s => s.distance_miles <= 50)).toBe(true)
  })
})