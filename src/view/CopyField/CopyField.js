import { Input } from 'semantic-ui-react'

const CopyField = ({ text, onCopy }) => {
    onCopy = onCopy ? onCopy : (text) => {}
    return (
        <Input
            fluid
            className='CopyField'
            readonly
            value={text}
            action={{
                color: 'blue',
                labelPosition: 'right',
                icon: 'copy',
                content: 'Copy',
                onClick: ()=>onCopy(text),
            }}
            
        />
    )
}

export default CopyField;