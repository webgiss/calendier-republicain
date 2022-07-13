import './Converter.css'
import {
    Segment, Menu, Dropdown,
    // Button, Select, 
    Icon, Grid, Divider,
} from 'semantic-ui-react'
import {
    gregorian_months,
    frenchRepublican_months,
    get_frenchRepublican_day_string,
} from '../../tools/calendars'
import { stringify } from '../../tools/roman'
import exportOnWindow from '../../tools/exportOnWindow'
import CopyField from '../CopyField'

const createOption = (item) => ({ key: item, text: item, value: item })
// const createArrayOption0 = (item, array) => ({key: item, text: array[item], value: item})
const createArrayOption1 = (item, array) => ({ key: item, text: array[item - 1], value: item })
const createFunctionOption = (item, f) => ({ key: item, text: f(item), value: item })

const createOptions = (items) => items.map(item => createOption(item))
// const createArrayOptions0 = (items, array) => items.map(item=>createArrayOption0(item, array))
const createArrayOptions1 = (items, array) => items.map(item => createArrayOption1(item, array))
const createFunctionOptions = (items, f) => items.map(item => createFunctionOption(item, f))

const Converter = ({
    idConv,
    gregorian_day, gregorian_month, gregorian_year,
    frenchRepublican_day, frenchRepublican_month, frenchRepublican_year,
    gregorian_long, gregorian_standard, gregorian_short, gregorian_iso, gregorian_gedcom,
    frenchRepublican_long, frenchRepublican_standard, frenchRepublican_short, frenchRepublican_iso,
    freeInput,
    onGregorianChanged,
    onFrenchRepublicanChanged,
    onFreeInputChanged
}) => {
    const year_to_string = (n) => n === null ? '' : `An ${stringify(n)}`

    exportOnWindow({ year_to_string })
    const gregorian_days_options = createOptions([...new Array(31).keys()].map(x => x + 1))
    const gregorian_months_options = createArrayOptions1([...new Array(12).keys()].map(m => m + 1), gregorian_months)
    const gregorian_years_options = createOptions([...new Array(15).keys()].map(x => 1792 + x))

    if (gregorian_year < 1792) {
        gregorian_years_options.unshift(createOption(gregorian_year))
    } else if (gregorian_year >= 1792 + 15) {
        gregorian_years_options.push(createOption(gregorian_year))
    }

    const frenchRepublican_days_options = frenchRepublican_month === 13 ?
        createFunctionOptions([...new Array(6).keys()].map(x => x + 1), (day) => get_frenchRepublican_day_string(frenchRepublican_year, frenchRepublican_month, day)) :
        createOptions([...new Array(30).keys()].map(x => x + 1))
    const frenchRepublican_months_options = createArrayOptions1([...new Array(13).keys()].map(m => m + 1), frenchRepublican_months)
    const frenchRepublican_years_options = createFunctionOptions([...new Array(14).keys()].map(x => 1 + x), year_to_string)

    const gregorian_month_default = gregorian_month !== null ? gregorian_months_options[gregorian_month - 1].value : undefined
    const frenchRepublican_month_default = frenchRepublican_month !== null ? frenchRepublican_months_options[frenchRepublican_month - 1].value : undefined

    let frenchRepublican_year_default = frenchRepublican_year === null ? year_to_string(frenchRepublican_year) : ''
    if (frenchRepublican_year !== null) {
        if (frenchRepublican_year >= 1 + 14) {
            frenchRepublican_years_options.push(createFunctionOption(frenchRepublican_year, year_to_string))
        }
    }

    console.log({ gregorian_month_default, frenchRepublican_month_default, frenchRepublican_year_default })
    console.log({ gregorian_day, gregorian_month_default, gregorian_year })
    console.log({ frenchRepublican_day, frenchRepublican_month_default, frenchRepublican_year })
    return (
        <Segment inverted color='grey' className="Converter">
            {
                /*
                <Input
                    fluid
                    className='ConverterInput'
                    value={freeInput}
                    onChange={(event, data) => onFreeInputChanged(data.value)}
                    placeholder='Saisissez ici une date libre en calendrier grégorien ou en calendrier révolutionnaire...'
                />
                */
            }
            <Segment>
                <Grid columns={2} relaxed='very'>
                    <Grid.Column>
                        <Menu className='discreteMenu'>
                            <Dropdown
                                fluid
                                placeholder='Jour...'
                                search
                                selection
                                value={gregorian_day || ''}
                                defaultValue={gregorian_day || ''}
                                options={gregorian_days_options}
                                onChange={(event, data) => onGregorianChanged(data.value, gregorian_month, gregorian_year)}
                            />
                            <Dropdown
                                fluid
                                placeholder='Mois...'
                                search
                                selection
                                value={gregorian_month_default || ''}
                                defaultValue={gregorian_month_default || ''}
                                options={gregorian_months_options}
                                onChange={(event, data) => onGregorianChanged(gregorian_day, data.value, gregorian_year)}
                            />
                            <Dropdown
                                fluid
                                placeholder='Année...'
                                search
                                selection
                                allowAdditions
                                additionLabel='ou bien : '
                                value={gregorian_year || ''}
                                options={gregorian_years_options}
                                onChange={(event, data) => onGregorianChanged(gregorian_day, gregorian_month, 1 * data.value)}
                            />
                        </Menu>
                        {/*
                        <Segment>
                            <div className='ConverterField'>{gregorian_day}</div>
                            <div className='ConverterField'>{gregorian_month}</div>
                            <div className='ConverterField'>{gregorian_year}</div>
                        </Segment>
                        */}
                        <p><CopyField text={gregorian_long} /></p>
                        <p><CopyField text={gregorian_standard} /></p>
                        <p><CopyField text={gregorian_short} /></p>
                        <p><CopyField text={gregorian_iso} /></p>
                        <p><CopyField text={gregorian_gedcom} /></p>
                    </Grid.Column>
                    <Grid.Column>
                        <Menu className='discreteMenu'>
                            <Dropdown
                                fluid
                                placeholder='Jour...'
                                search
                                selection
                                value={frenchRepublican_day || ''}
                                defaultValue={frenchRepublican_day || ''}
                                options={frenchRepublican_days_options}
                                onChange={(event, data) => onFrenchRepublicanChanged(data.value, frenchRepublican_month, frenchRepublican_year)}
                            />
                            <Dropdown
                                fluid
                                placeholder='Mois...'
                                search
                                selection
                                value={frenchRepublican_month_default || ''}
                                defaultValue={frenchRepublican_month_default || ''}
                                options={frenchRepublican_months_options}
                                onChange={(event, data) => onFrenchRepublicanChanged(frenchRepublican_day, data.value, frenchRepublican_year)}
                            />
                            <Dropdown
                                fluid
                                placeholder='Année...'
                                search
                                selection
                                allowAdditions
                                additionLabel='ou bien : '
                                value={frenchRepublican_year || ''}
                                defaultValue={frenchRepublican_year || ''}
                                options={frenchRepublican_years_options}
                                onChange={(event, data) => onFrenchRepublicanChanged(frenchRepublican_day, frenchRepublican_month, data.value)}
                            />
                        </Menu>
                        {/*
                        <Segment>
                            <div className='ConverterField'>{frenchRepublican_day}</div>
                            <div className='ConverterField'>{frenchRepublican_month}</div>
                            <div className='ConverterField'>{frenchRepublican_year}</div>
                        </Segment>
                        */}
                        <p><CopyField text={frenchRepublican_long} /></p>
                        <p><CopyField text={frenchRepublican_standard} /></p>
                        <p><CopyField text={frenchRepublican_short} /></p>
                        <p><CopyField text={frenchRepublican_iso} /></p>
                    </Grid.Column>
                </Grid>
                <Divider vertical><Icon fitted name='exchange'></Icon></Divider>
            </Segment>
        </Segment>
    );
}

export default Converter;
