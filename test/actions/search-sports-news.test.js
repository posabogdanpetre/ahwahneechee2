const handler = require('../../actions/search-sports-news/index.js');

describe('search_sports_news handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ category: 'Superliga' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ category: 'La Liga' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.articles is an array', async () => {
    const out = await handler({});
    expect(Array.isArray(out.structuredContent.articles)).toBe(true);
    expect(out.structuredContent.articles.length).toBeGreaterThan(0);
  });

  test('"Show me the latest sports news" returns all articles when no category filter', async () => {
    const out = await handler({});
    expect(out.structuredContent.articles.length).toBeGreaterThan(0);
    expect(out.content[0].text).toMatch(/Found \d+ sports news article/);
  });

  test('filters articles by category', async () => {
    const out = await handler({ category: 'Superliga' });
    const articles = out.structuredContent.articles;
    expect(articles.every(a => a.category === 'Superliga')).toBe(true);
    expect(articles.length).toBeGreaterThan(0);
  });

  test('returns empty array when category has no matches', async () => {
    const out = await handler({ category: 'Bundesliga' });
    expect(out.structuredContent.articles).toEqual([]);
    expect(out.content[0].text).toMatch(/No sports news found/i);
  });

  test('each article has required fields', async () => {
    const out = await handler({});
    const article = out.structuredContent.articles[0];
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('excerpt');
    expect(article).toHaveProperty('category');
    expect(article).toHaveProperty('author');
    expect(article).toHaveProperty('published_at');
    expect(article).toHaveProperty('image_url');
  });
});