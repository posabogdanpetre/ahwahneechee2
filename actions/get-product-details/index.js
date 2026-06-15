// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        "name": "Men's Nano Puff® Jacket",
        "description": "Lightweight, weather-resistant synthetic insulation layer that stays warm when wet.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£170",
        "category": "Insulated Jackets"
    },
    {
        "name": "Men's Down Sweater™ Insulated Jacket",
        "description": "Lightweight, windproof jacket with 800-fill-power recycled down for versatile warmth.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "",
        "category": "Insulated Jackets"
    },
    {
        "name": "Black Hole® MLC™ Convertible Carry On Backpack 45L",
        "description": "Versatile carry-on that converts between backpack, shoulder bag and duffel.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw229945d1/images/hi-res/49307_WSTO.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "",
        "category": "Backpacks"
    }
];

module.exports = async ({ product_name = '' }) => {
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details.' }]
        };
    }

    const query = product_name.trim().toLowerCase();
    const item = MOCK_DATA.find(p => p.name.toLowerCase().includes(query));

    if (!item) {
        return {
            content: [{ type: 'text', text: `No product found matching: ${product_name}` }]
        };
    }

    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    return {
        content: [{ type: 'text', text: `Found product details for: ${item.name}` }],
        structuredContent: {
            name: item.name,
            price: item.price,
            description: item.description,
            category: item.category,
            colors: item.colors || [],
            fit: item.fit || '',
            weight: item.weight || '',
            materials: item.materials || '',
            rating: item.rating || 0,
            review_count: item.review_count || 0,
            image_url: item.image_url
        }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or GET ${process.env.API_BASE_URL}/products/${product_id}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   const data = await res.json();
 *   return data;
 */