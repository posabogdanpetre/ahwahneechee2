/**
 * find_store — Finds Patagonia retail stores and authorized dealers near a given location
 */

// Real scraped data from Action Planner
const MOCK_DATA = [
    {
        name: 'Patagonia Manchester',
        address: '51 King Street, Manchester M2 7AZ',
        phone: '+44 (0)161 834 4005',
        hours: ''
    },
    {
        name: 'Patagonia Bristol',
        address: '81 Park Street, Bristol BS1 5PF',
        phone: '+44 (0)1202017184',
        hours: ''
    }
]

module.exports = async ({ country, city = '' }) => {
    // Validate required parameter
    if (!country || typeof country !== 'string' || !country.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a country to search in.' }],
            structuredContent: { stores: [] } // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        }
    }

    const normalizedCountry = country.trim()
    const normalizedCity = city.trim().toLowerCase()

    // Filter by country and optional city
    let results = MOCK_DATA.filter(store => {
        // In production, filter by country from API data
        // For now, all mock data is UK-based
        if (normalizedCity && !store.address.toLowerCase().includes(normalizedCity)) {
            return false
        }
        return true
    })

    // Build directions URLs
    results = results.map(store => ({
        name: store.name,
        address: store.address,
        phone: store.phone,
        directions_url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`
    }))

    const cityText = normalizedCity ? ` in ${city}` : ''
    const contentText = results.length > 0
        ? `Found ${results.length} Patagonia ${results.length === 1 ? 'store' : 'stores'}${cityText}, ${normalizedCountry}.`
        : `No Patagonia stores found${cityText} in ${normalizedCountry}.`

    return {
        content: [{ type: 'text', text: contentText }],
        structuredContent: { stores: results } // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/store-locator?country=${country}&city=${city}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's store locator network requests for the
 *   correct endpoint and auth pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/store-locator`)
 *   url.searchParams.set('country', country)
 *   if (city) url.searchParams.set('city', city)
 *
 *   const res = await fetch(url.toString(), {
 *     headers: {
 *       'Authorization': `Bearer ${process.env.API_KEY}`,
 *       'Accept': 'application/json'
 *     }
 *   })
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
