import styled from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { selectWebSocket } from 'features/webSocket/webSocketSlice';
import { selectAliceData } from 'features/aliceData/aliceDataSlice';
import StatusBarItem from './StatusBarItem';

const StatusBarStyles = styled.div`
    grid-column: 1 / -1;
    width: 100%;
    padding: 0.2em;
    box-sizing: border-box;

    display: grid;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    gap: 2em;
`;

function StatusBar(): JSX.Element {
    const webSocketState = useAppSelector(selectWebSocket);
    const aliceData = useAppSelector(selectAliceData);

    return (
        <StatusBarStyles>
            <StatusBarItem stat="WebSocket status" value={webSocketState.status} />
            <StatusBarItem
                stat="Tracks displayed"
                value={`${aliceData.tracks.length}/${aliceData.trackCount}`}
            />
            <StatusBarItem stat="Workflow date" value={aliceData.workflowDate} />
        </StatusBarStyles>
    );
}

export default StatusBar;
