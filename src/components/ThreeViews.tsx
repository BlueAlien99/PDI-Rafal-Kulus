import styled from 'styled-components';
import { OrbitControls } from '@react-three/drei';
import { OrthographicCamera, PerspectiveCamera, Vector3 } from 'three';
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
                label="3D View"
                className="main-view"
                camera={(() => {
                    const camera = new PerspectiveCamera(60, 1, 1, 5000);
                    camera.position.set(1000, 1000, 1000);
                    return camera;
                })()}
            >
                <OrbitControls />
                {scene}
            </GenericView>
            <GenericView
                label="R-Phi View"
                camera={(() => {
                    const camera = new OrthographicCamera(0, 0, 0, 0, 1, 5000);
                    camera.position.set(0, 0, 1000);
                    return camera;
                })()}
            >
                <OrbitControls enableRotate={false} enableDamping={false} />
                {scene}
            </GenericView>
            <GenericView
                label="Rho-Z View"
                camera={(() => {
                    const camera = new OrthographicCamera(0, 0, 0, 0, 1, 5000);
                    camera.position.set(1000, 0, 0);
                    return camera;
                })()}
            >
                <OrbitControls enableRotate={false} enableDamping={false} />
                {scene}
            </GenericView>
        </ThreeViewsStyles>
    );
}

export default ThreeViews;
