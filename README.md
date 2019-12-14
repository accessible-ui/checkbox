<hr>
<div align="center">
  <h1 align="center">
    &lt;Checkbox&gt;
  </h1>
</div>

<p align="center">
  <a href="https://bundlephobia.com/result?p=@accessible/checkbox">
    <img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/@accessible/checkbox?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Types" href="https://www.npmjs.com/package/@accessible/checkbox">
    <img alt="Types" src="https://img.shields.io/npm/types/@accessible/checkbox?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Code coverage report" href="https://codecov.io/gh/accessible-ui/checkbox">
    <img alt="Code coverage" src="https://img.shields.io/codecov/c/gh/accessible-ui/checkbox?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="Build status" href="https://travis-ci.org/accessible-ui/checkbox">
    <img alt="Build status" src="https://img.shields.io/travis/accessible-ui/checkbox?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@accessible/checkbox">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@accessible/checkbox?style=for-the-badge&labelColor=24292e">
  </a>
  <a aria-label="License" href="https://jaredlunde.mit-license.org/">
    <img alt="MIT License" src="https://img.shields.io/npm/l/@accessible/checkbox?style=for-the-badge&labelColor=24292e">
  </a>
</p>

<pre align="center">npm i @accessible/checkbox</pre>
<hr>

An accessible checkbox component for React. This library allows you to create
your own a checkbox with your own styles while maintaining the ability to
focus and update a checkbox input with the keyboard.

## Quick Start

[Check out the example on CodeSandbox](https://codesandbox.io/s/accessiblecheckbox-examples-epc8b)

```jsx harmony
import {Checkbox, Checkmark} from '@accessible/checkbox'

const MyCheckbox = () => (
  <label className="my-checkbox">
    <Checkbox>
      <span className="my-checkbox">
        <Checkmark checkedClassName="checked" uncheckedClassName="unchecked">
          <span className="checkmark" />
        </Checkmark>
      </span>
    </Checkbox>
    Check me!
  </label>
)
```

## API

### `<Checkbox>`

Creates a visually hidden checkbox input that is focusable and accessible via keyboard navigation.
All props passed to this component are applied to the `<input>`. This also creates a context
provider enabling the other components in this library to access the checkbox's state
deep in the tree.

#### Props

| Prop           | Type                                                                                                               | Default     | Required? | Description                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------ | ----------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| id             | `string`                                                                                                           | `undefined` | No        | Creates an `id` that overrides the default auto id.                                                                      |
| checked        | `boolean`                                                                                                          | `undefined` | No        | Makes the checkbox a controlled component which can no longer be updated with `check`, `uncheck`, and `toggle` controls. |
| defaultChecked | `boolean`                                                                                                          | `undefined` | No        | Set this to `true` to make the checkbox `checked` by default.                                                            |
| children       | <code>React.ReactNode &#124; React.ReactNode[] &#124; ((context: CheckboxContextValue) => React.ReactChild)</code> | `undefined` | No        | Your custom styled checkbox.                                                                                             |

### `<Checkmark>`

A convenient component for conditionally adding class names and styles when the component is checked/unchecked.

#### Props

| Prop               | Type                  | Default               | Required? | Description                                                                            |
| ------------------ | --------------------- | --------------------- | --------- | -------------------------------------------------------------------------------------- |
| uncheckedClassName | `string`              | `undefined`           | No        | This class name will be applied to the child element when the checkbox is `unchecked`. |
| checkedClassName   | `string`              | `"checkbox--checked"` | No        | This class name will be applied to the child element when the checkbox is `checked`.   |
| uncheckedStyle     | `React.CSSProperties` | `undefined`           | No        | These styles will be applied to the child element when the checkbox is `unchecked`.    |
| checkedStyle       | `React.CSSProperties` | `undefined`           | No        | These styles name will be applied to the child element when the checkbox is `checked`. |
| children           | `React.ReactNode`     | `undefined`           | Yes       | The child you wish to render when the checkbox is checked.                             |

### `<Checked>`

The child of this component will only render when the checkbox is in
a `checked` state.

#### Props

| Prop     | Type              | Default     | Required? | Description                                                |
| -------- | ----------------- | ----------- | --------- | ---------------------------------------------------------- |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the checkbox is checked. |

### `<Unchecked>`

The child of this component will only render when the checkbox is in
an `unchecked` state.

#### Props

| Prop     | Type              | Default     | Required? | Description                                                  |
| -------- | ----------------- | ----------- | --------- | ------------------------------------------------------------ |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the checkbox is unchecked. |

### `<Toggle>`

This component clones its child and adds an `onClick` handler to toggle the checkbox between
`checked` and `unchecked` states.

#### Props

| Prop     | Type              | Default     | Required? | Description                                                  |
| -------- | ----------------- | ----------- | --------- | ------------------------------------------------------------ |
| children | `React.ReactNode` | `undefined` | Yes       | The child you wish to render when the checkbox is unchecked. |

### `useCheckbox()`
A React hook that returns the [`CheckboxContextValue`](#checkboxcontextvalue)

### `CheckboxContextValue`

```typescript
interface CheckboxContextValue {
  // Does the checkbox have a `checked` property?
  checked: boolean
  // Is the checkbox currently focused?
  focused: boolean
  // Checks the checkbox
  check: () => void
  // Unchecks the checkbox
  uncheck: () => void
  // Toggles the checkbox `checked` property
  toggle: () => void
  // This is the `id` of the <input>
  id: string
}
```

### `useChecked()`

Returns `true` when the checkbox is checked, otherwise `false`

### `useFocused()`

Returns `true` when the checkbox is focused, otherwise `false`

### `useControls()`

This hook provides access to the checkbox's `check`, `uncheck`, and `toggle` functions

#### Example

```jsx harmony
const Component = () => {
  const {check, uncheck, toggle} = useControls()
  return <button onClick={toggle}>Toggle me</button>
}
```

## LICENSE

MIT
