// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Ceas Garmin Fenix 9 PRO AMOLED inReach - 47 mm',
        description: 'Premium multisport GPS smartwatch with AMOLED display and inReach satellite communication.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/1/010-04336-01-112_1.jpg',
        price: 'De la 6.299,00 Lei',
        category: 'Ceasuri & GPS-uri',
        brand: 'Garmin',
        sport: 'Multisport',
        gender: 'Unisex',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/ceas-garmin-fenix-9-pro-amoled-inreach-47-mm',
        product_id: 'ceas-garmin-fenix-9-pro-amoled-inreach-47-mm',
    },
    {
        name: 'Pantofi alergare dama Asics Gel-Kayano 32 Sunny Sizzle SS 2026',
        description: "Women's stability road-running shoe with maximal cushioning for long-distance comfort.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/0/1012c045._8_i9.jpg',
        price: 'De la 714,00 Lei',
        original_price: '1.020,00 Lei',
        category: 'Pantofi alergare',
        brand: 'Asics',
        sport: 'Alergare',
        gender: 'Femei',
        size: '37,37.5,38,39,39.5,40,40.5',
        available_sizes: ['37', '37 1/2', '38', '39', '39 1/2', '40', '40 1/2'],
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026',
        product_id: 'pantofi-alergare-dama-asics-gel-kayano-32-sunny-sizzle-ss-2026',
    },
    {
        name: 'Pantofi alergare dama ON Cloudmonster 3 SS 2026',
        description: "Women's max-cushion road-running shoe engineered for energetic, plush rides.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/0/000000_on-cloudmonster-3-wmns_limelight-seedling_3wg10034859_img0-1000x1000_1.jpg',
        price: 'De la 765,00 Lei',
        original_price: '1.020,00 Lei',
        category: 'Pantofi alergare',
        brand: 'ON',
        sport: 'Alergare',
        gender: 'Femei',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-dama-on-cloudmonster-3-ss-2026',
        product_id: 'pantofi-alergare-dama-on-cloudmonster-3-ss-2026',
    },
    {
        name: 'Pantofi alergare barbati Hoka Skyward X 2',
        description: "Men's highly-cushioned road-running shoe with a responsive plate for long runs.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/1/1/1171925-gtcb_1_1_2.jpg',
        price: 'De la 964,00 Lei',
        original_price: '1.205,00 Lei',
        category: 'Pantofi alergare',
        brand: 'Hoka',
        sport: 'Alergare',
        gender: 'Barbati',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-hoka-skyward-x-2',
        product_id: 'pantofi-alergare-barbati-hoka-skyward-x-2',
    },
    {
        name: 'Pantofi alergare barbati Adidas Supernova Rise 3 SS 2026',
        description: "Men's everyday cushioned road-running shoe for training and easy miles.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/j/p/jp8689_b2b012_plp_1.jpg',
        price: 'De la 570,00 Lei',
        original_price: '750,00 Lei',
        category: 'Pantofi alergare',
        brand: 'Adidas',
        sport: 'Alergare',
        gender: 'Barbati',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-adidas-supernova-rise-3-ss-2026',
        product_id: 'pantofi-alergare-barbati-adidas-supernova-rise-3-ss-2026',
    },
    {
        name: 'Bicicleta pliabila Dahon K9 16"',
        description: 'Compact 16-inch folding bicycle for city commuting and easy storage.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/5/_/5_141bf4e4-76cd-451c-befd-19075bba9605_1.jpg',
        price: 'De la 5.295,00 Lei',
        category: 'Biciclete',
        brand: 'Dahon',
        sport: 'Ciclism',
        gender: 'Unisex',
        availability: 'In stock',
        product_url: 'https://www.sportguru.ro/sporturi/ciclism/biciclete/biciclete-pentru-oras-si-imprejurimi/bicicleta-pliabila-dahon-k9-16',
        product_id: 'bicicleta-pliabila-dahon-k9-16',
    },
    {
        name: 'Ceas Garmin Forerunner 970 AMOLED',
        description: 'Premium running and triathlon GPS smartwatch with AMOLED display and training metrics.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/i/m/imageedit_25_83188919822.jpg',
        price: 'De la 3.399,00 Lei',
        original_price: '3.781,00 Lei',
        discount_percentage: '10% OFF',
        category: 'Ceasuri & GPS-uri',
        brand: 'Garmin',
        sport: 'Alergare',
        gender: 'Unisex',
        availability: 'In stock',
        is_deal: true,
        product_url: 'https://www.sportguru.ro/ceas-garmin-forerunner-970-amoled',
        product_id: 'ceas-garmin-forerunner-970-amoled',
    },
    {
        name: 'Ceas Garmin Instinct 3 - 45 mm, Solar, Tactical Edition',
        description: 'Rugged solar-charging GPS smartwatch with tactical features and long battery life.',
        image_url: 'https://media.sportguru.ro/media/catalog/product/0/1/010-02934-501.jpg',
        price: '1.949,00 Lei',
        original_price: '2.279,00 Lei',
        discount_percentage: '14% OFF',
        category: 'Ceasuri & GPS-uri',
        brand: 'Garmin',
        sport: 'Outdoor',
        gender: 'Unisex',
        availability: 'In stock',
        is_deal: true,
        product_url: 'https://www.sportguru.ro/ceas-garmin-instinct-3-45-mm-solar-tactical-edition',
        product_id: 'ceas-garmin-instinct-3-45-mm-solar-tactical-edition',
    },
    {
        name: 'Pantofi alergare barbati Puma Deviate Nitro Elite 4 Showtime SS 2026',
        description: "Men's carbon-plated racing shoe built for fast road racing and tempo efforts.",
        image_url: 'https://media.sportguru.ro/media/catalog/product/d/e/deviate-nitro_-elite-4-showtime-_1_5.jpg',
        price: 'De la 875,00 Lei',
        original_price: '1.249,00 Lei',
        discount_percentage: '30% OFF',
        category: 'Pantofi alergare',
        brand: 'Puma',
        sport: 'Alergare',
        gender: 'Barbati',
        availability: 'In stock',
        is_deal: true,
        product_url: 'https://www.sportguru.ro/sporturi/alergare/pantofi-alergare/pantofi-alergare-asfalt/pantofi-alergare-barbati-puma-deviate-nitro-elite-4-showtime-ss-2026',
        product_id: 'pantofi-alergare-barbati-puma-deviate-nitro-elite-4-showtime-ss-2026',
    },
];

