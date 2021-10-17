import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const LabelStyles = styled.label`
    display: block;
`;

type AnyObject = Record<string, string>;

interface OwnProps<T extends AnyObject> {
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
    ...rest
}: Props<T>): JSX.Element {
    return (
        <LabelStyles>
            {label}
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input value={inputs[name]} name={name} {...rest} />
        </LabelStyles>
    );
}
