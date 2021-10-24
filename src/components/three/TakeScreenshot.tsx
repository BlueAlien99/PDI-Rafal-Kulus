import { Camera, OrthographicCamera, PerspectiveCamera, WebGLRenderer } from 'three';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';
import { RootState, Size, useThree } from '@react-three/fiber';
import { toISOStringWithTimezone } from 'utils/date';
import useActionRequest, { UseActionRequestProps } from 'hooks/useActionRequest';

const getUpdatedCamera = (camera: Readonly<Camera>, source: Size, target: Size): Camera => {
    const updatedCamera = camera.clone();

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
    const updatedCamera = getUpdatedCamera(camera, size, targetSize);
    renderer.render(scene, updatedCamera);
    return renderer;
};

const getPNGImageUrl = (rootState: RootState, targetSize: Size) => {
    const renderer = render(rootState.gl, rootState, targetSize);

    return renderer.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream');
};

const getSVGImageUrl = (rootState: RootState, targetSize: Size) => {
    const renderer = render(new SVGRenderer(), rootState, targetSize);

    const imageData = new XMLSerializer().serializeToString(renderer.domElement);
    const imageBlob = new Blob([imageData], {
        type: 'image/svg+xml;charset=utf-8',
    });
    return URL.createObjectURL(imageBlob);
};

interface Props extends Omit<UseActionRequestProps, 'action'> {
    variant: 'png' | 'svg';
    label: string;
}

function TakeScreenshot({ requested, variant, label, done }: Props): null {
    const getRootState = useThree(state => state.get);

    const takeScreenshot = () => {
        const rootState = getRootState();
        const targetSize: Size = { width: 1920, height: 1080 };

        let imageUrl = '';

        if (variant === 'png') {
            imageUrl = getPNGImageUrl(rootState, targetSize);
        } else if (variant === 'svg') {
            imageUrl = getSVGImageUrl(rootState, targetSize);
        } else {
            const _exhaustiveCheck: never = variant;
            return _exhaustiveCheck;
        }

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${toISOStringWithTimezone(new Date())}__${label}.${variant}`;
        link.click();

        render(rootState.gl, rootState, rootState.size);
    };

    useActionRequest({ requested, action: takeScreenshot, done });

    return null;
}

export default TakeScreenshot;
