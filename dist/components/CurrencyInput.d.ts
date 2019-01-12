import React, { PureComponent } from 'react';
interface IProps {
    id: string;
    className?: string;
    limit?: number;
    prefix?: string;
    handleError?: () => void;
    onChange: (value: number) => void;
    placeholder?: string;
}
interface IState {
    value: string;
}
export declare class CurrencyInput extends PureComponent<IProps, IState> {
    private constructor();
    processChange(event: React.ChangeEvent<HTMLInputElement>): boolean;
    render(): JSX.Element;
}
export default CurrencyInput;
