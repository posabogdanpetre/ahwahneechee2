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

module.exports = async ({ location = '' }) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city name or postal code) to search for stores.' }],
            structuredContent: { stores: [] }
        }
    }

    const query = location.trim().toLowerCase()

    const results = MOCK_DATA.filter(store => {
        const cityMatch = store.address.toLowerCase().includes(query)
        const nameMatch = store.name.toLowerCase().includes(query)
        return cityMatch || nameMatch
    })

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No Patagonia stores found near: ${location}` }],
            structuredContent: { stores: [] }
        }
    }

    const storesText = results.map(s => `${s.name} - ${s.address}, phone: ${s.phone}`).join('; ')
    
    return {
        content: [{ type: 'text', text: `Found ${results.length} Patagonia store(s) near ${location}: ${storesText}` }],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: { stores: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${location}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
