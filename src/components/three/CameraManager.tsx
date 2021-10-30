import { Size, useThree } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { OrthographicCamera, PerspectiveCamera } from 'three';
import { render } from 'react-dom';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import styled from 'styled-components';
import useActionRequest from 'hooks/useActionRequest';

const ControlsStyles = styled.div`
    display: flex;
    flex-direction: column;

    .panel-label {
        text-align: center;
    }

    .btn-pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
`;

type SupportedCameras = PerspectiveCamera | OrthographicCamera;

const fixAspectRatio = (camera: SupportedCameras, size: Size): void => {
    if (camera instanceof PerspectiveCamera) {
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix();
    } else if (camera instanceof OrthographicCamera) {
        camera.left = size.width / -2;
        camera.right = size.width / 2;
        camera.top = size.height / 2;
        camera.bottom = size.height / -2;
        camera.updateProjectionMatrix();
    } else {
        const _exhaustiveCheck: never = camera;
        return _exhaustiveCheck;
    }
};

interface Props {
    cameraControlsContainer: HTMLDivElement;
    orbitControls: OrbitControlsImpl;
}

function CameraManager({ cameraControlsContainer, orbitControls }: Props): null {
    const getRootState = useThree(state => state.get);
    const invalidate = useThree(state => state.invalidate);
    const camera = useThree(state => state.camera);

    const [defaultControls] = useState({
        position0: orbitControls.position0.clone(),
        target0: orbitControls.target0.clone(),
        zoom0: orbitControls.zoom0,
    });
    const [defaultCamera] = useState(camera.clone(true));
    const [savedCamera, setSavedCamera] = useState(camera.clone(true));

    const [restorable, setRestorable] = useState(false);
    const [restoreRequested, setRestoreRequested] = useState(false);

    const resetCamera = useCallback(() => {
        const { size } = getRootState();

        orbitControls.position0 = defaultControls.position0.clone();
        orbitControls.target0 = defaultControls.target0.clone();
        orbitControls.zoom0 = defaultControls.zoom0;
        orbitControls.reset();

        camera.copy(defaultCamera as never, true);
        fixAspectRatio(camera, size);

        setRestorable(false);
    }, [camera, defaultCamera, defaultControls, getRootState, orbitControls]);

    const restoreCamera = useCallback(() => {
        const { size } = getRootState();

        orbitControls.reset();

        camera.copy(savedCamera as never, true);
        fixAspectRatio(camera, size);
    }, [camera, getRootState, orbitControls, savedCamera]);

    useActionRequest({
        requested: restoreRequested,
        action: restoreCamera,
        done: () => setRestoreRequested(false),
    });

    const handleSave = () => {
        orbitControls.saveState();
        setSavedCamera(camera.clone(true));
        setRestorable(true);
    };

    const handleRestore = () => {
        setRestoreRequested(true);
        invalidate();
    };

    if (cameraControlsContainer) {
        render(
            <ControlsStyles>
                <span className="panel-label">Camera controls</span>
                <div className="btn-pair">
                    <button type="button" onClick={handleSave}>
                        Save
                    </button>
                    <button type="button" onClick={handleRestore} disabled={!restorable}>
                        Restore
                    </button>
                </div>
                <button type="button" onClick={resetCamera}>
                    Reset
                </button>
            </ControlsStyles>,
            cameraControlsContainer
        );
    }

    return null;
}

export default CameraManager;
