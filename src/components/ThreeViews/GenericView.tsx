import { Canvas } from '@react-three/fiber';
import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';

const ViewStyles = styled.div`
    position: relative;
    min-width: 0;
    min-height: 0;

    #label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        z-index: 100;
    }
`;

type CanvasProp<T extends keyof U, U = ComponentProps<typeof Canvas>> = U[T];

const rendererProps: CanvasProp<'gl'> = {
    antialias: false,
};

const onCreated: CanvasProp<'onCreated'> = state => {
    state.camera.lookAt(0, 0, 0);
    state.gl.setClearColor('#0A1833');
};

interface Props {
    label: string;
    className?: string;
    children?: ReactNode;
}

function GenericView({ label, className, children }: Props): JSX.Element {
    return (
        <ViewStyles className={className}>
            <span id="label">{label}</span>
            <Canvas frameloop="demand" gl={rendererProps} onCreated={onCreated}>
                {children}
            </Canvas>
        </ViewStyles>
    );
}

export default GenericView;
