import React, {useState, useMemo, useContext} from 'react'
import VisuallyHidden from '@accessible/visually-hidden'
import useSwitch from '@react-hook/switch'
import {useId} from '@reach/auto-id'

const __DEV__ =
  typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'

export interface CheckboxContextValue {
  checked: boolean
  check: () => void
  uncheck: () => void
  toggle: () => void
  focused: boolean
  id: string
}

export interface CheckboxControls {
  check: () => void
  uncheck: () => void
  toggle: () => void
}

// @ts-ignore
export const CheckboxContext = React.createContext<CheckboxContextValue>({}),
  useCheckbox = () => useContext<CheckboxContextValue>(CheckboxContext),
  useChecked = () => useCheckbox().checked,
  useFocused = () => useCheckbox().focused,
  useControls = (): CheckboxControls =>
    Object.entries(useCheckbox()).reduce((prev, [key, value]) => {
      if (typeof value === 'function') prev[key] = value
      return prev
    }, {}) as CheckboxControls

export interface CheckboxProps {
  id?: string
  checked?: boolean
  defaultChecked?: boolean
  children?:
    | React.ReactNode
    | React.ReactNode[]
    | ((context: CheckboxContextValue) => React.ReactChild)
  [property: string]: any
}

interface CheckboxComponent<T> extends React.FC<T> {
  Checked: React.FC<CheckedProps>
  Unchecked: React.FC<UncheckedProps>
}

// @ts-ignore
export const Checkbox: CheckboxComponent<CheckboxProps> = React.forwardRef<
  JSX.Element | React.ReactElement,
  CheckboxProps
>(({id, checked, defaultChecked, children, ...props}, ref: any) => {
  const [switchChecked, toggle] = useSwitch(defaultChecked)
  const [focused, setFocused] = useState<boolean>(false)
  checked = checked === void 0 || checked === null ? switchChecked : checked
  id = `checkbox--${useId(id)}`
  const context = useMemo(
    () => ({
      checked,
      check: toggle.on,
      uncheck: toggle.off,
      toggle,
      focused,
      id,
    }),
    [id, checked, focused, toggle, toggle.on, toggle.off]
  )
  // @ts-ignore
  children = typeof children === 'function' ? children(context) : children
  return (
    <CheckboxContext.Provider value={context}>
      <VisuallyHidden>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          ref={ref}
          onChange={e => {
            props.onChange?.(e)
            toggle()
          }}
          onFocus={e => {
            props.onFocus?.(e)
            setFocused(true)
          }}
          onBlur={e => {
            props.onBlur?.(e)
            setFocused(false)
          }}
          {...props}
        />
      </VisuallyHidden>

      {children === void 0 ? null : children}
    </CheckboxContext.Provider>
  )
})

export interface CheckedProps {
  children: React.ReactNode
}

const Checked: React.FC<CheckedProps> = ({children}) => {
  const checked = useChecked() as boolean
  return checked ? <>{children}</> : null
}

Checkbox.Checked = Checked

export interface UncheckedProps {
  children: React.ReactNode
}

const Unchecked: React.FC<UncheckedProps> = ({children}) => {
  const checked = useChecked() as boolean
  return !checked ? <>{children}</> : null
}

Checkbox.Unchecked = Unchecked

/* istanbul ignore next */
if (__DEV__) {
  Checkbox.displayName = 'Checkbox'
  Checkbox.Checked.displayName = 'Checked'
  Checkbox.Unchecked.displayName = 'Unchecked'
}
