import Internal from './CopyField'
import { actions } from '../../reducers/calendar';
import { useDispatch } from 'react-redux'

const CopyField = ({ text }) => {
    const dispatch = useDispatch()
    const onCopy = (text) => dispatch(actions.copyToClipboard({ text }))
    return Internal({ text, onCopy })
}

export default CopyField