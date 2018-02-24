import TogglableWhole from './TogglableWhole'
import React from 'react'
import { shallow } from 'enzyme'

describe('FullBlogInfo test', () => {
  let blog, component

  beforeEach(() => {
    blog = {
      title: 'test title',
      author: 'test author',
      likes: 4
    }
    
    component = shallow(
    <TogglableWhole>
      <div>always</div>
      <div>found</div>
    </TogglableWhole>)
  })

  it('simple info before clicking', () => {
    const simple = component.find('.partly-visible')
    
    expect(simple.contains(<div>always</div>)).toBe(true)
    expect(component.contains(<div>found</div>)).toBe(true)
  })

  it('clicking opens more', () => {
    let all = component.find('.all-visible')
    expect(all.getElement().props.style.display.toString()).toEqual('none')

    component.find('.partly-visible').simulate('click')

    all = component.find('.all-visible')
    expect(all.getElement().props.style.display.toString()).not.toEqual('none')
  })
})