import styled from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { selectWebSocket } from 'features/webSocket/webSocketSlice';

const StatusBarStyles = styled.div`
    width: 100%;
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
