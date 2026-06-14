module.exports = async ({ location = '' }) => {
    // Validate required parameter
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city name, postcode, or country) to search for nearby Patagonia stores.' }],
            structuredContent: { stores: [] }
        }
    }

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

    const query = location.trim().toLowerCase()

    // Filter stores by location query (match against city names in address)
    const results = MOCK_DATA.filter(store => {
        const addressLower = store.address.toLowerCase()
        const nameLower = store.name.toLowerCase()
        return addressLower.includes(query) || nameLower.includes(query)
    })

    // Generate directions URLs
    const storesWithDirections = results.map(store => ({
        name: store.name,
        address: store.address,
        phone: store.phone,
        directions_url: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}`
    }))

    const contentText = storesWithDirections.length > 0
        ? `Found ${storesWithDirections.length} Patagonia store${storesWithDirections.length === 1 ? '' : 's'} near ${location}.`
        : `No Patagonia stores found near ${location}.`

    return {
        content: [{ type: 'text', text: contentText }],
        // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        structuredContent: { stores: storesWithDirections }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual Patagonia store locator API):
 *   GET ${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia website API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's network requests for the
 *   store locator endpoint and required auth headers.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/stores?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.stores || data
 */
