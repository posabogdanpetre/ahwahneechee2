const MOCK_DATA = [
    {
        "name": "Men's Micro D Fleece Jacket",
        "description": "Made with 100% recycled polyester, feels unbelievably soft, provides continual warmth, and dries quickly.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwe09856fd/images/hi-res/26171_ELGR.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£63",
        "category": "Men's Fleece"
    },
    {
        "name": "Women's Retro Pile Fleece Jacket",
        "description": "Heritage-inspired with 100% recycled polyester double-sided shearling fleece for ultimate softness and warmth.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw7c2512d9/images/hi-res/22795_NAT.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£140",
        "category": "Women's Fleece"
    },
    {
        "name": "Men's Classic Retro-X Fleece Jacket",
        "description": "Iconic windproof quarter-inch pile fleece made with 100% REPREVE recycled polyester sourced from coastal communities.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw443a7d6d/images/hi-res/23057_DNBA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£220",
        "category": "Men's Fleece"
    },
    {
        "name": "Airfarer Cap",
        "description": "Five-panel organic cotton hat with brim built from fully traceable NetPlus 100% recycled fishing nets.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf95efc62/images/hi-res/37996_STSA.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£40",
        "category": "Hats & Accessories"
    },
    {
        "name": "Friction Belt",
        "description": "Low-profile 100% recycled nylon web belt with anticorrosive aluminum buckle that doubles as an emergency lash strap.",
        "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw15ced377/images/hi-res/59179_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef",
        "price": "£28",
        "category": "Accessories"
    }
];

module.exports = async ({ category = '', query = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false;
        if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
    });

    const contentText = results.length > 0
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in "${category}"` : ''}${query ? ` matching "${query}"` : ''}.`
        : `No products found${category ? ` in "${category}"` : ''}${query ? ` matching "${query}"` : ''}.`;

    return {
        content: [{ type: 'text', text: contentText }],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&query=${query}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/products`);
 *   if (category) url.searchParams.append('category', category);
 *   if (query) url.searchParams.append('query', query);
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */