// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
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
    // Filter by country and city if provided
    let results = MOCK_DATA

    if (country) {
        const countryLower = country.toLowerCase().trim()
        results = results.filter(store => {
            // Since MOCK_DATA doesn't have country field, we'll include all stores
            // In a real implementation, filter by store.country
            return true
        })
    }

    if (city) {
        const cityLower = city.toLowerCase().trim()
        results = results.filter(store => {
            return store.address.toLowerCase().includes(cityLower)
        })
    }

    // Build directions URLs for each store
    const locations = results.map(store => ({
        name: store.name,
        address: store.address,
        phone: store.phone,
        directions_url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`
    }))

    const summary = locations.length === 0
        ? `No Patagonia stores found${country ? ` in ${country}` : ''}${city ? ` near ${city}` : ''}.`
        : `Found ${locations.length} Patagonia store${locations.length === 1 ? '' : 's'}${country ? ` in ${country}` : ''}${city ? ` near ${city}` : ''}.`

    return {
        content: [
            { type: 'text', text: summary }
        ],
        structuredContent: {
            locations
        }
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
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const params = new URLSearchParams()
 *   if (country) params.append('country', country)
 *   if (city) params.append('city', city)
 *   
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?${params.toString()}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
