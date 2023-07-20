import './ButtonTicket.css';
import { Button } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

function ButtonTicket() {
  const dispath = useDispatch();

  const onToggleCheapTicket = useCallback(() => {
    dispath({ type: 'GET_CHEAP_TICKET', payload: true });
    dispath({ type: 'GET_FAST_TICKET', payload: false });
  }, [dispath]);

  const onToggleFastTicket = useCallback(() => {
    dispath({ type: 'GET_FAST_TICKET', payload: true });
    dispath({ type: 'GET_CHEAP_TICKET', payload: false });
  }, [dispath]);

  return (
    <div className="wrap-btn">
      <Button
        className="btn"
        size="large"
        onClick={onToggleCheapTicket}
        defaultChecked
      >
        Самый дешевый
      </Button>
      <Button className="btn" size="large" onClick={onToggleFastTicket}>
        Самый быстрый
      </Button>
    </div>
  );
}

export default ButtonTicket;
