const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ city: 'London' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ city: 'London' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.stores is an array', async () => {
    const out = await handler({ city: 'London' })
    expect(Array.isArray(out.structuredContent.stores)).toBe(true)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/city|provide/i)
    expect(out.structuredContent.stores).toEqual([])
  })

  test('"Find a Patagonia store near me" returns store locations', async () => {
    const out = await handler({ city: 'London' })
    expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    const store = out.structuredContent.stores[0]
    expect(store).toHaveProperty('name')
    expect(store).toHaveProperty('address')
    expect(store).toHaveProperty('city')
    expect(store).toHaveProperty('country')
    expect(store).toHaveProperty('phone')
    expect(store).toHaveProperty('hours')
    expect(store).toHaveProperty('type')
  })

  test('filters by country when provided', async () => {
    const out = await handler({ city: 'Berlin', country: 'Germany' })
    const stores = out.structuredContent.stores
    expect(stores.every(s => s.country === 'Germany')).toBe(true)
  })

  test('returns empty array and appropriate message for city with no results', async () => {
    const out = await handler({ city: 'NonexistentCity' })
    expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
    expect(out.structuredContent.stores).toEqual([])
  })

  test('case-insensitive city search', async () => {
    const out = await handler({ city: 'london' })
    expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    expect(out.structuredContent.stores.some(s => s.city === 'London')).toBe(true)
  })
})
