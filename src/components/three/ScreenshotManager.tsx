import { Camera, OrthographicCamera, PerspectiveCamera, WebGLRenderer } from 'three';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';
import { RootState, Size, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useState } from 'react';
import {
    screenshotTaken,
    selectScreenshotRequest,
    selectScreenshotSize,
    SupportedVariants,
} from 'features/screenshot/screenshotSlice';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { generateFilename, SVGElementToUrl } from 'features/screenshot/utils';

const getUpdatedCamera = (camera: Readonly<Camera>, source: Size, target: Size): Camera => {
    const updatedCamera = camera.clone(true);

    const sourceRatio = source.width / source.height;
    const targetRatio = target.width / target.height;

    if (updatedCamera instanceof PerspectiveCamera) {
        updatedCamera.aspect = targetRatio;
        updatedCamera.updateProjectionMatrix();
    }

    if (updatedCamera instanceof OrthographicCamera) {
        if (targetRatio > sourceRatio) {
            const width = source.height * targetRatio;
            updatedCamera.left = -width / 2;
            updatedCamera.right = width / 2;
        } else {
            const height = source.width / targetRatio;
            updatedCamera.bottom = -height / 2;
            updatedCamera.top = height / 2;
        }
        updatedCamera.updateProjectionMatrix();
    }

    return updatedCamera;
};

type SupportedRenderers = WebGLRenderer | SVGRenderer;

const render = <T extends SupportedRenderers>(
    renderer: T,
    { scene, camera, size }: RootState,
    targetSize: Size
): T => {
    renderer.setSize(targetSize.width, targetSize.height);
    renderer.render(scene, getUpdatedCamera(camera, size, targetSize));
    return renderer;
};

const getImageUrl = (
    variant: SupportedVariants,
    rootState: RootState,
    targetSize: Size
): string => {
    if (variant === 'png') {
        const renderer = render(new WebGLRenderer(), rootState, targetSize);
        const imageUrl = renderer.domElement.toDataURL('image/png');
        renderer.forceContextLoss();
        return imageUrl;
    }
    if (variant === 'svg') {
        return SVGElementToUrl(render(new SVGRenderer(), rootState, targetSize).domElement);
    }
    const _exhaustiveCheck: never = variant;
    return _exhaustiveCheck;
};

interface Props {
    viewId: number;
    label: string;
}

function ScreenshotManager({ viewId, label }: Props): null {
    const dispatch = useAppDispatch();

    const getRootState = useThree(state => state.get);

    const targetSize = useAppSelector(selectScreenshotSize);

    const [lastRequest, setLastRequest] = useState(0);

    const takeScreenshot = useCallback(
        (requestId: number, variant: SupportedVariants) => {
            dispatch(
                screenshotTaken({
                    requestId,
                    viewId,
                    variant,
                    imageData: getImageUrl(variant, getRootState(), targetSize),
                    filename: generateFilename(new Date(), label, variant),
                })
            );
        },
        [dispatch, getRootState, label, targetSize, viewId]
    );

    const request = useAppSelector(selectScreenshotRequest);

    useEffect(() => {
        if (request.id !== lastRequest && (request.viewId === viewId || request.viewId === -1)) {
            takeScreenshot(request.id, request.variant);
            setLastRequest(request.id);
        }
    }, [lastRequest, request, takeScreenshot, viewId]);

    return null;
}

export default ScreenshotManager;
