import * as React from 'react';
export declare const CheckboxContext: React.Context<CheckboxContextValue>;
export declare const useCheckbox: () => CheckboxContextValue;
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export declare function Checked({ children }: CheckedProps): JSX.Element | null;
export declare namespace Checked {
    var displayName: string;
}
export declare function Unchecked({ children }: UncheckedProps): JSX.Element | null;
export declare namespace Unchecked {
    var displayName: string;
}
export declare function Checkmark({ children, checkedClass, uncheckedClass, checkedStyle, uncheckedStyle, }: CheckmarkProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare function Toggle({ children }: ToggleProps): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export declare namespace Toggle {
    var displayName: string;
}
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => any;
    onFocus?: (event: React.FocusEvent) => any;
    onBlur?: (event: React.FocusEvent) => any;
    children?: React.ReactNode;
}
export interface CheckedProps {
    children: React.ReactNode;
}
export interface UncheckedProps {
    children: React.ReactNode;
}
export interface CheckmarkProps {
    checkedClass?: string;
    uncheckedClass?: string;
    checkedStyle?: React.CSSProperties;
    uncheckedStyle?: React.CSSProperties;
    children: JSX.Element | React.ReactElement;
}
export interface ToggleProps {
    children: JSX.Element | React.ReactElement;
}
export interface CheckboxContextValue {
    checked: boolean;
    check: () => void;
    uncheck: () => void;
    toggle: () => void;
    focused: boolean;
    disabled: boolean;
}
