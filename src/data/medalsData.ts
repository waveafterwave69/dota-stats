import unranked from '../assets/unranked.png'
import herald1 from '../assets/herald1.png'
import herald2 from '../assets/herald2.png'
import herald3 from '../assets/herald3.png'
import herald4 from '../assets/herald4.png'
import herald5 from '../assets/herald5.png'
import guardian1 from '../assets/guardian1.png'
import guardian2 from '../assets/guardian2.png'
import guardian3 from '../assets/guardian3.png'
import guardian4 from '../assets/guardian4.png'
import guardian5 from '../assets/guardian5.png'
import crusader1 from '../assets/crusader1.png'
import crusader2 from '../assets/crusader2.png'
import crusader3 from '../assets/crusader3.png'
import crusader4 from '../assets/crusader4.png'
import crusader5 from '../assets/crusader5.png'
import archon1 from '../assets/archon1.png'
import archon2 from '../assets/archon2.png'
import archon3 from '../assets/archon3.png'
import archon4 from '../assets/archon4.png'
import archon5 from '../assets/archon5.png'
import legend1 from '../assets/legend1.png'
import legend2 from '../assets/legend2.png'
import legend3 from '../assets/legend3.png'
import legend4 from '../assets/legend4.png'
import legend5 from '../assets/legend5.png'
import ancient1 from '../assets/ancient1.png'
import ancient2 from '../assets/ancient2.png'
import ancient3 from '../assets/ancient3.png'
import ancient4 from '../assets/ancient4.png'
import ancient5 from '../assets/ancient5.png'
import divine1 from '../assets/divine1.png'
import divine2 from '../assets/divine2.png'
import divine3 from '../assets/divine3.png'
import divine4 from '../assets/divine4.png'
import divine5 from '../assets/divine5.png'
import immortal1 from '../assets/immortal1.png'
import immortal2 from '../assets/immortal2.png'
import immortal3 from '../assets/immortal3.png'
import immortal4 from '../assets/immortal4.png'
import immortal5 from '../assets/immortal5.png'

interface MedalInfo {
    img: string
    name: string
}

interface Medals {
    [key: number]: MedalInfo
}

export const unrankedMedal = {
    img: unranked,
    name: 'Не откалиброван',
}

export const medals: Medals[] = [
    {
        1: {
            img: herald1,
            name: 'Рекрут 1',
        },
        2: {
            img: herald2,
            name: 'Рекрут 2',
        },
        3: {
            img: herald3,
            name: 'Рекрут 3',
        },
        4: {
            img: herald4,
            name: 'Рекрут 4',
        },
        5: {
            img: herald5,
            name: 'Страж 5',
        },
    },
    {
        1: {
            img: guardian1,
            name: 'Страж 1',
        },
        2: {
            img: guardian2,
            name: 'Страж 2',
        },
        3: {
            img: guardian3,
            name: 'Страж 3',
        },
        4: {
            img: guardian4,
            name: 'Страж 4',
        },
        5: {
            img: guardian5,
            name: 'Страж 5',
        },
    },
    {
        1: {
            img: crusader1,
            name: 'Рыцарь 1',
        },
        2: {
            img: crusader2,
            name: 'Рыцарь 2',
        },
        3: {
            img: crusader3,
            name: 'Рыцарь 3',
        },
        4: {
            img: crusader4,
            name: 'Рыцарь 4',
        },
        5: {
            img: crusader5,
            name: 'Рыцарь 5',
        },
    },
    {
        1: {
            img: archon1,
            name: 'Герой 1',
        },
        2: {
            img: archon2,
            name: 'Герой 2',
        },
        3: {
            img: archon3,
            name: 'Герой 3',
        },
        4: {
            img: archon4,
            name: 'Герой 4',
        },
        5: {
            img: archon5,
            name: 'Герой 5',
        },
    },
    {
        1: {
            img: legend1,
            name: 'Легенда 1',
        },
        2: {
            img: legend2,
            name: 'Легенда 2',
        },
        3: {
            img: legend3,
            name: 'Легенда 3',
        },
        4: {
            img: legend4,
            name: 'Легенда 4',
        },
        5: {
            img: legend5,
            name: 'Легенда 5',
        },
    },
    {
        1: {
            img: ancient1,
            name: 'Властелин 1',
        },
        2: {
            img: ancient2,
            name: 'Властелин 2',
        },
        3: {
            img: ancient3,
            name: 'Властелин 3',
        },
        4: {
            img: ancient4,
            name: 'Властелин 4',
        },
        5: {
            img: ancient5,
            name: 'Властелин 5',
        },
    },
    {
        1: {
            img: divine1,
            name: 'Божество 1',
        },
        2: {
            img: divine2,
            name: 'Божество 2',
        },
        3: {
            img: divine3,
            name: 'Божество 3',
        },
        4: {
            img: divine4,
            name: 'Божество 4',
        },
        5: {
            img: divine5,
            name: 'Божество 5',
        },
    },
    {
        0: {
            img: immortal1,
            name: 'Титан',
        },
        1: {
            img: immortal2,
            name: 'Титан',
        },
        2: {
            img: immortal3,
            name: 'Титан',
        },
        3: {
            img: immortal4,
            name: 'Титан',
        },
        4: {
            img: immortal5,
            name: 'Титан',
        },
    },
]
