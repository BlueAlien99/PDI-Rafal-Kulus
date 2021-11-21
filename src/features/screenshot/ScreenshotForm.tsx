import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useForm from 'hooks/useForm';
import BasicFormStyles from 'styles/BasicFormStyles';
import Input from 'components/form/Input';
import {
    screenshotRequested,
    screenshotSizeUpdated,
    selectScreenshotSize,
} from './screenshotSlice';
import { hDiv, vDiv } from './dimensions';

function ScreenshotForm(): JSX.Element {
    const size = useAppSelector(selectScreenshotSize);

    const { inputs, handleChange, resetForm } = useForm(size);

    const dispatch = useAppDispatch();

    useEffect(() => {
        resetForm();
    }, [size, resetForm]);

    const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(screenshotSizeUpdated(inputs));
    };

    const requestPNGScreenshot = () =>
        dispatch(screenshotRequested({ viewId: -1, variant: 'png' }));
    const requestSVGScreenshot = () =>
        dispatch(screenshotRequested({ viewId: -1, variant: 'svg' }));

    return (
        <>
            <BasicFormStyles onSubmit={handleOnSubmit}>
                <span>
                    For best quality: <br /> W = {hDiv}n and H = {vDiv}n
                </span>
                <Input
                    label="Width"
                    type="number"
                    name="width"
                    inputs={inputs}
                    onChange={handleChange}
                    charWidth={5}
                />
                <Input
                    label="Height"
                    type="number"
                    name="height"
                    inputs={inputs}
                    onChange={handleChange}
                    charWidth={5}
                />
                <button type="submit">Apply</button>
            </BasicFormStyles>
            <hr />
            <BasicFormStyles>
                <span>
                    Size: {size.width}x{size.height}
                </span>
                <button type="button" onClick={requestPNGScreenshot}>
                    Save as PNG
                </button>
                <button type="button" onClick={requestSVGScreenshot}>
                    Save as SVG
                </button>
            </BasicFormStyles>
        </>
    );
}

export default ScreenshotForm;
