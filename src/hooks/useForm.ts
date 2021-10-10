import { ChangeEvent, useCallback, useState } from 'react';

interface UseForm<T> {
    inputs: T;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    resetForm: () => void;
}

export default function useForm<T>(initial: T): UseForm<T> {
    const [inputs, setInputs] = useState<T>(initial);

    const handleChange: UseForm<T>['handleChange'] = useCallback(e => {
        const { value, name } = e.target;

        setInputs(oldInputs => ({
            ...oldInputs,
            [name]: value,
        }));
    }, []);

    const resetForm = useCallback(() => setInputs(initial), [initial]);

    return {
        inputs,
        handleChange,
        resetForm,
    };
}
