import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import AppsContainer from '@crema/core/AppsContainer';
import BoardDetailView from './BoardDetailView';
import {
  onGetBoardDetail,
  onNullifyBoardDetail,
} from '../../../../redux/actions';
import {useRouter} from 'next/router';
import {AppLoader} from '../../../../@crema';

const BoardDetail = () => {
  const boardDetail = useSelector(
    ({scrumboardApp}) => scrumboardApp.boardDetail,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const {query} = router;
  const {id} = query;

  useEffect(() => {
    dispatch(onGetBoardDetail(id));
    return () => {
      dispatch(onNullifyBoardDetail());
    };
  }, [dispatch, id]);

  const onGoToBoardList = () => {
    router.push('/apps/scrum-board');
  };

  if (!boardDetail) {
    return <AppLoader />;
  }

  return (
    <AppsContainer
      fullView
      title={
        <>
          <Box
            component='span'
            sx={{
              cursor: 'pointer',
              mr: 2,
              color: 'primary.main',
            }}
            onClick={onGoToBoardList}
          >
            Scrum Board
          </Box>
          &gt; {boardDetail.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} />
    </AppsContainer>
  );
};

export default BoardDetail;
