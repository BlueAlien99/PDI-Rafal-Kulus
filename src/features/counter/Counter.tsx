import { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'hooks/redux';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
    selectCount,
} from './counterSlice';

export function Counter(): JSX.Element {
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    return (
        <div>
            <div>
                <button
                    type="button"
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span>{count}</span>
                <button
                    type="button"
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>
            <div>
                <input
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => setIncrementAmount(e.target.value)}
                />
                <button type="button" onClick={() => dispatch(incrementByAmount(incrementValue))}>
                    Add Amount
                </button>
                <button type="button" onClick={() => dispatch(incrementAsync(incrementValue))}>
                    Add Async
                </button>
                <button type="button" onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                    Add If Odd
                </button>
            </div>
        </div>
    );
}
