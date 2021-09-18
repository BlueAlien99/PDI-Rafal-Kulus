import * as THREE from 'three';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { selectAliceData } from 'features/aliceData/aliceDataSlice';
import View3D from './ThreeViews/View3D';
import Line from './ThreeComponents/Line';

const ThreeViewsStyles = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 4px;
    align-content: center;
    justify-content: center;

    .main-view {
        grid-row: span 2;
    }
`;

function ThreeViews(): JSX.Element {
    const aliceData = useAppSelector(selectAliceData);

    const scene = aliceData.tracks.map(track => {
        const points = track.points.map(point => new THREE.Vector3(...point));

        return <Line key={track.id} points={points} color="#ffb732" />;
    });

    return (
        <ThreeViewsStyles>
            <View3D className="main-view">{scene}</View3D>
            <p>R-Phi View</p>
            <p>Rho-Z View</p>
        </ThreeViewsStyles>
    );
}

export default ThreeViews;
