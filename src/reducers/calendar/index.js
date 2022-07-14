// import { createSlice } from '@reduxjs/toolkit'
import { createModule } from "saga-slice";
import { frenchRepublicanToGregorian, get_frenchRepublican_iso_string, get_gedcom_string, get_iso_string, get_long_frenchRepublican_string, get_long_gregorian_string, get_short_frenchRepublican_string, get_short_gregorian_string, get_standard_frenchRepublican_string, get_standard_gregorian_string, gregorianToFrenchRepublican } from "../../tools/calendars";
import { FORMAT_FRENCH_REPUBLICAN, FORMAT_GREGORIAN, parseDate } from '../../tools/dateParser'
import exportOnWindow from "../../tools/exportOnWindow";
import copy from 'copy-to-clipboard'

const setGregorian = (converter, year, month, day) => {
    converter.gregorian.day = day
    converter.gregorian.month = month
    converter.gregorian.year = year
    if ((day !== null) && (month !== null) && (year !== null)) {
        converter.gregorian.long = get_long_gregorian_string(year, month, day)
        converter.gregorian.standard = get_standard_gregorian_string(year, month, day)
        converter.gregorian.short = get_short_gregorian_string(year, month, day)
        converter.gregorian.iso = get_iso_string(year, month, day)
        converter.gregorian.gedcom = get_gedcom_string(year, month, day)
    } else {
        converter.gregorian.long = ''
        converter.gregorian.standard = ''
        converter.gregorian.short = ''
        converter.gregorian.iso = ''
        converter.gregorian.gedcom = ''
    }
}
const setFrenchRepublican = (converter, year, month, day) => {
    converter.frenchRepublican.day = day
    converter.frenchRepublican.month = month
    converter.frenchRepublican.year = year
    if ((day !== null) && (month !== null) && (year !== null)) {
        converter.frenchRepublican.long = get_long_frenchRepublican_string(year, month, day)
        converter.frenchRepublican.standard = get_standard_frenchRepublican_string(year, month, day)
        converter.frenchRepublican.short = get_short_frenchRepublican_string(year, month, day)
        converter.frenchRepublican.iso = get_frenchRepublican_iso_string(year, month, day)
    } else {
        converter.frenchRepublican.long = ''
        converter.frenchRepublican.standard = ''
        converter.frenchRepublican.short = ''
        converter.frenchRepublican.iso = ''
    }
}

const calendarSlice = createModule({
    name: 'calendar',
    initialState: {
        converters: [],
    },
    reducers: {
        addConverter(state) {
            state.converters.push({
                gregorian: {
                    day: null,
                    month: null,
                    year: null,
                    long: '',
                    standard: '',
                    short: '',
                    iso: '',
                    gedcom: '',
                },
                frenchRepublican: {
                    day: null,
                    month: null,
                    year: null,
                    long: '',
                    short: '',
                    iso: '',
                },
                freeInput: '',
                date: null,
            })
            const idConv = state.converters.length - 1
            const [year, month, day] = [1, 1, 1]
            setFrenchRepublican(state.converters[idConv], year, month, day)
            const [yearGr, monthGr, dayGr] = frenchRepublicanToGregorian(year, month, day)
            setGregorian(state.converters[idConv], yearGr, monthGr, dayGr)
            state.converters[idConv].freeInput = ''
        },
        removeConverter(state, payload) {
            const { idConv } = payload
            if (state.converters.length > idConv && idConv >= 0) {
                state.converters.splice(idConv, 1)
            }
        },
        setGregorian(state, payload) {
            const { idConv, day, month, year } = payload
            if (state.converters.length > idConv && idConv >= 0) {
                try {
                    const [yearFr, monthFr, dayFr] = gregorianToFrenchRepublican(year, month, day)
                    setGregorian(state.converters[idConv], year, month, day)
                    setFrenchRepublican(state.converters[idConv], yearFr, monthFr, dayFr)
                } catch {
                }
                state.converters[idConv].freeInput = ''
            }
        },
        setFrenchRepublican(state, payload) {
            const { idConv, day, month, year } = payload
            if (state.converters.length > idConv && idConv >= 0) {
                try {
                    const [yearGr, monthGr, dayGr] = frenchRepublicanToGregorian(year, month, day)
                    setFrenchRepublican(state.converters[idConv], year, month, day)
                    setGregorian(state.converters[idConv], yearGr, monthGr, dayGr)
                } catch {
                }
                state.converters[idConv].freeInput = ''
            }
        },
        changeFreeInput(state, payload) {
            const { idConv, freeInput } = payload
            if (state.converters.length > idConv && idConv >= 0) {
                state.converters[idConv].freeInput = freeInput
                try {
                    const { format, year, month, day } = parseDate(freeInput)
                    if (format === FORMAT_FRENCH_REPUBLICAN) {
                        const [yearGr, monthGr, dayGr] = frenchRepublicanToGregorian(year, month, day)
                        setFrenchRepublican(state.converters[idConv], year, month, day)
                        setGregorian(state.converters[idConv], yearGr, monthGr, dayGr)
                    } else if (format === FORMAT_GREGORIAN) {
                        const [yearFr, monthFr, dayFr] = gregorianToFrenchRepublican(year, month, day)
                        setGregorian(state.converters[idConv], year, month, day)
                        setFrenchRepublican(state.converters[idConv], yearFr, monthFr, dayFr)
                    }
                } catch {
                }

            }
        },
        copyToClipboard(state, payload) {
            const { text } = payload
            copy(text)
        },
    },
    takers: 'takeEvery',
    sagas: (actions) => ({
    })
})

exportOnWindow(calendarSlice.actions)
exportOnWindow({ calendarSlice })

export const actions = calendarSlice.actions;
export default calendarSlice