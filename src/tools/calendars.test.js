import {
    get_long_frenchRepublican_string,
    get_standard_frenchRepublican_string,
    get_frenchRepublican_iso_string,
    get_short_frenchRepublican_string,
    get_frenchRepublican_day_string,
    get_long_gregorian_string,
    get_standard_gregorian_string,
    get_short_gregorian_string,
    get_iso_string,
    get_gedcom_string,
} from './calendars'

describe('get_long_frenchRepublican_string', () => {
    const testSet = [
        [[1, 1, 1], 'primidi 1 vendémiaire an I (1)'],
        [[1, 1, 2], 'duodi 2 vendémiaire an I (1)'],
        [[1, 1, 3], 'tridi 3 vendémiaire an I (1)'],
        [[1, 1, 4], 'quartidi 4 vendémiaire an I (1)'],
        [[1, 1, 5], 'quintidi 5 vendémiaire an I (1)'],
        [[1, 1, 6], 'sextidi 6 vendémiaire an I (1)'],
        [[1, 1, 7], 'septidi 7 vendémiaire an I (1)'],
        [[1, 1, 8], 'octidi 8 vendémiaire an I (1)'],
        [[1, 1, 9], 'nonidi 9 vendémiaire an I (1)'],
        [[1, 1, 10], 'décadi 10 vendémiaire an I (1)'],
        [[2, 1, 11], 'primidi 11 vendémiaire an II (2)'],
        [[3, 2, 17], 'septidi 17 brumaire an III (3)'],
        [[4, 3, 29], 'nonidi 29 frimaire an IV (4)'],
        [[5, 4, 30], 'décadi 30 nivôse an V (5)'],
        [[6, 5, 22], 'duodi 22 pluviôse an VI (6)'],
        [[7, 6, 15], 'quintidi 15 ventôse an VII (7)'],
        [[8, 7, 15], 'quintidi 15 germinal an VIII (8)'],
        [[9, 8, 15], 'quintidi 15 floréal an IX (9)'],
        [[10, 9, 15], 'quintidi 15 prairial an X (10)'],
        [[11, 10, 15], 'quintidi 15 messidor an XI (11)'],
        [[12, 11, 15], 'quintidi 15 thermidor an XII (12)'],
        [[13, 12, 15], 'quintidi 15 fructidor an XIII (13)'],
        [[14, 13, 1], 'primidi 1er jour complémentaire an XIV (14)'],
        [[15, 13, 2], 'duodi 2ème jour complémentaire an XV (15)'],
        [[16, 13, 3], 'tridi 3ème jour complémentaire an XVI (16)'],
        [[17, 13, 4], 'quartidi 4ème jour complémentaire an XVII (17)'],
        [[18, 13, 5], 'quintidi 5ème jour complémentaire an XVIII (18)'],
        [[11, 13, 6], 'sextidi 6ème jour complémentaire an XI (11)'],
        [[231, 4, 17], 'septidi 17 nivôse an CCXXXI (231)'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_long_frenchRepublican_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_standard_frenchRepublican_string', () => {
    const testSet = [
        [[1, 1, 1], '1 vendémiaire an I'],
        [[1, 1, 2], '2 vendémiaire an I'],
        [[1, 1, 3], '3 vendémiaire an I'],
        [[1, 1, 4], '4 vendémiaire an I'],
        [[1, 1, 5], '5 vendémiaire an I'],
        [[1, 1, 6], '6 vendémiaire an I'],
        [[1, 1, 7], '7 vendémiaire an I'],
        [[1, 1, 8], '8 vendémiaire an I'],
        [[1, 1, 9], '9 vendémiaire an I'],
        [[1, 1, 10], '10 vendémiaire an I'],
        [[2, 1, 11], '11 vendémiaire an II'],
        [[3, 2, 17], '17 brumaire an III'],
        [[4, 3, 29], '29 frimaire an IV'],
        [[5, 4, 30], '30 nivôse an V'],
        [[6, 5, 22], '22 pluviôse an VI'],
        [[7, 6, 15], '15 ventôse an VII'],
        [[8, 7, 15], '15 germinal an VIII'],
        [[9, 8, 15], '15 floréal an IX'],
        [[10, 9, 15], '15 prairial an X'],
        [[11, 10, 15], '15 messidor an XI'],
        [[12, 11, 15], '15 thermidor an XII'],
        [[13, 12, 15], '15 fructidor an XIII'],
        [[14, 13, 1], '1 jour comp. an XIV'],
        [[15, 13, 2], '2 jour comp. an XV'],
        [[16, 13, 3], '3 jour comp. an XVI'],
        [[17, 13, 4], '4 jour comp. an XVII'],
        [[18, 13, 5], '5 jour comp. an XVIII'],
        [[11, 13, 6], '6 jour comp. an XI'],
        [[231, 4, 17], '17 nivôse an CCXXXI'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_standard_frenchRepublican_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_frenchRepublican_iso_string', () => {
    const testSet = [
        [[1, 1, 1], 'I-01-01'],
        [[1, 1, 2], 'I-01-02'],
        [[1, 1, 3], 'I-01-03'],
        [[1, 1, 4], 'I-01-04'],
        [[1, 1, 5], 'I-01-05'],
        [[1, 1, 6], 'I-01-06'],
        [[1, 1, 7], 'I-01-07'],
        [[1, 1, 8], 'I-01-08'],
        [[1, 1, 9], 'I-01-09'],
        [[1, 1, 10], 'I-01-10'],
        [[2, 1, 11], 'II-01-11'],
        [[3, 2, 17], 'III-02-17'],
        [[4, 3, 29], 'IV-03-29'],
        [[5, 4, 30], 'V-04-30'],
        [[6, 5, 22], 'VI-05-22'],
        [[7, 6, 15], 'VII-06-15'],
        [[8, 7, 15], 'VIII-07-15'],
        [[9, 8, 15], 'IX-08-15'],
        [[10, 9, 15], 'X-09-15'],
        [[11, 10, 15], 'XI-10-15'],
        [[12, 11, 15], 'XII-11-15'],
        [[13, 12, 15], 'XIII-12-15'],
        [[14, 13, 1], 'XIV-13-01'],
        [[15, 13, 2], 'XV-13-02'],
        [[16, 13, 3], 'XVI-13-03'],
        [[17, 13, 4], 'XVII-13-04'],
        [[18, 13, 5], 'XVIII-13-05'],
        [[11, 13, 6], 'XI-13-06'],
        [[231, 4, 17], 'CCXXXI-04-17'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_frenchRepublican_iso_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_short_frenchRepublican_string', () => {
    const testSet = [
        [[1, 1, 1], '01/01/I'],
        [[1, 1, 2], '02/01/I'],
        [[1, 1, 3], '03/01/I'],
        [[1, 1, 4], '04/01/I'],
        [[1, 1, 5], '05/01/I'],
        [[1, 1, 6], '06/01/I'],
        [[1, 1, 7], '07/01/I'],
        [[1, 1, 8], '08/01/I'],
        [[1, 1, 9], '09/01/I'],
        [[1, 1, 10], '10/01/I'],
        [[2, 1, 11], '11/01/II'],
        [[3, 2, 17], '17/02/III'],
        [[4, 3, 29], '29/03/IV'],
        [[5, 4, 30], '30/04/V'],
        [[6, 5, 22], '22/05/VI'],
        [[7, 6, 15], '15/06/VII'],
        [[8, 7, 15], '15/07/VIII'],
        [[9, 8, 15], '15/08/IX'],
        [[10, 9, 15], '15/09/X'],
        [[11, 10, 15], '15/10/XI'],
        [[12, 11, 15], '15/11/XII'],
        [[13, 12, 15], '15/12/XIII'],
        [[14, 13, 1], '01/13/XIV'],
        [[15, 13, 2], '02/13/XV'],
        [[16, 13, 3], '03/13/XVI'],
        [[17, 13, 4], '04/13/XVII'],
        [[18, 13, 5], '05/13/XVIII'],
        [[11, 13, 6], '06/13/XI'],
        [[231, 4, 17], '17/04/CCXXXI'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_short_frenchRepublican_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_frenchRepublican_day_string', () => {
    const testSet = [
        [[1, 1, 1], '1'],
        [[1, 1, 2], '2'],
        [[1, 1, 3], '3'],
        [[1, 1, 4], '4'],
        [[1, 1, 5], '5'],
        [[1, 1, 6], '6'],
        [[1, 1, 7], '7'],
        [[1, 1, 8], '8'],
        [[1, 1, 9], '9'],
        [[1, 1, 10], '10'],
        [[2, 1, 11], '11'],
        [[3, 2, 17], '17'],
        [[4, 3, 29], '29'],
        [[5, 4, 30], '30'],
        [[6, 5, 22], '22'],
        [[7, 6, 15], '15'],
        [[8, 7, 15], '15'],
        [[9, 8, 15], '15'],
        [[10, 9, 15], '15'],
        [[11, 10, 15], '15'],
        [[12, 11, 15], '15'],
        [[13, 12, 15], '15'],
        [[14, 13, 1], '1 (vertu)'],
        [[15, 13, 2], '2 (génie)'],
        [[16, 13, 3], '3 (travail)'],
        [[17, 13, 4], '4 (opinion)'],
        [[18, 13, 5], '5 (récompenses)'],
        [[7, 13, 6], '6 (révolution)'],
        [[231, 4, 17], '17'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_frenchRepublican_day_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_long_gregorian_string', () => {
    const testSet = [
        [[2020, 3, 16], 'lundi 16 mars 2020'],
        [[2020, 3, 17], 'mardi 17 mars 2020'],
        [[2020, 3, 18], 'mercredi 18 mars 2020'],
        [[2020, 3, 19], 'jeudi 19 mars 2020'],
        [[2020, 3, 20], 'vendredi 20 mars 2020'],
        [[2020, 3, 21], 'samedi 21 mars 2020'],
        [[2020, 3, 22], 'dimanche 22 mars 2020'],
        [[2019, 1, 11], 'vendredi 11 janvier 2019'],
        [[2020, 2, 12], 'mercredi 12 février 2020'],
        [[2021, 3, 1], 'lundi 1 mars 2021'],
        [[2022, 4, 7], 'jeudi 7 avril 2022'],
        [[2023, 5, 22], 'lundi 22 mai 2023'],
        [[2024, 6, 15], 'samedi 15 juin 2024'],
        [[2025, 7, 31], 'jeudi 31 juillet 2025'],
        [[2026, 8, 19], 'mercredi 19 août 2026'],
        [[2027, 9, 3], 'vendredi 3 septembre 2027'],
        [[1793, 10, 12], 'samedi 12 octobre 1793'],
        [[1798, 11, 30], 'vendredi 30 novembre 1798'],
        [[1800, 12, 14], 'dimanche 14 décembre 1800'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_long_gregorian_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_standard_gregorian_string', () => {
    const testSet = [
        [[2020, 3, 16], '16 mars 2020'],
        [[2020, 3, 17], '17 mars 2020'],
        [[2020, 3, 18], '18 mars 2020'],
        [[2020, 3, 19], '19 mars 2020'],
        [[2020, 3, 20], '20 mars 2020'],
        [[2020, 3, 21], '21 mars 2020'],
        [[2020, 3, 22], '22 mars 2020'],
        [[2019, 1, 11], '11 janvier 2019'],
        [[2020, 2, 12], '12 février 2020'],
        [[2021, 3, 1], '1 mars 2021'],
        [[2022, 4, 7], '7 avril 2022'],
        [[2023, 5, 22], '22 mai 2023'],
        [[2024, 6, 15], '15 juin 2024'],
        [[2025, 7, 31], '31 juillet 2025'],
        [[2026, 8, 19], '19 août 2026'],
        [[2027, 9, 3], '3 septembre 2027'],
        [[1793, 10, 12], '12 octobre 1793'],
        [[1798, 11, 30], '30 novembre 1798'],
        [[1800, 12, 14], '14 décembre 1800'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_standard_gregorian_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_short_gregorian_string', () => {
    const testSet = [
        [[2020, 3, 16], '16/03/2020'],
        [[2020, 3, 17], '17/03/2020'],
        [[2020, 3, 18], '18/03/2020'],
        [[2020, 3, 19], '19/03/2020'],
        [[2020, 3, 20], '20/03/2020'],
        [[2020, 3, 21], '21/03/2020'],
        [[2020, 3, 22], '22/03/2020'],
        [[2019, 1, 11], '11/01/2019'],
        [[2020, 2, 12], '12/02/2020'],
        [[2021, 3, 1], '01/03/2021'],
        [[2022, 4, 7], '07/04/2022'],
        [[2023, 5, 22], '22/05/2023'],
        [[2024, 6, 15], '15/06/2024'],
        [[2025, 7, 31], '31/07/2025'],
        [[2026, 8, 19], '19/08/2026'],
        [[2027, 9, 3], '03/09/2027'],
        [[1793, 10, 12], '12/10/1793'],
        [[1798, 11, 30], '30/11/1798'],
        [[1800, 12, 14], '14/12/1800'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_short_gregorian_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_iso_string', () => {
    const testSet = [
        [[2020, 3, 16], '2020-03-16'],
        [[2020, 3, 17], '2020-03-17'],
        [[2020, 3, 18], '2020-03-18'],
        [[2020, 3, 19], '2020-03-19'],
        [[2020, 3, 20], '2020-03-20'],
        [[2020, 3, 21], '2020-03-21'],
        [[2020, 3, 22], '2020-03-22'],
        [[2019, 1, 11], '2019-01-11'],
        [[2020, 2, 12], '2020-02-12'],
        [[2021, 3, 1], '2021-03-01'],
        [[2022, 4, 7], '2022-04-07'],
        [[2023, 5, 22], '2023-05-22'],
        [[2024, 6, 15], '2024-06-15'],
        [[2025, 7, 31], '2025-07-31'],
        [[2026, 8, 19], '2026-08-19'],
        [[2027, 9, 3], '2027-09-03'],
        [[1793, 10, 12], '1793-10-12'],
        [[1798, 11, 30], '1798-11-30'],
        [[1800, 12, 14], '1800-12-14'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_iso_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

describe('get_gedcom_string', () => {
    const testSet = [
        [[2020, 3, 16], '16 MAR 2020'],
        [[2020, 3, 17], '17 MAR 2020'],
        [[2020, 3, 18], '18 MAR 2020'],
        [[2020, 3, 19], '19 MAR 2020'],
        [[2020, 3, 20], '20 MAR 2020'],
        [[2020, 3, 21], '21 MAR 2020'],
        [[2020, 3, 22], '22 MAR 2020'],
        [[2019, 1, 11], '11 JAN 2019'],
        [[2020, 2, 12], '12 FEB 2020'],
        [[2021, 3, 1], '01 MAR 2021'],
        [[2022, 4, 7], '07 APR 2022'],
        [[2023, 5, 22], '22 MAY 2023'],
        [[2024, 6, 15], '15 JUN 2024'],
        [[2025, 7, 31], '31 JUL 2025'],
        [[2026, 8, 19], '19 AUG 2026'],
        [[2027, 9, 3], '03 SEP 2027'],
        [[1793, 10, 12], '12 OCT 1793'],
        [[1798, 11, 30], '30 NOV 1798'],
        [[1800, 12, 14], '14 DEC 1800'],
    ]
    for (const [inputValues, expectedResult] of testSet) {
        it(`should return "${expectedResult}" when provided with (${inputValues.map(x => `${x}`).join(',')})`, () => {
            const actualResult = get_gedcom_string(...inputValues)
            expect(actualResult).toEqual(expectedResult)
        })
    }
})

