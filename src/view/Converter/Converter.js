import './Converter.css'
import {
    Segment, Menu, Dropdown,
    Button,
    // Select, 
    Input,
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
    onFreeInputChanged,
    onClose
}) => {
    const year_to_string = (n) => n === null ? '' : `An ${n > 0 ? stringify(n) : stringify(1-n) + ' av. rép.'}`

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

    if (frenchRepublican_year !== null) {
        if (frenchRepublican_year < 1) {
            frenchRepublican_years_options.unshift(createFunctionOption(frenchRepublican_year, year_to_string))
        } else if (frenchRepublican_year >= 1 + 14) {
            frenchRepublican_years_options.push(createFunctionOption(frenchRepublican_year, year_to_string))
        }
    }

    return (
        <Segment inverted color='grey' className="Converter">
            <div className='ConverterCloseButton'>
                <Button size='tiny' color='red' icon='close' onClick={onClose} />
            </div>

            {

                <Input
                    fluid
                    className='ConverterInput'
                    value={freeInput}
                    onChange={(event, data) => onFreeInputChanged(data.value)}
                    placeholder='Saisissez ici une date libre en calendrier grégorien ou en calendrier révolutionnaire...'
                />

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
                                options={gregorian_days_options}
                                onChange={(event, data) => onGregorianChanged(data.value, gregorian_month, gregorian_year)}
                            />
                            <Dropdown
                                fluid
                                placeholder='Mois...'
                                search
                                selection
                                value={gregorian_month_default || ''}
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
                        <CopyField text={gregorian_long} />
                        <CopyField text={gregorian_standard} />
                        <CopyField text={gregorian_short} />
                        <CopyField text={gregorian_iso} />
                        <CopyField text={gregorian_gedcom} />
                    </Grid.Column>
                    <Grid.Column>
                        <Menu className='discreteMenu'>
                            <Dropdown
                                fluid
                                placeholder='Jour...'
                                search
                                selection
                                value={frenchRepublican_day || ''}
                                options={frenchRepublican_days_options}
                                onChange={(event, data) => onFrenchRepublicanChanged(data.value, frenchRepublican_month, frenchRepublican_year)}
                            />
                            <Dropdown
                                fluid
                                placeholder='Mois...'
                                search
                                selection
                                value={frenchRepublican_month_default || ''}
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
                                value={frenchRepublican_year !== null ? frenchRepublican_year : ''}
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
                        <CopyField text={frenchRepublican_long} />
                        <CopyField text={frenchRepublican_standard} />
                        <CopyField text={frenchRepublican_short} />
                        <CopyField text={frenchRepublican_iso} />
                    </Grid.Column>
                </Grid>
                <Divider vertical><Icon fitted name='exchange'></Icon></Divider>
            </Segment>
        </Segment>
    );
}

export default Converter;
