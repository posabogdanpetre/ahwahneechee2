const MOCK_DATA = [
    {
        name: "Better Sweater™ Fleece Jacket",
        description: "Warm 100% recycled polyester full-zip jacket with sweater-knit aesthetic and Fair Trade Certified construction.",
        price: "£130",
        category: "Fleece"
    },
    {
        name: "Black Hole® Duffel 55L",
        description: "Legendary 55-liter duffel with weather-resistant 100% recycled fabric and removable backpack straps.",
        price: "£160",
        category: "Packs & Gear"
    },
    {
        name: "Nano Puff® Jacket",
        description: "Lightweight, windproof insulated jacket with 60g PrimaLoft Gold Eco insulation and recycled shell.",
        price: "£230",
        category: "Jackets & Vests"
    },
    {
        name: "Baggies™ Shorts 5\"",
        description: "Quick-drying multifunctional shorts with a DWR finish, perfect for water and land.",
        price: "£55",
        category: "Shorts"
    },
    {
        name: "Capilene® Cool Daily Shirt",
        description: "Lightweight moisture-wicking tee with HeiQ Fresh odor control and Fair Trade Certified.",
        price: "£40",
        category: "T-Shirts"
    }
]

module.exports = async ({ category = '', gender = '', sport = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false
        // Gender and sport filtering not implemented in mock data
        // Real API would apply these filters
        return true
    })

    const contentText = results.length > 0
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in category "${category}"` : ''}.`
        : `No products found${category ? ` in category "${category}"` : ''}.`

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
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${category}&gender=${gender}&sport=${sport}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API (e.g. https://www.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (category) params.append('category', category)
 *   if (gender) params.append('gender', gender)
 *   if (sport) params.append('sport', sport)
 *   
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.products || data
 */