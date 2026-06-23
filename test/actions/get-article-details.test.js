const handler = require('../../actions/get-article-details/index.js')

describe('get_article_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'Un milion de euro pentru Florinel Coman!' })
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about the Florinel Coman transfer" returns article details', async () => {
        const out = await handler({ name: 'Un milion de euro pentru Florinel Coman!' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe('Un milion de euro pentru Florinel Coman!')
        expect(out.structuredContent.category).toBe('Stranieri')
    })

    test('matches on partial title', async () => {
        const out = await handler({ name: 'Florinel Coman' })
        expect(out.structuredContent.name).toMatch(/Coman/)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ name: 'Un milion de euro pentru Florinel Coman!' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/name|provide|title/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown article title returns not-found and no structuredContent', async () => {
        const out = await handler({ name: 'This article does not exist anywhere' })
        expect(out.content[0].text).toMatch(/no article|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
