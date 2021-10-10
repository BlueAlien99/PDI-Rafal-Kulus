import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useForm from 'hooks/useForm';
import BasicFormStyles from 'styles/BasicFormStyles';
import { currentStyleUpdated, selectCurrentStyle, selectStyles } from './stylesSlice';

function StyleSelectionForm(): JSX.Element {
    const styles = useAppSelector(selectStyles);
    const currentStyle = useAppSelector(selectCurrentStyle);

    const { inputs, handleChange } = useForm({
        styleName: currentStyle.name,
    });

    const dispatch = useAppDispatch();

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedStyle = styles.find(style => style.name === inputs.styleName);
        if (selectedStyle) {
            dispatch(currentStyleUpdated(selectedStyle));
        }
    };

    return (
        <BasicFormStyles onSubmit={handleOnSubmit}>
            <label>
                Style
                <select name="styleName" value={inputs.styleName} onChange={handleChange}>
                    {styles.map(({ name }) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="submit">Apply</button>
        </BasicFormStyles>
    );
}

export default StyleSelectionForm;
