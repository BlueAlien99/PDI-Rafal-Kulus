import { useThree } from '@react-three/fiber';
import { useEffect, useCallback, useState } from 'react';
import { OrthographicCamera, PerspectiveCamera } from 'three';
import useActionRequest, { UseActionRequestProps } from 'hooks/useActionRequest';

export type SupportedCameras = PerspectiveCamera | OrthographicCamera;

interface Props {
    defaultCamera: SupportedCameras;
    resetRequested: UseActionRequestProps['requested'];
    resetDone: UseActionRequestProps['done'];
}

function CameraManager({ defaultCamera, resetRequested, resetDone }: Props): null {
    const getRootState = useThree(state => state.get);

    const [initialCamera] = useState(defaultCamera);

    const resetCamera = useCallback(() => {
        const { size, set } = getRootState();
        const camera = initialCamera.clone(true);

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

        set({ camera });
    }, [initialCamera, getRootState]);

    useEffect(() => {
        resetCamera();
    }, [resetCamera]);

    useActionRequest({
        requested: resetRequested,
        action: resetCamera,
        done: resetDone,
    });

    return null;
}

export default CameraManager;
