interface SequenceTable {
    [key: string]: {
        count: number;
        iconRGB: string;
        name: string;
    };
}

export const sequenceTable: SequenceTable = {
    white: {
        count: 0,
        iconRGB: '255, 255, 255',
        name: 'White',
    },
    sky_blue: {
        count: 1,
        iconRGB: '135, 206, 250',
        name: 'Sky Blue',
    },
    cobalt_blue: {
        count: 2,
        iconRGB: '0, 71, 171',
        name: 'Cobalt Blue',
    },
    carribean_blue: {
        count: 3,
        iconRGB: '0, 105, 148',
        name: 'Carribean Blue',
    },
    spring_green: {
        count: 4,
        iconRGB: '0, 255, 127',
        name: 'Spring Green',
    },
    emerald_green: {
        count: 5,
        iconRGB: '0, 201, 87',
        name: 'Emerald Green',
    },
    emerald_rose: {
        count: 6,
        iconRGB: '0, 134, 67',
        name: 'Emerald Rose',
    },
    magenta: {
        count: 7,
        iconRGB: '255, 0, 255',
        name: 'Magenta',
    },
    violet: {
        count: 8,
        iconRGB: '127, 0, 255',
        name: 'Violet',
    },
    slow_color_splash: {
        count: 9,
        iconRGB: '204,102,0',
        name: 'Slow Color Splash',
    },
    fast_color_splash: {
        count: 10,
        iconRGB: '255,255,153',
        name: 'Fast Color Splash',
    },
    usa_beautiful: {
        count: 11,
        iconRGB: '228,28,29',
        name: 'USA Beautiful',
    },
    fat_tuesday: {
        count: 12,
        iconRGB: '0,255,255',
        name: 'Fat Tuesday',
    },
    disco_tech: {
        count: 13,
        iconRGB: '255,229,204',
        name: 'Disco Tech',
    },
};
