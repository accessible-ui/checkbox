/* eslint-disable jsx-a11y/label-has-associated-control */
/* jest */
import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Checkbox, Checked, Unchecked, Checkmark, Toggle} from './index'

describe('<Checkbox>', () => {
  it('should have a custom id', () => {
    const result = render(<Checkbox id='foobar' name='me' />)
    expect(result.asFragment()).toMatchSnapshot('checkbox--foobar')
  })

  it('should check and uncheck', () => {
    render(
      <label data-testid='label'>
        <Checkbox id='foobar' name='me' data-testid='cb' />
        check me
      </label>
    )

    expect(screen.getByTestId('cb')).not.toBeChecked()
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('cb')).toBeChecked()
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('cb')).not.toBeChecked()
  })

  it('should not change when disabled', () => {
    render(
      <label data-testid='label'>
        <Checkbox disabled id='foobar' name='me' data-testid='cb' />
        check me
      </label>
    )

    expect(screen.getByTestId('cb')).not.toBeChecked()
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('cb')).not.toBeChecked()
  })

  it('can be checked by default', () => {
    render(
      <label data-testid='label'>
        <Checkbox
          id='foobar'
          name='me'
          defaultChecked={true}
          data-testid='cb'
        />
        check me
      </label>
    )

    expect(screen.getByTestId('cb')).toBeChecked()
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('cb')).not.toBeChecked()
  })

  it('should focus and blur', () => {
    const focus = jest.fn()
    const blur = jest.fn()

    render(
      <label data-testid='label'>
        <Checkbox
          id='foobar'
          name='me'
          onFocus={focus}
          onBlur={blur}
          data-testid='cb'
        />
        check me
      </label>
    )

    fireEvent.focus(screen.getByTestId('cb'))
    expect(focus).toBeCalledTimes(1)
    fireEvent.blur(screen.getByTestId('cb'))
    expect(blur).toBeCalledTimes(1)
  })

  it('can be a controlled component', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox id='foobar' name='me' checked={true} data-testid='cb' />
        check me
      </label>
    )

    expect(screen.getByTestId('cb')).toBeChecked()
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('cb')).toBeChecked()

    result.rerender(
      <label data-testid='label'>
        <Checkbox id='foobar' name='me' checked={false} data-testid='cb' />
        check me
      </label>
    )

    expect(screen.getByTestId('cb')).not.toBeChecked()
    userEvent.click(screen.getByTestId('label'))
    expect(screen.getByTestId('cb')).not.toBeChecked()
  })
})

describe('<Checked>', () => {
  it('should be null when unchecked', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox id='foobar' name='me' data-testid='cb'>
          <Checked>Checked</Checked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })

  it('should display when checked', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox id='foobar' name='me' checked data-testid='cb'>
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
      <label data-testid='label'>
        <Checkbox id='foobar' checked name='me' data-testid='cb'>
          <Unchecked>Unchecked</Unchecked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })

  it('should display when unchecked', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox id='foobar' name='me' data-testid='cb'>
          <Unchecked>Unchecked</Unchecked>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot()
  })
})

describe('<Toggle>', () => {
  it('should toggle checkbox on and off', () => {
    render(
      <Checkbox id='foobar' name='me' data-testid='cb'>
        <Toggle>
          <button data-testid='toggle'>Toggle checked</button>
        </Toggle>
      </Checkbox>
    )

    expect(screen.getByTestId('cb')).not.toBeChecked()
    userEvent.click(screen.getByTestId('toggle'))
    expect(screen.getByTestId('cb')).toBeChecked()
    userEvent.click(screen.getByTestId('toggle'))
    expect(screen.getByTestId('cb')).not.toBeChecked()
  })
})

describe('<Checkmark>', () => {
  it('should have `checked` class name when checked', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox defaultChecked name='me' data-testid='cb'>
          <Checkmark checkedClass='checked'>
            <span>Checkmark</span>
          </Checkmark>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot('checked')
    userEvent.click(screen.getByTestId('label'))
    expect(result.asFragment()).toMatchSnapshot('unchecked')
  })

  it('should have `unchecked` class name when checked', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox name='me' data-testid='cb'>
          <Checkmark uncheckedClass='unchecked'>
            <span>Checkmark</span>
          </Checkmark>
        </Checkbox>
      </label>
    )

    expect(result.asFragment()).toMatchSnapshot('unchecked')
    userEvent.click(screen.getByTestId('label'))
    expect(result.asFragment()).toMatchSnapshot('checked')
  })

  it('should apply checked and unchecked styles', () => {
    const result = render(
      <label data-testid='label'>
        <Checkbox defaultChecked name='me' data-testid='cb'>
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
    userEvent.click(screen.getByTestId('label'))
    expect(result.asFragment()).toMatchSnapshot('unchecked')
  })
})
