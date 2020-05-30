/* jest */
import React from 'react'
import {renderHook} from '@testing-library/react-hooks'
import {render, fireEvent} from '@testing-library/react'
import {
  Checkbox,
  Checked,
  Unchecked,
  Checkmark,
  Toggle,
  useFocused,
  useControls,
} from './index'

describe('<Checkbox>', () => {
  it('should have a custom id', () => {
    const result = render(<Checkbox id="foobar" name="me" />)
    expect(result.asFragment()).toMatchSnapshot('checkbox--foobar')
  })

  it('should check and uncheck', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox id="foobar" name="me" data-testid="cb" />
        check me
      </label>
    )

    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
    fireEvent.click(result.getByTestId('label'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)
    fireEvent.click(result.getByTestId('label'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
  })

  it('should not change when disabled', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox disabled id="foobar" name="me" data-testid="cb" />
        check me
      </label>
    )

    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
    fireEvent.click(result.getByTestId('label'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
  })

  it('can be checked by default', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox
          id="foobar"
          name="me"
          defaultChecked={true}
          data-testid="cb"
        />
        check me
      </label>
    )

    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)
    fireEvent.click(result.getByTestId('label'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
  })

  it('can be a controlled component', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox id="foobar" name="me" checked={true} data-testid="cb" />
        check me
      </label>
    )

    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)
    fireEvent.click(result.getByTestId('label'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)

    result.rerender(
      <label data-testid="label">
        <Checkbox id="foobar" name="me" checked={false} data-testid="cb" />
        check me
      </label>
    )

    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
    fireEvent.click(result.getByTestId('label'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
  })

  it('should provide context to function child', () => {
    let cxt

    render(
      <Checkbox>
        {(context) => {
          cxt = context
          return <div />
        }}
      </Checkbox>
    )

    expect(cxt).toMatchSnapshot()
  })
})

describe('<Checked>', () => {
  it('should be null when unchecked', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox id="foobar" name="me" data-testid="cb">
          <Checked>Checked</Checked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })

  it('should display when checked', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox id="foobar" name="me" checked data-testid="cb">
          <Checked>Checked</Checked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot('checked')
  })
})

describe('<Unchecked>', () => {
  it('should be null when checked', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox id="foobar" checked name="me" data-testid="cb">
          <Unchecked>Unchecked</Unchecked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })

  it('should display when unchecked', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox id="foobar" name="me" data-testid="cb">
          <Unchecked>Unchecked</Unchecked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })
})

describe('<Toggle>', () => {
  it('should toggle checkbox on and off', () => {
    const result = render(
      <Checkbox id="foobar" name="me" data-testid="cb">
        <Toggle>
          <button data-testid="toggle">Toggle checked</button>
        </Toggle>
      </Checkbox>
    )

    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
    fireEvent.click(result.getByTestId('toggle'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)
    fireEvent.click(result.getByTestId('toggle'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
  })
})

describe('<Checkmark>', () => {
  it('should have `checked` class name when checked', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox defaultChecked name="me" data-testid="cb">
          <Checkmark checkedClass="checked">
            <span>Checkmark</span>
          </Checkmark>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot('checked')
    fireEvent.click(result.getByTestId('label'))
    expect(result.asFragment()).toMatchSnapshot('unchecked')
  })

  it('should have `unchecked` class name when checked', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox name="me" data-testid="cb">
          <Checkmark uncheckedClass="unchecked">
            <span>Checkmark</span>
          </Checkmark>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot('unchecked')
    fireEvent.click(result.getByTestId('label'))
    expect(result.asFragment()).toMatchSnapshot('checked')
  })

  it('should apply checked and unchecked styles', () => {
    const result = render(
      <label data-testid="label">
        <Checkbox defaultChecked name="me" data-testid="cb">
          <Checkmark
            checkedStyle={{display: 'block'}}
            uncheckedStyle={{display: 'none'}}
          >
            <span>Checkmark</span>
          </Checkmark>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot('checked')
    fireEvent.click(result.getByTestId('label'))
    expect(result.asFragment()).toMatchSnapshot('unchecked')
  })
})

describe('useFocused()', () => {
  it('should be `true` when focused, `false` when blurred', () => {
    const Focusable = () => {
      return <>{String(useFocused())}</>
    }

    const result = render(
      <Checkbox data-testid="cb">
        <Focusable />
      </Checkbox>
    )

    expect(result.asFragment()).toMatchSnapshot('false')
    fireEvent.focus(result.getByTestId('cb'))
    expect(result.asFragment()).toMatchSnapshot('true')
    fireEvent.blur(result.getByTestId('cb'))
    expect(result.asFragment()).toMatchSnapshot('false')
  })
})

describe('useControls()', () => {
  it('should have `check`, `uncheck`, `toggle` keys', () => {
    const {result} = renderHook(() => useControls(), {wrapper: Checkbox})
    expect(Object.keys(result.current)).toStrictEqual([
      'check',
      'uncheck',
      'toggle',
    ])
  })

  it('should change checked state', () => {
    const Component = () => {
      const {check, uncheck, toggle} = useControls()
      return (
        <>
          <button data-testid="check" onClick={check} />
          <button data-testid="uncheck" onClick={uncheck} />
          <button data-testid="toggle" onClick={toggle} />
        </>
      )
    }
    const result = render(
      <Checkbox data-testid="cb">
        <Component />
      </Checkbox>
    )
    fireEvent.click(result.getByTestId('check'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)
    fireEvent.click(result.getByTestId('uncheck'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(false)
    fireEvent.click(result.getByTestId('toggle'))
    expect((result.getByTestId('cb') as HTMLInputElement).checked).toBe(true)
  })
})
