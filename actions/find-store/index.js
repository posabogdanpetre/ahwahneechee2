/**
 * find_store handler
 * 
 * Finds Patagonia retail store locations by country or city, returning an array of stores with addresses, phone numbers, and directions links.
 */

// Real scraped data from Action Planner
const MOCK_DATA = [
    {
        name: "Patagonia Manchester",
        address: "51 King Street, Manchester M2 7AZ",
        phone: "+44 (0)161 834 4005"
    },
    {
        name: "Patagonia Bristol",
        address: "81 Park Street, Bristol BS1 5PF",
        phone: "+44 (0)1202017184"
    }
]

module.exports = async ({ country, city = '' }) => {
    // Validate required parameter
    if (!country || typeof country !== 'string' || !country.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a country to search for stores.' }],
            structuredContent: { stores: [] }
        }
    }

    const normalizedCountry = country.trim()
    const normalizedCity = city.trim().toLowerCase()

    // TODO: Replace MOCK_DATA with a real API call to the Patagonia store locator API.
    // For now, filter the mock data by city if provided
    let results = MOCK_DATA

    if (normalizedCity) {
        results = MOCK_DATA.filter(store => 
            store.address.toLowerCase().includes(normalizedCity)
        )
    }

    // Add directions URLs to results
    const storesWithDirections = results.map(store => ({
        ...store,
        directions_url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`
    }))

    const contentText = normalizedCity
        ? `Found ${storesWithDirections.length} Patagonia store(s) in ${normalizedCity}, ${normalizedCountry}.`
        : `Found ${storesWithDirections.length} Patagonia store(s) in ${normalizedCountry}.`

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: { stores: storesWithDirections }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/stores?country=${country}&city=${city}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/stores`)
 *   url.searchParams.append('country', country)
 *   if (city) url.searchParams.append('city', city)
 *   
 *   const res = await fetch(url.toString(), {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const stores = await res.json()
 *   
 *   // Add directions URLs
 *   return stores.map(store => ({
 *     ...store,
 *     directions_url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`
 *   }))
 */
