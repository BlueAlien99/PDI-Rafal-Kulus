import { Canvas } from '@react-three/fiber';
import { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'hooks/redux';
import { selectCurrentStyle } from 'features/styles/stylesSlice';

const ViewStyles = styled.div<{ textColor: string }>`
    position: relative;
    min-width: 0;
    min-height: 0;

    #label {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: ${props => props.textColor};
        z-index: 100;
    }
`;

type CanvasProp<T extends keyof U, U = ComponentProps<typeof Canvas>> = U[T];

const rendererProps: CanvasProp<'gl'> = {
    antialias: false,
};

const onCreated: CanvasProp<'onCreated'> = state => {
    state.camera.lookAt(0, 0, 0);
};

interface Props {
    label: string;
    className?: string;
    children?: ReactNode;
}

function GenericView({ label, className, children }: Props): JSX.Element {
    const style = useAppSelector(selectCurrentStyle);

    return (
        <ViewStyles className={className} textColor={style.overlayColor}>
            <span id="label">{label}</span>
            <Canvas frameloop="demand" gl={rendererProps} onCreated={onCreated}>
                <color attach="background" args={[style.clearColor]} />
                {children}
            </Canvas>
        </ViewStyles>
    );
}

export default GenericView;
