import * as THREE from 'three';
import { useLayoutEffect, useRef } from 'react';
import { Color, extend, ReactThreeFiber } from '@react-three/fiber';

extend({ Line_: THREE.Line });

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>;
        }
    }
}

interface Props {
    points: THREE.Vector3[] | THREE.Vector2[];
    color: Color;
}

function Line({ points, color }: Props): JSX.Element {
    const lineRef = useRef<THREE.Line>({} as THREE.Line);

    useLayoutEffect(() => {
        lineRef.current.geometry.setFromPoints(points);
    }, [points]);

    return (
        <line_ ref={lineRef}>
            <bufferGeometry />
            <lineBasicMaterial color={color} />
        </line_>
    );
}

export default Line;
