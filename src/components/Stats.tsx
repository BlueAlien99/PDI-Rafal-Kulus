import { useEffect, useRef, useState } from 'react';
import { animationFrames, fromEvent } from 'rxjs';
import styled from 'styled-components';
import StatsImpl from 'stats.js';

const StatsStyles = styled.div`
    display: inline-flex;
    flex-direction: column;

    > * {
        position: static !important;
    }
`;

function Stats(): JSX.Element {
    const [resetCount, setResetCount] = useState(0);
    const reset = () => setResetCount(prevCount => prevCount + 1);

    const statsRef = useRef<HTMLDivElement>({} as HTMLDivElement);

    useEffect(() => {
        const statsParent = statsRef.current;

        const statsImpl = new StatsImpl();
        statsParent.prepend(statsImpl.dom);

        statsImpl.begin();

        const framesSubscription = animationFrames().subscribe(() => {
            statsImpl.update();
        });

        const visibilitySubscription = fromEvent(document, 'visibilitychange').subscribe(() => {
            statsImpl.begin();
        });

        return () => {
            visibilitySubscription.unsubscribe();
            framesSubscription.unsubscribe();
            statsParent.removeChild(statsImpl.dom);
        };
    }, [resetCount]);

    return (
        <StatsStyles ref={statsRef}>
            <button type="button" onClick={reset}>
                Reset
            </button>
        </StatsStyles>
    );
}

export default Stats;