// Approximate EU shoe size ↔ foot length (cm) reference used to map a measured
// foot length onto a published size when the product exposes footwear sizes.
const EU_SIZE_LENGTH_CM = {
    '37': 23.5, '37 1/2': 23.8, '37.5': 23.8, '38': 24.5, '39': 25.0,
    '39 1/2': 25.4, '39.5': 25.4, '40': 25.7, '40 1/2': 26.0, '40.5': 26.0,
};

function emptyResult() {
    return {
        product_id: null,
        product_name: null,
        fit_status: 'insufficient information',
        suggested_size: null,
        confidence: 0,
        reasoning: [],
        measurement_comparison: {},
        alternative_sizes: [],
        fit_caveats: [],
        in_store_checks: [],
        product_url: null,
    };
}

function nearestSizes(sizes, footLength) {
    return sizes
        .map((s) => {
            const ref = EU_SIZE_LENGTH_CM[s];
            return typeof ref === 'number' ? { size: s, diff: Math.abs(ref - footLength) } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.diff - b.diff);
}

module.exports = async ({
    product_id = '',
    measurements = {},
    usual_size = '',
    activity_context = '',
    fit_preference = '',
}) => {
    if (!product_id || typeof product_id !== 'string' || !product_id.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_id to evaluate fit for.' }],
            structuredContent: emptyResult(),
        };
    }
    if (!measurements || typeof measurements !== 'object' || Array.isArray(measurements) || Object.keys(measurements).length === 0) {
        return {
            content: [{ type: 'text', text: 'Please provide at least one measurement (e.g. foot_length) to assess fit.' }],
            structuredContent: emptyResult(),
        };
    }

    const query = product_id.trim().toLowerCase();
    const product = MOCK_DATA.find((p) => p.product_id.toLowerCase() === query)
        || MOCK_DATA.find((p) => p.product_id.toLowerCase().includes(query))
        || MOCK_DATA.find((p) => p.name.toLowerCase().includes(query));

    if (!product) {
        const nf = emptyResult();
        return {
            content: [{ type: 'text', text: `No SportGuru product found for: ${product_id}` }],
            structuredContent: nf,
        };
    }

    const footLength = typeof measurements.foot_length === 'number' ? measurements.foot_length : null;
    const sizes = Array.isArray(product.available_sizes) ? product.available_sizes : [];
    const roomy = /roomy|room|long run|performance|extra/i.test(`${fit_preference} ${activity_context}`);

    let fit_status = 'insufficient information';
    let suggested_size = usual_size || null;
    let confidence = 0.3;
    const reasoning = [];
    const measurement_comparison = {};
    let alternative_sizes = [];
    const fit_caveats = [];
    const in_store_checks = [
        'Leave ~1 cm of space between longest toe and shoe end.',
        'Try both feet late in the day when feet are largest.',
        'Wear your usual running socks when testing.',
    ];

    if (footLength !== null && sizes.length > 0) {
        const ranked = nearestSizes(sizes, footLength);
        if (ranked.length > 0) {
            const best = ranked[0];
            suggested_size = best.size;
            const ref = EU_SIZE_LENGTH_CM[best.size];
            measurement_comparison.foot_length = `${footLength} cm supplied vs ~${ref} cm published for size ${best.size}`;

            reasoning.push(`Foot length ${footLength} cm maps closest to size ${best.size} on the published size chart.`);
            if (usual_size && String(usual_size) === String(best.size)) {
                reasoning.push(`Usual size ${usual_size} matches the measured length.`);
                fit_status = 'suitable';
                confidence = 0.78;
            } else if (usual_size) {
                reasoning.push(`Usual size ${usual_size} differs slightly from the measured size ${best.size}.`);
                fit_status = 'between sizes';
                confidence = 0.6;
            } else {
                fit_status = 'suitable';
                confidence = 0.7;
            }

            if (best.diff > 0.15) {
                fit_status = 'between sizes';
                confidence = Math.min(confidence, 0.72);
            }

            alternative_sizes = ranked.slice(1, 3).map((r) => r.size);

            if (roomy) {
                reasoning.push('Preference for extra room favors staying at the suggested size or sizing up for long runs.');
                if (ranked[1]) alternative_sizes = [ranked[1].size, ...alternative_sizes.filter((s) => s !== ranked[1].size)];
            }
        }
    } else if (usual_size) {
        reasoning.push(`Using your usual size ${usual_size}; no measurement was matched against the published size chart.`);
        fit_status = 'between sizes';
        confidence = 0.4;
    }

    if (activity_context) measurement_comparison.activity = activity_context;

    fit_caveats.push('Running shoes often fit 0.5–1 size larger than street shoes for toe splay.');
    fit_caveats.push('Published length ranges vary slightly by shoe model.');

    const driver = footLength !== null ? `foot length ${footLength} cm` : (usual_size ? `usual size ${usual_size}` : 'the details provided');
    const summary = `${product.name} is likely a ${fit_status} fit at size ${suggested_size || 'the size you usually wear'}, driven mainly by ${driver}. Confirm in person: leave about a centimetre past your longest toe, try both feet late in the day, and wear your usual running socks before buying.`;

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: {
            product_id: product.product_id,
            product_name: product.name,
            fit_status,
            suggested_size,
            confidence,
            reasoning,
            measurement_comparison,
            alternative_sizes,
            fit_caveats,
            in_store_checks,
            product_url: product.product_url,
        },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products/${product_id}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products/${encodeURIComponent(product_id)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const product = await res.json()
 *   // then run the same fit-assessment logic above against product.available_sizes
 */
