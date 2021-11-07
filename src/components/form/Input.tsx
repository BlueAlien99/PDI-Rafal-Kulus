import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface LabelStylesProps {
    charWidth?: number;
}

const LabelStyles = styled.label<LabelStylesProps>`
    display: block;

    input {
        ${({ charWidth }) =>
            charWidth &&
            css`
                width: ${charWidth}em;
            `}
    }
`;

type AnyObject = Record<string, string | number>;

interface OwnProps<T extends AnyObject> extends LabelStylesProps {
    label: string;
    inputs: T;
    name: keyof T & string;
}

type Props<T extends AnyObject> = OwnProps<T> &
    Omit<
        DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        keyof OwnProps<T> | 'value'
    >;

export default function Input<T extends AnyObject>({
    label,
    inputs,
    name,
    charWidth,
    ...rest
}: Props<T>): JSX.Element {
    return (
        <LabelStyles charWidth={charWidth}>
            {label}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input value={inputs[name]} name={name} {...rest} />
        </LabelStyles>
    );
}
