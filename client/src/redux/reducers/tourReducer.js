import * as TYPES from '../types/types';

function tourReducer(allTours = [], action) {
  switch (action.type) {
    case TYPES.SET_TOURS:
      return action.data
    case TYPES.SORTED_PRICE_TOURS:
      return action.data
    case TYPES.SORTED_RATE_TOURS:
      return action.data
    case TYPES.SORTED_STARS_TOURS:
      return action.data
    case TYPES.SET_SORTED_TOURS:
      return action.data
    case TYPES.FILTER_TOURS:
      return action.data  
    default:
      return allTours;
  }
}

export default tourReducer;
