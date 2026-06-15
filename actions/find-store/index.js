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

module.exports = async ({ country = '', city = '' }) => {
    const results = MOCK_DATA.filter(store => {
        if (country) {
            const countryLower = country.toLowerCase().trim()
            const addressLower = store.address.toLowerCase()
            const ukCountries = ['united kingdom', 'uk', 'england', 'scotland', 'wales']
            if (ukCountries.includes(countryLower)) {
                return true
            }
            return addressLower.includes(countryLower)
        }
        if (city) {
            const cityLower = city.toLowerCase().trim()
            const addressLower = store.address.toLowerCase()
            const nameLower = store.name.toLowerCase()
            return addressLower.includes(cityLower) || nameLower.includes(cityLower)
        }
        return true
    })

    const enrichedResults = results.map(store => ({
        name: store.name,
        address: store.address,
        phone: store.phone,
        directions_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`
    }))

    const contentText = enrichedResults.length > 0
        ? `Found ${enrichedResults.length} Patagonia store${enrichedResults.length !== 1 ? 's' : ''}${city ? ` near ${city}` : country ? ` in ${country}` : ''}.`
        : `No Patagonia stores found${city ? ` near ${city}` : country ? ` in ${country}` : ''}.`

    return {
        content: [
            { type: 'text', text: contentText }
        ],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: {
            stores: enrichedResults
        }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?country=${country}&city=${city}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia website's store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (country) params.append('country', country)
 *   if (city) params.append('city', city)
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
