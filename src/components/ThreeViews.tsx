import * as THREE from 'three';
import styled from 'styled-components';
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useAppSelector } from 'hooks/redux';
import { selectAliceData } from 'features/aliceData/aliceDataSlice';
import Line from './ThreeComponents/Line';
import GenericView from './ThreeViews/GenericView';

const ThreeViewsStyles = styled.div`
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
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
            <GenericView label="3D View" className="main-view">
                <PerspectiveCamera
                    fov={60}
                    near={1}
                    far={5000}
                    position={[1000, 1000, 1000]}
                    makeDefault
                />
                <OrbitControls />
                {scene}
            </GenericView>
            <GenericView label="R-Phi View">
                <OrthographicCamera near={1} far={5000} position={[0, 0, 1000]} makeDefault />
                {scene}
            </GenericView>
            <GenericView label="Rho-Z View">
                <OrthographicCamera near={1} far={5000} position={[1000, 0, 0]} makeDefault />
                {scene}
            </GenericView>
        </ThreeViewsStyles>
    );
}

export default ThreeViews;
