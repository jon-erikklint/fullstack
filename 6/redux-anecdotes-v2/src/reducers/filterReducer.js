const filterReducer = (state = '', event) => {
  switch(event.type){
  case 'SET-FILTER': return event.filter
  default: return state
  }
}

export const set = filter => ({
  type: 'SET-FILTER',
  filter
})

export default filterReducer