const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ location: 'Portland' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ location: 'Portland' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/location|provide/i)
  })

  test('"Find a store near me" returns store locations', async () => {
    const out = await handler({ location: 'Portland' })
    expect(out.structuredContent.stores.length).toBeGreaterThan(0)
    expect(out.content[0].text).toMatch(/Found \d+ Patagonia store/i)
  })

  test('filters stores by location query', async () => {
    const out = await handler({ location: 'Boulder' })
    const stores = out.structuredContent.stores
    expect(stores.length).toBe(1)
    expect(stores[0].name).toBe('Patagonia Boulder')
  })

  test('returns empty array and message when no stores match', async () => {
    const out = await handler({ location: 'Nowhere City' })
    expect(out.structuredContent.stores).toEqual([])
    expect(out.content[0].text).toMatch(/No Patagonia stores found/i)
  })

  test('validates location is a non-empty string', async () => {
    const out1 = await handler({ location: '' })
    expect(out1.content[0].text).toMatch(/provide a location/i)

    const out2 = await handler({ location: '   ' })
    expect(out2.content[0].text).toMatch(/provide a location/i)
  })
})
