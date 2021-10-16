import { RootState, Size, useFrame } from '@react-three/fiber';
import { toISOStringWithTimezone } from 'utils/date';

const render = ({ gl, scene, camera, setSize }: RootState, size: Size) => {
    setSize(size.width, size.height);
    gl.render(scene, camera);
};

interface Props {
    label: string;
    done: () => void;
}

function TakeScreenshot({ label, done }: Props): null {
    useFrame(rootState => {
        render(rootState, { width: 1920, height: 1080 });

        const imageData = rootState.gl.domElement
            .toDataURL('image/png')
            .replace('image/png', 'image/octet-stream');

        const link = document.createElement('a');
        link.href = imageData;
        link.download = `${toISOStringWithTimezone(new Date())}__${label}.png`;
        link.click();

        render(rootState, rootState.size);

        done();
    }, 1);

    return null;
}

export default TakeScreenshot;
