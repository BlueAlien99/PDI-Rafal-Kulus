import styled from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { selectWebSocket } from 'features/webSocket/webSocketSlice';

const StatusBarStyles = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding: 0.2em;
    box-sizing: border-box;
`;

function StatusBar(): JSX.Element {
    const webSocketState = useAppSelector(selectWebSocket);

    return (
        <StatusBarStyles>
            <>WebSocket status: {webSocketState.status}</>
        </StatusBarStyles>
    );
}

export default StatusBar;
