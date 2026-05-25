/*
 * explore-places action handler
 *
 * Returns the catalog of Ahwahneechee sacred and historical places in Yosemite.
 * No parameters required.
 */

const PLACES = [
    {
        id: 'ahwahnee-valley',
        name: 'Yosemite Valley',
        nativeName: 'Ahwahnee',
        meaning: 'Place of a Gaping Mouth',
        type: 'Valley',
        shortDescription: 'The ancestral homeland of the Ahwahneechee people — a valley carved by glaciers and held sacred for countless generations.',
        significance: 'Ancestral homeland; site of Ahwahneechee villages; where Chief Tenaya made his final stand.',
        storyId: 'founding-of-ahwahnee'
    },
    {
        id: 'half-dome',
        name: 'Half Dome',
        nativeName: 'Tis-sa-ack',
        meaning: 'The Weeping Woman',
        type: 'Rock Formation',
        shortDescription: 'The granite dome named after a woman transformed by grief — her tears still stain the rock face in dark streaks.',
        significance: 'Marks the story of Tis-sa-ack; dark streaks on the dome are said to be her tears.',
        storyId: 'legend-of-tis-sa-ack'
    },
    {
        id: 'bridalveil-fall',
        name: 'Bridalveil Fall',
        nativeName: 'Po-ho-no',
        meaning: 'Spirit of the Evil Wind',
        type: 'Waterfall',
        shortDescription: 'A 620-foot waterfall the Ahwahneechee considered cursed — its shifting winds were said to seize the spirit of those who lingered.',
        significance: 'Site of the Po-ho-no spirit legend; Ahwahneechee avoided camping anywhere near it.',
        storyId: 'spirit-of-pohono'
    },
    {
        id: 'el-capitan',
        name: 'El Capitan',
        nativeName: 'To-to-kon-oo-lah',
        meaning: 'Rock Chief',
        type: 'Rock Formation',
        shortDescription: 'The largest granite monolith on Earth — home to the Ahwahneechee\'s most beloved legend about patience defeating pride.',
        significance: 'Subject of the Two Bears legend; symbol of perseverance in Ahwahneechee culture.',
        storyId: 'two-bears-of-el-capitan'
    },
    {
        id: 'yosemite-falls',
        name: 'Yosemite Falls',
        nativeName: 'Cho-lok',
        meaning: 'The Fall',
        type: 'Waterfall',
        shortDescription: 'The tallest waterfall in North America — to the Ahwahneechee, its spring roar was the voice of the valley awakening.',
        significance: 'Seasonal calendar marker; the strength of the fall predicted the acorn harvest.',
        storyId: 'founding-of-ahwahnee'
    },
    {
        id: 'wawona',
        name: 'Wawona',
        nativeName: 'Pallachun',
        meaning: 'Good Place to Stop',
        type: 'Forest',
        shortDescription: 'A meadow crossroads at the edge of Ahwahneechee territory, where bands gathered to trade and the owl spirit kept watch.',
        significance: 'Trade crossroads; near the sacred Mariposa Grove; protected by the owl guardian spirit.',
        storyId: 'spirit-of-pohono'
    }
];

module.exports = async () => ({
    content: [
        {
            type: 'text',
            text: `Found ${PLACES.length} Ahwahneechee sacred places in Yosemite. These are the lands the Ahwahneechee people have called home for thousands of years.`
        }
    ],
    structuredContent: {
        places: PLACES
    }
});
