import { useLayoutEffect } from 'react';

interface Props {
    requested: boolean;
    action: () => void;
    done: () => void;
}

function useActionRequest({ requested, action, done }: Props): void {
    useLayoutEffect(() => {
        if (requested) {
            action();
            done();
        }
    }, [requested, action, done]);
}

export default useActionRequest;
export type UseActionRequestProps = Props;
