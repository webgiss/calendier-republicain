import { french_revolutionary_to_jd, gregorian_to_jd, jd_to_french_revolutionary, jd_to_gregorian } from "./calcalc/calendar"
import exportOnWindow from "./exportOnWindow"
import { stringify } from "./roman"

export const gregorian_months = [
    'janvier', 'février', 'mars',
    'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre',
    'octobre', 'novembre', 'décembre'
]

export const gregorian_months_search = [
    ['jan'],
    ['fev', 'fév', 'feb'],
    ['mar'],
    ['avr', 'apr'],
    ['mai', 'may'],
    ['juin', 'jun'],
    ['juil', 'jul'],
    ['aou', 'aoû',/*je suis circonflexe*/'aôu',/*je suis très très circonflexe*/'âou', 'aug'],
    ['sep'],
    ['oct'],
    ['nov'],
    ['dec', 'déc'],
]

export const gedcom_months = [
    'JAN', 'FEB', 'MAR',
    'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP',
    'OCT', 'NOV', 'DEC',
]

export const frenchRepublican_day_of_week = [
    'primidi',
    'duodi',
    'tridi',
    'quartidi',
    'quintidi',
    'sextidi',
    'septidi',
    'octidi',
    'nonidi',
    'décadi',
]

export const gregorian_day_of_week = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
    'dimanche',
]

export const frenchRepublican_months = [
    'vendémiaire', 'brumaire', 'frimaire',
    'nivôse', 'pluviôse', 'ventôse',
    'germinal', 'floréal', 'prairial',
    'messidor', 'thermidor', 'fructidor',
    'jours comp.'
]

export const frenchRepublican_months_search = [
    ['vend'],
    ['bru'],
    ['fri'],
    ['niv'],
    ['plu'],
    ['vent'],
    ['ger'],
    ['flo'],
    ['pra'],
    ['mes'],
    ['the'],
    ['fru'],
    ['comp', 'supp', 'sans'],
]

export const frenchRepublican_months_abrev = [
    ['vd', 'vend'],
    ['br', 'brum'],
    ['fr', 'frim'],
    ['ni', 'nivo', 'nivô'],
    ['pl', 'pluv'],
    ['vt', 'vent'],
    ['ge', 'gr', 'germ'],
    ['fl', 'flor'],
    ['pr', 'prai'],
    ['ms', 'me', 'mess'],
    ['th', 'tr', 'ther'],
    ['ft', 'fruc'],
    ['jc', 'js', 'sp', 'cp'],
]

export const sans_culottides_days = [
    'vertu',
    'génie',
    'travail',
    'opinion',
    'récompenses',
    'révolution',
]

export const sans_culottides_days_search = [
    ['vert'],
    ['gén', 'gen'],
    ['trav'],
    ['opin', 'opn'],
    ['réc', 'rec'],
    ['rév', 'rev'],
]

export const sans_culottides_prefixe = [
    'de la',
    'du',
    'du',
    'de l\'',
    'des',
    'de la',
]

const pad = (/** @type{String}*/data, n) => `${data}`.padStart(n, '0')

export const get_long_gregorian_string = (year, month, day) => {
    const dayOfWeek = (new Date(get_iso_string(year, month, day))).getDay()

    return `${gregorian_day_of_week[dayOfWeek]} ${day} ${gregorian_months[month - 1]} ${year}`
}

export const get_standard_gregorian_string = (year, month, day) => {
    return `${day} ${gregorian_months[month - 1]} ${year}`
}

export const get_short_gregorian_string = (year, month, day) => {
    return `${pad(day, 2)}/${pad(month, 2)}/${pad(year, 4)}`
}

export const get_iso_string = (year, month, day) => {
    return `${pad(year, 4)}-${pad(month, 2)}-${pad(day, 2)}`
}

export const get_gedcom_string = (year, month, day) => {
    return `${pad(day, 2)} ${gedcom_months[month - 1]} ${pad(year, 4)}`
}

export const get_long_frenchRepublican_string = (year, month, day) => {
    return `${frenchRepublican_day_of_week[(day - 1) % 10]} ${day}${month === 13 ? (day !== 1 ? "ème" : "er") : ""} ${month !== 13 ? frenchRepublican_months[month - 1] : "jour complémentaire"} an ${year > 0 ? stringify(year) : stringify(1 - year) + " avant l'ère républicaine"} (${year})`
}

export const get_standard_frenchRepublican_string = (year, month, day) => {
    return `${day} ${month !== 13 ? frenchRepublican_months[month - 1] : "jour comp."} an ${year > 0 ? stringify(year) : stringify(1 - year) + " av. rép."}`
}

export const get_short_frenchRepublican_string = (year, month, day) => {
    return `${pad(day, 2)}/${pad(month, 2)}/${year > 0 ? stringify(year) : "[" + stringify(1 - year) + "]"}`
}

export const get_frenchRepublican_iso_string = (year, month, day) => {
    return `${year > 0 ? stringify(year) : "[" + stringify(1 - year) + "]"}-${pad(month, 2)}-${pad(day, 2)}`
}

export const get_frenchRepublican_day_string = (year, month, day) => {
    if (month <= 12) {
        return `${day}`
    } else {
        // return `${day} jour ${sans_culottides_prefixe[day-1]} ${sans_culottides_days[day-1]}`
        return `${day} (${sans_culottides_days[day - 1]})`
    }
}

export const gregorianToFrenchRepublican = (year, month, day) => {
    const jd = gregorian_to_jd(year, month, day)
    const [yearFr, monthFr, decadeFr, dayInDecadeFr] = jd_to_french_revolutionary(jd)
    return [yearFr, monthFr, (dayInDecadeFr) + 10 * (decadeFr - 1)]
}

export const frenchRepublicanToGregorian = (year, month, day) => {
    const jd = french_revolutionary_to_jd(year, month, 1 + Math.floor((day) / 10), day % 10)
    const [yearGr, monthGr, dayGr] = jd_to_gregorian(jd)
    return [yearGr, monthGr, dayGr]
}

exportOnWindow({
    gregorianToFrenchRepublican,
    frenchRepublicanToGregorian,
    french_revolutionary_to_jd, gregorian_to_jd,
    jd_to_french_revolutionary, jd_to_gregorian,
})