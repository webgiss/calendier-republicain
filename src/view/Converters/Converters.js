import Converter from "../Converter";
import { Container, Button, Header } from 'semantic-ui-react'

const Converters = ({ convertersLength, onAddConverter }) => {
    return (
        <Container className='Converters'>
            <Header as='h1'>Conversion entre calendriers grégorien et français républicain (révolutionnaire)</Header>
            <Button icon='plus' color='blue' onClick={() => onAddConverter()}>Ajouter une section de conversion</Button>
            {[...new Array(convertersLength).keys()].map(idConv => <Converter idConv={idConv} key={idConv} />)}
        </Container>
    )
}

export default Converters;