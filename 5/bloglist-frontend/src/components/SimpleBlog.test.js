import SimpleBlog from './SimpleBlog'
import React from 'react'
import { shallow } from 'enzyme'

describe('simple blog tests', () => {
  let component, testBlog, callback
  
  beforeEach(() => {
    testBlog = {
      title: 'test title',
      author: 'test author',
      likes: 4
    }

    callback = jest.fn()
    
    component = shallow(<SimpleBlog blog={testBlog} onClick={callback}/>)
  })
  
  it('information is rendered', () => {
    const info = component.find('.info')
    const likes = component.find('.likes')

    expect(info.text()).toContain(testBlog.title)
    expect(info.text()).toContain(testBlog.author)
    expect(likes.text()).toContain(testBlog.likes)
  }) 

  it('button clicking calls callback', () => {
    const button = component.find('button')

    button.simulate('click')

    expect(callback.mock.calls.length).toBe(1)

    button.simulate('click')

    expect(callback.mock.calls.length).toBe(2)
  })
})