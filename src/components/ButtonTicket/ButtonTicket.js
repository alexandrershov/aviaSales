import './ButtonTicket.css';
import { Button } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

function ButtonTicket() {
  const dispath = useDispatch();

  const [firstStyle, setFirstStyle] = useState('btn blue');
  const [lastStyle, setLastStyle] = useState('btn');

  const onToggleCheapTicket = useCallback(() => {
    dispath({ type: 'GET_CHEAP_TICKET'});
  }, [dispath]);

  const onToggleFastTicket = useCallback(() => {
    dispath({ type: 'GET_FAST_TICKET'});
  }, [dispath]);

  return (
    <div className="wrap-btn">
      <Button
        className={firstStyle}
        size="large"
        onClick={() => {
          setFirstStyle('btn blue');
          setLastStyle('btn');
          onToggleCheapTicket();}}
        defaultChecked
      >
        Самый дешевый
      </Button>
      <Button className={lastStyle} size="large" onClick={() => {
        setLastStyle('btn blue');
        setFirstStyle('btn');
        onToggleFastTicket();}}>
        Самый быстрый
      </Button>
    </div>
  );
}

export default ButtonTicket;
