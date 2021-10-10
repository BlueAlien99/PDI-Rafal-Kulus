import styled from 'styled-components';
import Sidebar from 'components/Sidebar';
import ThreeViews from 'components/ThreeViews';
import StatusBar from 'components/StatusBar';
import WebSocketConnection from 'features/webSocket/WebSocketConnection';

const AppStyles = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr auto;
    overflow: auto;
`;

function App(): JSX.Element {
    return (
        <>
            <WebSocketConnection />

            <AppStyles>
                <Sidebar />
                <ThreeViews />
                <StatusBar />
            </AppStyles>
        </>
    );
}

export default App;
