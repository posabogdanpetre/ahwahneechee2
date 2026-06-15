const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ location: 'Seattle' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ location: 'Seattle' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.stores is an array', async () => {
    const out = await handler({ location: 'Seattle' })
    expect(Array.isArray(out.structuredContent.stores)).toBe(true)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/location|provide/i)
  })

  test('returns empty array when no stores match the location', async () => {
    const out = await handler({ location: 'NonexistentCity' })
    expect(out.structuredContent.stores).toEqual([])
    expect(out.content[0].text).toMatch(/0.*store/i)
  })

  test('"Find a Patagonia store near me" returns stores for Seattle', async () => {
    const out = await handler({ location: 'Seattle' })
    const stores = out.structuredContent.stores
    expect(stores.length).toBeGreaterThan(0)
    expect(stores[0]).toHaveProperty('name')
    expect(stores[0]).toHaveProperty('address')
    expect(stores[0]).toHaveProperty('phone')
    expect(stores[0]).toHaveProperty('hours')
    expect(stores[0]).toHaveProperty('type')
  })

  test('filters stores by location substring match', async () => {
    const out = await handler({ location: 'Portland' })
    const stores = out.structuredContent.stores
    expect(stores.length).toBeGreaterThan(0)
    expect(stores.every(s => s.address.toLowerCase().includes('portland'))).toBe(true)
  })
})
