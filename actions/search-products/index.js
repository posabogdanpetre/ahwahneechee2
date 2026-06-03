module.exports = async ({ query = '', category = '' }) => {
    // TODO: Replace MOCK_DATA with a real API call.
    // See the TODO block below the handler for endpoint details.
    const MOCK_DATA = [
        {
            "name": "Men's Nano Puff Insulated Jacket",
            "description": "Lightweight, packable synthetic insulation jacket that stays warm when wet, made with recycled materials.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8079c0d9/images/hi-res/84213_BLSG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": 170,
            "category": "Jackets & Vests",
            "product_id": "84213_BLSG",
            "colors_available": 5
        },
        {
            "name": "Men's Triolet Alpine Jacket",
            "description": "Alpine workhorse with 3-layer GORE-TEX waterproof/breathable fabric, built for cold and snowy conditions.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3898a537/images/hi-res/84213_SMDB.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": 380,
            "category": "Jackets & Vests",
            "product_id": "84213_SMDB",
            "colors_available": 3
        },
        {
            "name": "Women's Better Sweater 1/4-Zip Fleece",
            "description": "Sweater-knit aesthetic with 100% recycled polyester fleece, a versatile everyday mid-layer.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw86f4117a/images/hi-res/84213_OLGG.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": 110,
            "category": "Fleece",
            "product_id": "84213_OLGG",
            "colors_available": 8
        },
        {
            "name": "Men's Houdini Windbreaker Jacket",
            "description": "Ultralight 100% recycled nylon windbreaker with weather-resistant protection, highly packable.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwc92431d5/images/hi-res/84213_FGE.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": 120,
            "category": "Jackets & Vests",
            "product_id": "84213_FGE",
            "colors_available": 6
        },
        {
            "name": "Men's Jackson Glacier Down Jacket",
            "description": "Waterproof down jacket with 700-fill recycled down and 100% recycled polyester shell for rain and wind protection.",
            "image_url": "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwd54245bb/images/hi-res/84213_BLK.jpg?sw=768&sh=768&sfrm=png&q=95&bgcolor=f3f4ef",
            "price": 350,
            "category": "Jackets & Vests",
            "product_id": "84213_BLK",
            "colors_available": 4
        }
    ]

    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false
        if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false
        return true
    })

    const summary = results.length === 0
        ? `No products found${query ? ` matching "${query}"` : ''}${category ? ` in ${category}` : ''}.`
        : `Found ${results.length} product${results.length === 1 ? '' : 's'}${query ? ` matching "${query}"` : ''}${category ? ` in ${category}` : ''}.`

    return {
        content: [
            { type: 'text', text: summary }
        ],
        structuredContent: {
            items: results
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia EU API):
 *   GET ${process.env.API_BASE_URL}/products/search?query=${query}&category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia EU API (e.g. https://eu.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia EU developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/products/search`)
 *   if (query) url.searchParams.append('query', query)
 *   if (category) url.searchParams.append('category', category)
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 
 *       'Authorization': `Bearer ${process.env.API_KEY}`,
 *       'Content-Type': 'application/json'
 *     }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
