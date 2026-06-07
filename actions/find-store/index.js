// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Patagonia Denver',
        address: '2600 Walnut St, Denver, CO 80205',
        phone: '(303) 555-0142',
        hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
        type: 'Retail Store'
    },
    {
        name: 'Mountain Gear Outfitters',
        address: '1401 Pearl St, Boulder, CO 80302',
        phone: '(303) 555-0198',
        hours: 'Mon-Sun 9am-8pm',
        type: 'Authorized Dealer'
    },
    {
        name: 'Patagonia Outlet Denver',
        address: '1475 S Colorado Blvd, Denver, CO 80222',
        phone: '(720) 555-0237',
        hours: 'Mon-Sat 10am-8pm, Sun 11am-6pm',
        type: 'Outlet'
    }
]

module.exports = async ({ location = '' }) => {
    // Validate required parameter
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city, postcode, or address) to search for stores.' }],
            structuredContent: { stores: [] }
        }
    }

    const query = location.trim().toLowerCase()

    // TODO: Replace MOCK_DATA with a real API call (see below)
    // Filter stores by location (simple substring match for mock data)
    const results = MOCK_DATA.filter(store => {
        return store.address.toLowerCase().includes(query) ||
               store.name.toLowerCase().includes(query)
    })

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No Patagonia stores found near "${location}".` }],
            structuredContent: { stores: [] }
        }
    }

    const summary = `Found ${results.length} Patagonia ${results.length === 1 ? 'store' : 'stores'} near ${location}.`

    return {
        content: [{ type: 'text', text: summary }],
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
 *   API_BASE_URL   Base URL of the Patagonia website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check Patagonia's website network requests for the correct
 *   store locator endpoint and any required headers.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/store-locator?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.stores || data.results || data
 */