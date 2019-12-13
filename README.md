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

An accessible checkbox component for React

## Quick Start

```jsx harmony
import {Checkbox} from '@accessible/checkbox'

const MyCheckbox = () => (
  <label className="my-checkbox">
    <Checkbox>
      <span className="my-checkbox">
        <Checkbox.Unchecked>
          <span className="checkmark" />
        </Checkbox.Unchecked>
        <Checkbox.Checked>
          <span className="checkmark checked" />
        </Checkbox.Checked>

        <span>Check me!</span>
      </span>
    </Checkbox>
  </label>
)
```

## API

### `<Checkbox>`

#### Props

| Prop | Type | Default | Required? | Description |
| ---- | ---- | ------- | --------- | ----------- |
|      |      |         |           |             |

### `<Checkbox.Checked>`

#### Props

| Prop | Type | Default | Required? | Description |
| ---- | ---- | ------- | --------- | ----------- |
|      |      |         |           |             |

### `<Checkbox.Unchecked>`

#### Props

| Prop | Type | Default | Required? | Description |
| ---- | ---- | ------- | --------- | ----------- |
|      |      |         |           |             |

### `useCheckbox()`

### `useChecked()`

### `useFocused()`

### `useControls()`

## LICENSE

MIT
