const handler = require('../../actions/check-product-fit/index.js');

const GEL_KAYANO = 'pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026';

describe('check_product_fit handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_id: GEL_KAYANO, measurements: { foot_length: 24.5 } });
        expect(out).toHaveProperty('content');
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_id: GEL_KAYANO, measurements: { foot_length: 24.5 } });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('"Confirm the right Gel-Kayano 32 size for me" returns a fit assessment', async () => {
        const out = await handler({
            product_id: GEL_KAYANO,
            measurements: { foot_length: 24.5 },
            usual_size: '38',
            activity_context: 'long runs',
            fit_preference: 'roomy',
        });
        const sc = out.structuredContent;
        expect(sc.product_name).toMatch(/Gel-Kayano 32/);
        expect(sc.suggested_size).toEqual(expect.any(String));
        expect(Array.isArray(sc.reasoning)).toBe(true);
        expect(sc.reasoning.length).toBeGreaterThan(0);
        expect(sc.confidence).toBeGreaterThan(0);
        expect(sc.product_url).toMatch(/^https:\/\//);
        expect(out.content[0].text).toMatch(/24\.5 cm|foot length/i);
    });

    test('returns error message when product_id is missing', async () => {
        const out = await handler({ measurements: { foot_length: 24.5 } });
        expect(out.content[0].text).toMatch(/product_id|provide/i);
    });

    test('returns error message when measurements are missing', async () => {
        const out = await handler({ product_id: GEL_KAYANO });
        expect(out.content[0].text).toMatch(/measurement|provide/i);
    });

    test('unknown product_id returns a not-found message with the flat empty shape', async () => {
        const out = await handler({ product_id: 'does-not-exist-xyz', measurements: { foot_length: 24.5 } });
        expect(out.content[0].text).toMatch(/no .*found|not found/i);
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
        expect(out.structuredContent.product_name).toBeNull();
    });

    test('every return path exposes the same structuredContent keys', async () => {
        const expectedKeys = [
            'product_id', 'product_name', 'fit_status', 'suggested_size', 'confidence',
            'reasoning', 'measurement_comparison', 'alternative_sizes', 'fit_caveats',
            'in_store_checks', 'product_url',
        ].sort();
        const happy = await handler({ product_id: GEL_KAYANO, measurements: { foot_length: 24.5 } });
        const missing = await handler({});
        const notFound = await handler({ product_id: 'nope', measurements: { foot_length: 24.5 } });
        expect(Object.keys(happy.structuredContent).sort()).toEqual(expectedKeys);
        expect(Object.keys(missing.structuredContent).sort()).toEqual(expectedKeys);
        expect(Object.keys(notFound.structuredContent).sort()).toEqual(expectedKeys);
    });
});
