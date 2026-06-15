const MOCK_DATA = [
    {
        name: 'Men\'s Torrentshell 3L Rain Jacket',
        description: 'Waterproof/breathable 3-layer rain jacket providing excellent performance, comfort and durability.',
        image_url: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '£180',
        category: 'Men\'s Jackets',
        product_id: '85241_LMST'
    },
    {
        name: 'Women\'s Nano Puff Packable Insulated Jacket',
        description: 'Warm, windproof, water-resistant jacket with lightweight compressible insulation for packability.',
        image_url: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwbdabaa49/images/hi-res/84218_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '£170',
        category: 'Women\'s Jackets',
        product_id: '84218_SMDB'
    },
    {
        name: 'Men\'s Better Sweater Fleece Jacket',
        description: 'Warm, low-bulk full-zip jacket made of sweater-knit 100% recycled polyester fleece.',
        image_url: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwf4894a9f/images/hi-res/25528_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '£130',
        category: 'Men\'s Fleece',
        product_id: '25528_BLK'
    },
    {
        name: 'Women\'s Torrentshell 3L Rain Jacket',
        description: 'Exceptional waterproof/breathable rain jacket providing performance, comfort and durability.',
        image_url: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw5b977282/images/hi-res/85246_BLK.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '£180',
        category: 'Women\'s Jackets',
        product_id: '85246_BLK'
    },
    {
        name: 'Men\'s Durable Down Parka',
        description: 'Lofty 800-fill-power down belay jacket with two-way zipper and rock abrasion resistance.',
        image_url: 'https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw903101cf/images/hi-res/85520_SMDB.jpg?sw=1400&sh=1400&sfrm=png&q=90&bgcolor=f3f4ef',
        price: '£575',
        category: 'Men\'s Jackets',
        product_id: '85520_SMDB'
    }
]

module.exports = async ({ query = '', category = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false
        if (query && !item.name.toLowerCase().includes(query.toLowerCase()) && !item.description.toLowerCase().includes(query.toLowerCase())) return false
        return true
    })

    const contentText = results.length > 0
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${query ? ` matching "${query}"` : ''}.`
        : `No products found${category ? ` in ${category}` : ''}${query ? ` matching "${query}"` : ''}.`

    return {
        content: [{ type: 'text', text: contentText }],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?query=${query}&category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/products`)
 *   if (query) url.searchParams.append('query', query)
 *   if (category) url.searchParams.append('category', category)
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */