import { React, useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTourThunk, deleteTourThunk } from '../redux/actions/userAction'
import aviaReducer from '../redux/reducers/aviaReducer';
import { CHANGE_IS_ADDED } from '../redux/types/types'


function AviaItem({ avia }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [addShow, setAddShow] = useState(true);

  const addTourHandler = (paramUser, paramTour) => {
    dispatch(addTourThunk(paramUser, paramTour));
    dispatch({
      type: CHANGE_IS_ADDED,
      data: paramTour
    })
  }
  const deleteTourHandler = (paramUser, paramTour) => {
    dispatch(deleteTourThunk(paramUser, paramTour));
    setAddShow(pre => !pre)
  }

  return (
    <>
      <div style={{
        backgroundImage: `url(${avia.photoUrl})`
      }} className='tour'>
        <div className="price">
          {avia.price} руб.
      </div>
        <div className='info'>
          <div className='stars'>
            <div>{avia.city}</div>
          </div>
          <div className='digrees'>
            <div>{avia.temperature} °С</div>
          </div>
        </div>
        <div className='link'>
          <a className='orange' href={avia.url}>Перейти на тур</a>
          {!avia.isAdded ?
            <i onClick={() => addTourHandler(user._id, avia._id)} className="far fa-star addStar"></i>
            :
            <i onClick={() => deleteTourHandler(user._id, avia._id)} className="fas fa-star delStar" ></i>
          }
        </div>
      </div>
    </>
  )
}

export default AviaItem;
