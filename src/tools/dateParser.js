import { parse } from './roman'
import { frenchRepublican_months_abrev, frenchRepublican_months_search, gregorian_months_search, sans_culottides_days_search } from './calendars'
export const FORMAT_UNKNOWN = 'UNKNOWN'
export const FORMAT_GREGORIAN = 'GREGORIAN'
export const FORMAT_FRENCH_REPUBLICAN = 'FRENCH_REPUBLICAN'

const reRoman = /^[IVXLCDM]+$/i
const reNumber = /^[0-9]+$/i

const lookLikeRomanString = (data) => {
    return reRoman.test(data)
}

const lookLikeNumberString = (data) => {
    return reNumber.test(data)
}

const lookLikeNumber = (data) => {
    return !Number.isNaN(data)
}

const takeBefore = (array, index) => array.slice(0, index)
const takeAfter = (array, index) => array.slice(index + 1)
const takeLast = (array) => array.slice(-1)[0]
const takeFirst = (array) => array[0]

export const findCompDays = ({ part }) => {
    for (let day = 1; day <= sans_culottides_days_search.length; day++) {
        const prefix_array = sans_culottides_days_search[day - 1]
        for (const prefix of prefix_array) {
            if (part.toLowerCase().startsWith(prefix)) {
                return { day, month: 13, format: FORMAT_FRENCH_REPUBLICAN }
            }
        }
    }
    return { format: FORMAT_UNKNOWN };
}

export const findMonth = ({ part, format }) => {
    // Cas spécial "mardi" && "vendredi"
    if (part.toLowerCase().startsWith('mard') || part.toLowerCase().startsWith('vendr')) {
        return { format: FORMAT_UNKNOWN };
    }
    if (format === undefined || format === FORMAT_GREGORIAN) {
        for (let month = 1; month <= gregorian_months_search.length; month++) {
            const prefix_array = gregorian_months_search[month - 1]
            for (const prefix of prefix_array) {
                if (part.toLowerCase().startsWith(prefix)) {
                    return { month, format: FORMAT_GREGORIAN }
                }
            }
        }
    }
    if (format === undefined || format === FORMAT_FRENCH_REPUBLICAN) {
        for (let month = 1; month <= frenchRepublican_months_abrev.length; month++) {
            const abrev_array = frenchRepublican_months_abrev[month - 1]
            for (const abrev of abrev_array) {
                if (part.toLowerCase() === abrev) {
                    return { month, format: FORMAT_FRENCH_REPUBLICAN }
                }
            }
        }
        for (let month = 1; month <= frenchRepublican_months_search.length; month++) {
            const prefix_array = frenchRepublican_months_search[month - 1]
            for (const prefix of prefix_array) {
                if (part.toLowerCase().startsWith(prefix)) {
                    return { month, format: FORMAT_FRENCH_REPUBLICAN }
                }
            }
        }
    }
    return { format: FORMAT_UNKNOWN }
}

