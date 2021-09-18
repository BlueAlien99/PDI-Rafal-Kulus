import { Canvas } from '@react-three/fiber';
import { ComponentProps, ReactNode } from 'react';

const cameraProps: ComponentProps<typeof Canvas>['camera'] = {
    fov: 50,
    near: 1,
    far: 5000,
    position: [1000, 1100, 1100],
};

const rendererProps: ComponentProps<typeof Canvas>['gl'] = {
    antialias: false,
};

const onCreated: ComponentProps<typeof Canvas>['onCreated'] = state => {
    state.camera.lookAt(0, 0, 0);
    state.gl.setClearColor('#0A1833');
};

interface Props {
    className: string;
    children: ReactNode;
}

function View3D({ className, children }: Props): JSX.Element {
    return (
        <Canvas className={className} camera={cameraProps} gl={rendererProps} onCreated={onCreated}>
            {children}
        </Canvas>
    );
}

export default View3D;
