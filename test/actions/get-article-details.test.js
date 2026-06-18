const handler = require('../../actions/get-article-details/index.js');

describe('get_article_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ article_title: 'Ibrahima Konate' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ article_title: 'Ibrahima Konate' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('returns error message when article_title is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/article_title|provide/i);
  });

  test('"Tell me more about the Ibrahima Konate transfer" returns article details', async () => {
    const out = await handler({ article_title: 'Ibrahima Konate' });
    expect(out.structuredContent).toHaveProperty('title');
    expect(out.structuredContent).toHaveProperty('content');
    expect(out.structuredContent).toHaveProperty('category');
    expect(out.structuredContent).toHaveProperty('image_url');
    expect(out.structuredContent.title).toMatch(/Konate/i);
  });

  test('returns not found message when article does not exist', async () => {
    const out = await handler({ article_title: 'Nonexistent Article Title xyz123' });
    expect(out.content[0].text).toMatch(/no article found|not found/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('includes related articles in the same category', async () => {
    const out = await handler({ article_title: 'Ibrahima Konate' });
    expect(out.structuredContent).toHaveProperty('related_articles');
    expect(Array.isArray(out.structuredContent.related_articles)).toBe(true);
    if (out.structuredContent.related_articles.length > 0) {
      expect(out.structuredContent.related_articles[0]).toHaveProperty('title');
      expect(out.structuredContent.related_articles[0]).toHaveProperty('category');
    }
  });
});