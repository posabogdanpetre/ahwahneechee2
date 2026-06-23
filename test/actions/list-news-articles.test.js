const handler = require('../../actions/list-news-articles/index.js');

describe('list_news_articles handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({});
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Show me the latest sports news" returns articles', async () => {
        const out = await handler({});
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.articles.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({});
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(Array.isArray(out.structuredContent.articles)).toBe(true);
    });

    test('filters by category', async () => {
        const out = await handler({ category: 'Liga 1' });
        const articles = out.structuredContent.articles;
        expect(articles.length).toBeGreaterThan(0);
        expect(articles.every((a) => a.category === 'Liga 1')).toBe(true);
    });

    test('respects the limit parameter', async () => {
        const out = await handler({ limit: 2 });
        expect(out.structuredContent.articles.length).toBe(2);
    });

    test('unknown category returns no articles', async () => {
        const out = await handler({ category: 'Nonexistent League' });
        expect(out.structuredContent.articles).toHaveLength(0);
        expect(out.content[0].text).toMatch(/0|found/i);
    });
});
