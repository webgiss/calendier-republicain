// import 'semantic-ui-css/semantic.min.css'
import './semantic.min.css'
import './App.css';
import { Route, HashRouter, Routes } from 'react-router-dom'
import Converters from '../Converters';

const App = () => {
    return (
        <div className="App">
            <HashRouter>
                <Routes>
                    <Route exact path="/" element={<Converters/>} />
                </Routes>
            </HashRouter>
        </div>

    );
}

export default App;
