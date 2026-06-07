// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Women\'s Torrentshell 3L Jacket',
        price: '£140',
        category: 'Jackets & Vests',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8f8a8c8d/images/hi-res/85240_BLK.jpg',
        color_options: 5
    },
    {
        name: 'Men\'s Nano Puff Jacket',
        price: '£180',
        category: 'Jackets & Vests',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw1a2b3c4d/images/hi-res/84212_NVYB.jpg',
        color_options: 8
    },
    {
        name: 'Kids\' Down Sweater Hoody',
        price: '£110',
        category: 'Jackets & Vests',
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5e6f7g8h/images/hi-res/68267_SMDB.jpg',
        color_options: 4
    }
]

module.exports = async ({ category = '', gender = '', sport = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false
        // Gender and sport filters would apply if MOCK_DATA included those fields
        return true
    })

    const contentText = results.length > 0
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}${sport ? ` suitable for ${sport}` : ''}.`
        : `No products found${category ? ` in ${category}` : ''}${gender ? ` for ${gender}` : ''}${sport ? ` for ${sport}` : ''}.`

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/products/search?category=${category}&gender=${gender}&sport=${sport}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (category) params.append('category', category)
 *   if (gender) params.append('gender', gender)
 *   if (sport) params.append('sport', sport)
 *   
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products/search?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */