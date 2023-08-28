import { CircularProgress } from '@mui/material';
import './spiner.scss';

const Spiner = () => {
  return (
    <div className='spiner-block'>
      <CircularProgress/>
    </div>
  );
};

export default Spiner;