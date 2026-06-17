const handler = require('../../actions/get-league-standings/index.js')

describe('get_league_standings handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ league: 'Premier League' })
    expect(out).toHaveProperty('content')
    expect(Array.isArray(out.content)).toBe(true)
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    expect(out.content[0].text).toMatch(/Premier League/)
  })

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ league: 'Premier League' })
    expect(typeof out.structuredContent).toBe('object')
    expect(Array.isArray(out.structuredContent)).toBe(false)
  })

  test('structuredContent.standings contains standings array', async () => {
    const out = await handler({ league: 'Premier League' })
    expect(Array.isArray(out.structuredContent.standings)).toBe(true)
    expect(out.structuredContent.standings.length).toBeGreaterThan(0)
  })

  test('returns error message when required arg is missing', async () => {
    const out = await handler({})
    expect(out.content[0].text).toMatch(/provide.*league/i)
    expect(out.structuredContent.standings).toEqual([])
  })

  test('returns empty standings for unknown league', async () => {
    const out = await handler({ league: 'Unknown League' })
    expect(out.content[0].text).toMatch(/No standings found/)
    expect(out.structuredContent.standings).toEqual([])
  })

  test('includes season in response text', async () => {
    const out = await handler({ league: 'La Liga', season: '2024' })
    expect(out.content[0].text).toMatch(/2024/)
  })

  test('standings items have correct shape', async () => {
    const out = await handler({ league: 'Superliga' })
    const standings = out.structuredContent.standings
    expect(standings.length).toBeGreaterThan(0)
    const team = standings[0]
    expect(team).toHaveProperty('position')
    expect(team).toHaveProperty('team')
    expect(team).toHaveProperty('matches_played')
    expect(team).toHaveProperty('wins')
    expect(team).toHaveProperty('draws')
    expect(team).toHaveProperty('losses')
    expect(team).toHaveProperty('goals_for_against')
    expect(team).toHaveProperty('points')
    expect(team).toHaveProperty('form')
  })
})