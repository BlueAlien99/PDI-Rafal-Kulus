import styled from 'styled-components';
import ThreeViews from 'components/ThreeViews';
import StatusBar from 'components/StatusBar';
import WebSocketConnection from './components/WebSocketConnection';

const AppStyles = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    overflow: auto;
`;

function App(): JSX.Element {
    return (
        <>
            <WebSocketConnection />

            <AppStyles>
                <ThreeViews />
                <StatusBar />
            </AppStyles>
        </>
    );
}

export default App;
