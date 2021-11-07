import styled from 'styled-components';
import { Vector3 } from 'three';
import { OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useAppSelector } from 'hooks/redux';
import { selectAliceData } from 'features/aliceData/aliceDataSlice';
import { selectCurrentStyle } from 'features/styles/stylesSlice';
import Line from './three/Line';
import GenericView from './GenericView';

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
    const style = useAppSelector(selectCurrentStyle);

    const scene = aliceData.tracks.map(track => {
        const points = track.points.map(point => new Vector3(...point));

        return <Line key={track.id} points={points} color={style.trackColor} />;
    });

    return (
        <ThreeViewsStyles>
            <GenericView
                viewId={0}
                label="3D View"
                className="main-view"
                controlsProps={{ dampingFactor: 0.1 }}
            >
                <PerspectiveCamera
                    fov={60}
                    near={1}
                    far={5000}
                    position={[1000, 1000, 1000]}
                    makeDefault
                />
                {scene}
            </GenericView>
            <GenericView
                viewId={1}
                label="R-Phi View"
                controlsProps={{ enableRotate: false, enableDamping: false }}
            >
                <OrthographicCamera near={1} far={5000} position={[0, 0, 1000]} makeDefault />
                {scene}
            </GenericView>
            <GenericView
                viewId={2}
                label="Rho-Z View"
                controlsProps={{ enableRotate: false, enableDamping: false }}
            >
                <OrthographicCamera near={1} far={5000} position={[1000, 0, 0]} makeDefault />
                {scene}
            </GenericView>
        </ThreeViewsStyles>
    );
}

export default ThreeViews;
