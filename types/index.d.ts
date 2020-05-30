import * as React from 'react'
export declare const CheckboxContext: React.Context<CheckboxContextValue>,
  useCheckbox: () => CheckboxContextValue,
  useChecked: () => boolean,
  useFocused: () => boolean,
  useDisabled: () => boolean,
  useControls: () => CheckboxControls
export declare const Checkbox: React.FC<CheckboxProps>
export declare const Checked: React.FC<CheckedProps>
export interface UncheckedProps {
  children: React.ReactNode
}
export declare const Unchecked: React.FC<UncheckedProps>
export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => any
  onFocus?: (event: React.FocusEvent) => any
  onBlur?: (event: React.FocusEvent) => any
  children?:
    | React.ReactNode
    | React.ReactNode[]
    | ((context: CheckboxContextValue) => React.ReactNode)
  [property: string]: any
}
export declare const Checkmark: React.FC<CheckmarkProps>
export declare const Toggle: React.FC<ToggleProps>
export interface CheckedProps {
  children: React.ReactNode
}
export interface CheckmarkProps {
  checkedClass?: string
  uncheckedClass?: string
  checkedStyle?: React.CSSProperties
  uncheckedStyle?: React.CSSProperties
  children: JSX.Element | React.ReactElement
}
export interface ToggleProps {
  children: JSX.Element | React.ReactElement
}
export interface CheckboxContextValue {
  checked: boolean
  check: () => void
  uncheck: () => void
  toggle: () => void
  focused: boolean
  disabled: boolean
}
export interface CheckboxControls {
  check: () => void
  uncheck: () => void
  toggle: () => void
}
