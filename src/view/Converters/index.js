import Internal from './Converters'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../reducers/calendar';

const Converters = () => {
    const convertersLength = useSelector(state => state.calendar.converters.length);
    const dispatch = useDispatch();
    const onAddConverter = () => dispatch(actions.addConverter())
    return Internal({ convertersLength, onAddConverter })
}

export default Converters