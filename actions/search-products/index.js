const MOCK_DATA = [
    {
        name: "Men's Down Sweater Jacket",
        description: "Lightweight, windproof jacket with 800-fill-power recycled down insulation and a recycled nylon ripstop shell.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3c83e113/images/hi-res/84675_CLOR.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 230,
        category: "Insulated Jackets",
        rating: 4.5,
        review_count: 128,
        product_url: "https://eu.patagonia.com/gb/en/product/mens-down-sweater-jacket/84675.html"
    },
    {
        name: "Women's Better Sweater Fleece Jacket",
        description: "Warm 100% recycled polyester full-zip fleece jacket with a sweater-knit aesthetic.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dwb74b05e1/images/hi-res/25543_NENA.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 130,
        category: "Fleece",
        rating: 4.7,
        review_count: 342,
        product_url: "https://eu.patagonia.com/gb/en/product/womens-better-sweater-fleece-jacket/25543.html"
    },
    {
        name: "Men's Torrentshell 3L Rain Jacket",
        description: "Waterproof/breathable 3-layer rain jacket with H2No Performance Standard shell, made without PFAS.",
        image_url: "https://eu.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw3f39aea6/images/hi-res/85241_LMST.jpg?sw=800&sh=800&sfrm=png&q=95&bgcolor=f3f4ef",
        price: 180,
        category: "Rain Jackets",
        rating: 4.6,
        review_count: 215,
        product_url: "https://eu.patagonia.com/gb/en/product/mens-torrentshell-3l-rain-jacket/85241.html"
    }
]

module.exports = async ({ query = '', category = '' }) => {
    const normalizedQuery = query.trim().toLowerCase()
    const normalizedCategory = category.trim()

    const results = MOCK_DATA.filter(item => {
        if (normalizedCategory && item.category !== normalizedCategory) {
            return false
        }
        if (normalizedQuery) {
            const searchableText = `${item.name} ${item.description} ${item.category}`.toLowerCase()
            if (!searchableText.includes(normalizedQuery)) {
                return false
            }
        }
        return true
    })

    const contentText = results.length > 0
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${normalizedCategory ? ` in category "${normalizedCategory}"` : ''}${normalizedQuery ? ` matching "${query}"` : ''}.`
        : `No products found${normalizedCategory ? ` in category "${normalizedCategory}"` : ''}${normalizedQuery ? ` matching "${query}"` : ''}.`

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: {
            products: results
        }
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
 *   if (query) url.searchParams.set('query', query)
 *   if (category) url.searchParams.set('category', category)
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