export const parseDate = (/** @type{String} */data) => {
    // Si il y a des / on considère qu'on est sûr un format jj/mm/aa en républicain ou grégorien. Dans ce cas, seules les années en romains seront considérés en républicain
    if (data.indexOf('/') > 0) {
        const parts = data.split('/').map((/** @type{String} */part) => part.trim(' ').trim('\t').trimStart('0'))
        if (parts.length !== 3) {
            return { format: FORMAT_UNKNOWN }
        }
        const yearPart = parts[2]
        const [day, month, yearOrNan] = parts.map((x) => Number.parseInt(x))

        if (lookLikeNumber(day) && lookLikeNumber(month) && lookLikeRomanString(yearPart)) {
            const year = parse(yearPart)
            return { day, month, year, format: FORMAT_FRENCH_REPUBLICAN }
        }
        if (lookLikeNumber(day) && lookLikeNumber(month) && lookLikeNumber(yearOrNan)) {
            const year = yearOrNan
            return { day, month, year, format: FORMAT_GREGORIAN }
        }
        return { format: FORMAT_UNKNOWN }
    }
    // Si il y a des / on considère qu'on est sûr un format ISO (ou qui ressemble à de l'ISO) aa-mm-jj en républicain ou grégorien. Dans ce cas, seules les années en romains seront considérés en républicain
    if (data.indexOf('-') > 0) {
        const parts = data.split('-').map((/** @type{String} */part) => part.trim(' ').trim('\t').trimStart('0'))
        if (parts.length !== 3) {
            return { format: FORMAT_UNKNOWN }
        }
        const yearPart = takeFirst(parts)
        const [yearOrNan, month, day] = parts.map((x) => Number.parseInt(x))

        if (lookLikeNumber(day) && lookLikeNumber(month) && lookLikeRomanString(yearPart)) {
            const year = parse(yearPart)
            return { day, month, year, format: FORMAT_FRENCH_REPUBLICAN }
        }
        if (lookLikeNumber(day) && lookLikeNumber(month) && lookLikeNumber(yearOrNan)) {
            const year = yearOrNan
            return { day, month, year, format: FORMAT_GREGORIAN }
        }
        return { format: FORMAT_UNKNOWN }
    }
    const basic_data = data.toLowerCase().replace("'", " ").replace(/ +/, " ")
    const basic_data_parts = basic_data.split(' ')

    // Si il y a un mot "an" (séparé par des espace ou éventuellement une apostrophe), on est dans le cadre du calendrier républicain. Dans ce cas, les années peuvent être noté en chiffre arabe ou chiffre romains.
    const basic_data_parts_index_an = basic_data_parts.indexOf('an')
    if (basic_data_parts_index_an > 0) {
        const year_parts = takeAfter(basic_data_parts, basic_data_parts_index_an)
        const mayBeYear = takeFirst(year_parts.filter((x) => lookLikeRomanString(x)))
        let year = null
        if (mayBeYear !== undefined) {
            year = parse(mayBeYear)
        }
        const mayBeYearNumber = takeFirst(year_parts.filter((x) => lookLikeNumberString(x)))
        if (mayBeYearNumber !== undefined) {
            year = Number.parseInt(mayBeYearNumber)
        }
        if (year !== null) {
            const day_month_parts = takeBefore(basic_data_parts, basic_data_parts_index_an)
            const month_info = takeLast(
                day_month_parts
                    .map((part, index) => ({ index, ...findMonth({ part, format: FORMAT_FRENCH_REPUBLICAN }) }))
                    .filter((element) => element.format === FORMAT_FRENCH_REPUBLICAN)
            )
            // Si plusieurs éléments correspondent à un mois, le plus proche avant le mot "an" est prioritaire
            if (month_info !== undefined) {
                const { index, month } = month_info
                const day_parts = takeBefore(day_month_parts, index)
                const day = Number.parseInt(takeLast(day_parts.filter((part) => lookLikeNumberString(part))))
                // Si plusieurs éléments correspondent à un jour, le plus proche avant ce qui a été vu comme le mois est prioritaire
                return { year, month, day, format: FORMAT_FRENCH_REPUBLICAN };
            }
        }
    }

    const basic_data_month_parts = basic_data_parts.map((part, index) => ({ index, ...findMonth({ part }) })).filter((element) => element.format !== FORMAT_UNKNOWN)

    if (basic_data_month_parts.length === 1) {
        // On a trouvé un seul élement qui correspond à un mois
        const { index, month } = takeFirst(basic_data_month_parts)

        const day_parts = takeBefore(basic_data_parts, index)
        const day = Number.parseInt(takeLast(day_parts.filter((part) => lookLikeNumberString(part))))
        // Si plusieurs éléments correspondent à un jour, le plus proche avant ce qui a été vu comme le mois est prioritaire

        if (day !== undefined) {
            const year_parts = takeAfter(basic_data_parts, index)
            const year_part = takeFirst(
                year_parts.map(
                    (part) =>
                        lookLikeNumberString(part) ?
                            { year: Number.parseInt(part), format: FORMAT_GREGORIAN } :
                            (
                                lookLikeRomanString(part) ?
                                    { year: parse(part), format: FORMAT_FRENCH_REPUBLICAN } :
                                    null
                            )
                ).filter((element) => element !== null)
            )
            if (year_part !== undefined) {
                const { year, format } = year_part
                return { year, month, day, format }
            }

        }
    }
    const basic_data_comp_days_parts = basic_data_parts.map((part, index) => ({ index, ...findCompDays({ part }) })).filter((element) => element.format !== FORMAT_UNKNOWN)
    if (basic_data_comp_days_parts.length === 1) {
        const { index, day, month, format } = takeFirst(basic_data_comp_days_parts)

        const year_parts = takeAfter(basic_data_parts, index)
        const year = takeFirst(
            year_parts.map(
                (part) =>
                    lookLikeNumberString(part) ? Number.parseInt(part) :
                        (
                            lookLikeRomanString(part) ? parse(part) : null
                        )
            ).filter((element) => element !== null)
        )
        if (year !== undefined) {
            return { year, month, day, format }
        }
    }
    return { format: FORMAT_UNKNOWN };
}