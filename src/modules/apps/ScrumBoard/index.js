import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {onGetMemberList, onGetScrumLabelList} from '../../../redux/actions';
import BoardList from './BoardList';

const ScrumBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetScrumLabelList());
    dispatch(onGetMemberList());
  }, [dispatch]);

  return <BoardList />;
};

export default ScrumBoard;
