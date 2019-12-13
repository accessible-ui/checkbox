import React, {useState, useCallback, useMemo, useContext} from 'react'
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

// @ts-ignore
export const Checkbox: React.FC<CheckboxProps> = React.forwardRef<
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

export const Checked: React.FC<CheckedProps> = ({children}) => {
  const checked = useChecked()
  return checked ? <>{children}</> : null
}

export interface UncheckedProps {
  children: React.ReactNode
}

export const Unchecked: React.FC<UncheckedProps> = ({children}) => {
  const checked = useChecked()
  return !checked ? <>{children}</> : null
}

export interface ToggleProps {
  children: JSX.Element | React.ReactElement
}

export const Toggle: React.FC<ToggleProps> = ({children}) => {
  const {toggle} = useControls()
  const onClick = useCallback(
    e => {
      toggle()
      children.props.onClick?.(e)
    },
    [toggle, children.props.onClick]
  )

  return React.cloneElement(children, {onClick})
}

/* istanbul ignore next */
if (__DEV__) {
  Checkbox.displayName = 'Checkbox'
  Checked.displayName = 'Checked'
  Unchecked.displayName = 'Unchecked'
  Toggle.displayName = 'Toggle'
}
