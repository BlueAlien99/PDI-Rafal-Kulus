import { Canvas } from '@react-three/fiber';
import { ComponentProps, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { useAppSelector } from 'hooks/redux';
import { selectCurrentStyle } from 'features/styles/stylesSlice';
import TakeScreenshot from './three/TakeScreenshot';
import CameraManager from './three/CameraManager';

const ViewStyles = styled.div<{ textColor: string }>`
    position: relative;
    min-width: 0;
    min-height: 0;

    .overlay {
        position: absolute;
        color: ${props => props.textColor};
        opacity: 0.17;
        z-index: 100;

        &:hover {
            opacity: 0.67;
        }
    }

    .label {
        left: 50%;
        transform: translateX(-50%);
    }

    .actions {
        display: flex;
        flex-direction: column;
        right: 0;
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
    controlsProps?: ComponentProps<typeof OrbitControls>;
    className?: string;
    children?: ReactNode;
}

function GenericView({ label, controlsProps, className, children }: Props): JSX.Element {
    const [screenshot, setScreenshot] = useState({
        requested: false,
        variant: '' as ComponentProps<typeof TakeScreenshot>['variant'],
    });

    const requestPNGScreenshot = () => setScreenshot({ requested: true, variant: 'png' });
    const requestSVGScreenshot = () => setScreenshot({ requested: true, variant: 'svg' });
    const screenshotTaken = () => setScreenshot(prevState => ({ ...prevState, requested: false }));

    const style = useAppSelector(selectCurrentStyle);

    const cameraControlsRef = useRef<HTMLDivElement | null>(null);
    const orbitControlsRef = useRef<OrbitControlsImpl | null>(null);

    return (
        <ViewStyles className={className} textColor={style.overlayColor}>
            <div className="overlay camera" ref={cameraControlsRef} />
            <span className="overlay label">{label}</span>
            <div className="overlay actions">
                <button type="button" onClick={requestPNGScreenshot}>
                    Save as PNG
                </button>
                <button type="button" onClick={requestSVGScreenshot}>
                    Save as SVG
                </button>
            </div>
            <Canvas frameloop="demand" gl={rendererProps} onCreated={onCreated}>
                <color attach="background" args={[style.clearColor]} />
                <TakeScreenshot
                    requested={screenshot.requested}
                    variant={screenshot.variant}
                    label={label}
                    done={screenshotTaken}
                />
                {cameraControlsRef.current && orbitControlsRef.current && (
                    <CameraManager
                        cameraControlsContainer={cameraControlsRef.current}
                        orbitControls={orbitControlsRef.current}
                    />
                )}
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <OrbitControls ref={orbitControlsRef} {...controlsProps} />
                {children}
            </Canvas>
        </ViewStyles>
    );
}

export default GenericView;
