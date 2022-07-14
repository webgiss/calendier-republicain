import Converter from "../Converter";
import { Container, Icon, Button, Header } from 'semantic-ui-react'

const Converters = ({ convertersLength, onAddConverter }) => {
    return (
        <Container className='Converters'>
            <Header as='h1'>Conversion entre calendriers grégorien et français républicain (révolutionnaire)</Header>
            <Button color='blue' onClick={() => onAddConverter()}><Icon name='plus' />Ajouter une section de conversion</Button>
            {[...new Array(convertersLength).keys()].map(idConv => <Converter idConv={idConv} key={idConv} />)}
        </Container>
    )
}

export default Converters;