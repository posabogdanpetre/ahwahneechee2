const handler = require('../../actions/get-live-scores/index.js')

describe('get_live_scores handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"What matches are on today?" returns live scores', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.scores.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.scores)).toBe(true)
    })

    test('filters by competition', async () => {
        const out = await handler({ competition: 'Liga 1' })
        const { scores } = out.structuredContent
        expect(scores.length).toBeGreaterThan(0)
        expect(scores.every((s) => /liga 1/i.test(s.category) || /liga 1/i.test(s.name))).toBe(true)
    })

    test('returns no matches for an unknown competition', async () => {
        const out = await handler({ competition: 'Nonexistent League XYZ' })
        expect(out.structuredContent.scores).toHaveLength(0)
        expect(out.content[0].text).toMatch(/found 0|no/i)
    })

    test('handles missing args without throwing', async () => {
        const out = await handler()
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.structuredContent.scores.length).toBeGreaterThan(0)
    })
})
