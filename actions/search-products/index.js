// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        "name": "Women's Better Sweater Fleece Jacket",
        "description": "Full-zip jacket made of warm, 100% recycled polyester fleece.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw0e491b7c/images/hi-res/25543_STH.jpg",
        "price": "",
        "category": "Women's Fleece"
    },
    {
        "name": "Men's Houdini Windbreaker Jacket",
        "description": "Packable, featherweight windproof shell made from 100% recycled nylon.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw4c81478a/images/hi-res/24142_BLK.jpg",
        "price": "",
        "category": "Men's Jackets"
    },
    {
        "name": "Women's Retro Pile Fleece Jacket",
        "description": "Heritage-inspired jacket made with 100% recycled polyester deep-pile fleece.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5e1dce1a/images/hi-res/22795_NAT.jpg",
        "price": "",
        "category": "Women's Fleece"
    },
    {
        "name": "Women's Better Sweater 1/4-Zip Fleece Pullover",
        "description": "Quarter-zip pullover with sweater-knit aesthetic in 100% recycled polyester.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb3c2fcac/images/hi-res/25618_BCW.jpg",
        "price": "",
        "category": "Women's Fleece"
    },
    {
        "name": "Men's Windsweep Lightweight Windbreaker Jacket",
        "description": "Lightweight, packable windbreaker for everyday adventures.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw9a7b312e/images/hi-res/20320_INK.jpg",
        "price": "",
        "category": "Men's Jackets"
    }
];

module.exports = async ({ category = '', gender = '', sport = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category && !item.category.includes(category)) return false;
        if (gender && item.category && !item.category.includes(gender)) return false;
        return true;
    });

    const contentText = results.length === 0
        ? 'No products found matching your filters.'
        : `Found ${results.length} Patagonia product${results.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}.`;

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&gender=${gender}&sport=${sport}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams();
 *   if (category) params.append('category', category);
 *   if (gender) params.append('gender', gender);
 *   if (sport) params.append('sport', sport);
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
