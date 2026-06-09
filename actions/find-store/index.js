// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Patagonia Santa Monica',
        address: '1344 4th Street, Santa Monica, CA 90401',
        phone: '(310) 458-5500',
        hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
        store_type: 'Patagonia Owned'
    },
    {
        name: 'REI Co-op - San Francisco',
        address: '840 Brannan Street, San Francisco, CA 94103',
        phone: '(415) 934-1938',
        hours: 'Mon-Sat 10am-9pm, Sun 10am-7pm',
        store_type: 'Authorized Dealer'
    },
    {
        name: 'Patagonia Portland',
        address: '907 NW Irving Street, Portland, OR 97209',
        phone: '(503) 525-2552',
        hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
        store_type: 'Patagonia Owned'
    }
]

module.exports = async (args) => {
    const { location = '' } = args

    // Validate required parameter
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city, postal code, or address) to search near.' }],
            structuredContent: { stores: [] }
        }
    }

    const query = location.trim().toLowerCase()

    // Filter stores by location query (simple substring match for mock data)
    const results = MOCK_DATA.filter(store => {
        return store.address.toLowerCase().includes(query) ||
               store.name.toLowerCase().includes(query)
    })

    // TODO: Replace MOCK_DATA with a real API call to Patagonia's store locator endpoint.
    // The actual implementation should geocode the location input and find nearby stores.

    const contentText = results.length > 0
        ? `Found ${results.length} Patagonia ${results.length === 1 ? 'store' : 'stores'} near ${location}.`
        : `No Patagonia stores found near ${location}. Try a different location or broader search term.`

    return {
        content: [{ type: 'text', text: contentText }],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: { stores: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia API):
 *   GET ${process.env.API_BASE_URL}/store-locator?location=${encodeURIComponent(location)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of Patagonia's store locator API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/store-locator?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.stores || []
 */
