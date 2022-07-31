import Converter from "../Converter";
import { Container, Icon, Button, Header, Grid } from 'semantic-ui-react'
import SubTitle from "../SubTitle";

const Converters = ({ convertersLength, onAddConverter }) => {
    return (
        <Container className='Converters'>
            <Header as='h1'>Conversion entre calendriers grégorien et français républicain (révolutionnaire)</Header>

            <Grid>
                <Grid.Row with={8}>
                    <Grid.Column width={8}>
                        <Button color='blue' onClick={() => onAddConverter()}><Icon name='plus' />Ajouter une section de conversion</Button>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <SubTitle />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            {[...new Array(convertersLength).keys()].map(idConv => <Converter idConv={idConv} key={idConv} />)}
        </Container>
    )
}

export default Converters;