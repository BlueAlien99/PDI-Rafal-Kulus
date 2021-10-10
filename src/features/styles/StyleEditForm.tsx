import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useForm from 'hooks/useForm';
import Input from 'components/Input';
import BasicFormStyles from 'styles/BasicFormStyles';
import { currentStyleUpdated, selectCurrentStyle } from './stylesSlice';

function StyleEditForm(): JSX.Element {
    const currentStyle = useAppSelector(selectCurrentStyle);

    const { inputs, handleChange, resetForm } = useForm(currentStyle);

    const dispatch = useAppDispatch();

    useEffect(() => {
        resetForm();
    }, [currentStyle, resetForm]);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(currentStyleUpdated(inputs));
    };

    return (
        <BasicFormStyles onSubmit={handleOnSubmit}>
            <Input
                label="Overlay"
                type="color"
                name="overlayColor"
                inputs={inputs}
                onChange={handleChange}
            />
            <Input
                label="Background"
                type="color"
                name="clearColor"
                inputs={inputs}
                onChange={handleChange}
            />
            <Input
                label="Tracks"
                type="color"
                name="trackColor"
                inputs={inputs}
                onChange={handleChange}
            />
            <button type="submit">Apply</button>
        </BasicFormStyles>
    );
}

export default StyleEditForm;
