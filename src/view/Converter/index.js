import Internal from './Converter'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../reducers/calendar';

const Converter = ({ idConv }) => {
    idConv = idConv || 0;
    const convertersLength = useSelector(state => state.calendar.converters.length);
    const indexIsValid = idConv >= 0 && idConv < convertersLength;

    const gregorian_day = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.day : null);
    const gregorian_month = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.month : null);
    const gregorian_year = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.year : null);

    const gregorian_long = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.long : '');
    const gregorian_standard = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.standard : '');
    const gregorian_short = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.short : '');
    const gregorian_iso = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.iso : '');
    const gregorian_gedcom = useSelector(state => indexIsValid ? state.calendar.converters[idConv].gregorian.gedcom : '');

    const frenchRepublican_day = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.day : null);
    const frenchRepublican_month = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.month : null);
    const frenchRepublican_year = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.year : null);

    const frenchRepublican_long = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.long : '')
    const frenchRepublican_standard = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.standard : '')
    const frenchRepublican_short = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.short : '')
    const frenchRepublican_iso = useSelector(state => indexIsValid ? state.calendar.converters[idConv].frenchRepublican.iso : '')

    const freeInput = useSelector(state => indexIsValid ? state.calendar.converters[idConv].freeInput : null) || '';
    const dispatch = useDispatch()
    const onGregorianChanged = (day, month, year) => dispatch(actions.setGregorian({ idConv, day, month, year }))
    const onFrenchRepublicanChanged = (day, month, year) => dispatch(actions.setFrenchRepublican({ idConv, day, month, year }))
    const onFreeInputChanged = (freeInput) => dispatch(actions.changeFreeInput({ idConv, freeInput }))
    const onClose = () => dispatch(actions.removeConverter({ idConv }))

    return Internal({
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
    })
}

export default Converter