import * as React from 'react'
import {VisuallyHidden} from '@accessible/visually-hidden'
import useSwitch from '@react-hook/switch'
import clsx from 'clsx'

const CheckboxContext = React.createContext<CheckboxContextValue>({
  checked: false,
  check: noop,
  uncheck: noop,
  toggle: noop,
  focused: false,
  disabled: false,
})

export const useCheckbox = () => {
  const context = React.useContext<CheckboxContextValue>(CheckboxContext)
  if (context === undefined) {
    throw new Error('useCheckbox must be used within a CheckboxContext')
  }
  return context
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked,
      disabled = false,
      onChange,
      onFocus,
      onBlur,
      children,
      ...props
    },
    ref
  ) => {
    const [checked, toggle] = useSwitch(
      defaultChecked,
      controlledChecked,
      onChange
    )
    const [focused, setFocused] = React.useState<boolean>(false)
    const context = React.useMemo(
      () => ({
        checked: checked as boolean,
        check: disabled ? noop : toggle.on,
        uncheck: disabled ? noop : toggle.off,
        toggle: disabled ? noop : toggle,
        focused,
        disabled,
      }),
      [checked, focused, disabled, toggle]
    )

    return (
      <CheckboxContext.Provider value={context}>
        <VisuallyHidden>
          <input
            type='checkbox'
            checked={checked}
            ref={ref}
            onChange={() => {
              toggle()
            }}
            onFocus={(e) => {
              setFocused(true)
              onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              onBlur?.(e)
            }}
            disabled={disabled}
            {...props}
          />
        </VisuallyHidden>

        {children}
      </CheckboxContext.Provider>
    )
  }
)

export function Checked({children}: CheckedProps) {
  return useCheckbox().checked ? (
    <React.Fragment>{children}</React.Fragment>
  ) : null
}

export function Unchecked({children}: UncheckedProps) {
  return !useCheckbox().checked ? (
    <React.Fragment>{children}</React.Fragment>
  ) : null
}

export function Checkmark({
  children,
  checkedClass,
  uncheckedClass,
  checkedStyle,
  uncheckedStyle,
}: CheckmarkProps) {
  const {checked} = useCheckbox()
  return React.cloneElement(children, {
    className:
      clsx(children.props.className, checked ? checkedClass : uncheckedClass) ||
      void 0,
    style: Object.assign(
      {},
      children.props.style,
      checked ? checkedStyle : uncheckedStyle
    ),
  })
}

export function Toggle({children}: ToggleProps) {
  const {toggle} = useCheckbox()
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      children.props.onClick?.(e)
      toggle()
    },
  })
}

function noop() {}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => any
  onFocus?: (event: React.FocusEvent) => any
  onBlur?: (event: React.FocusEvent) => any
  children?: React.ReactNode
}

export interface CheckedProps {
  children: React.ReactNode
}

export interface UncheckedProps {
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

/* istanbul ignore next */
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox'
  Checked.displayName = 'Checked'
  Unchecked.displayName = 'Unchecked'
  Toggle.displayName = 'Toggle'
}
