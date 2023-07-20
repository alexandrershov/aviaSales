import './TicketList.css';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import Ticket from '../Ticket/Ticket';
// eslint-disable-next-line import/no-named-as-default
import TicketServices from '../TicketServices/TicketServices';
import Loading from '../Loading/Loading';

function TicketList() {
  const ticketService = useMemo(() => new TicketServices(), []);
  const dispath = useDispatch();
  const elements = useSelector(
    (state) => state.getTicketReducer.ticketElements,
  );
  const cheapTicket = useSelector((state) => state.buttonFilterreducer.cheap);
  const fastTicket = useSelector((state) => state.buttonFilterreducer.fast);
  const ticketFilter = useSelector(
    (state) => state.setFilterTicketReducer.filter,
  );
  const [currentTicket, setCurrentTicket] = useState(5);
  const [load, setLoad] = useState(true);

  const addTicketElements = useCallback(
    (res) => {
      dispath({ type: 'GET_TICKET_ELEMENTS', payload: res });
    },
    [dispath],
  );

  const toggleCheapTickets = useCallback(
    (arr) => {
      const currentArr = arr.sort((a, b) => a.price - b.price);
      return addTicketElements(currentArr);
    },
    [addTicketElements],
  );

  const toggleFastTickets = useCallback(
    (arr) => {
      const currentArr = arr.sort(
        (a, b) =>
          a.firstTicket.duration +
          a.lastTicket.duration -
          (b.firstTicket.duration + b.lastTicket.duration),
      );
      return addTicketElements(currentArr);
    },
    [addTicketElements],
  );

  const toggleFilterTickets = useCallback(
    (arr) => {
      setLoad(false);
      if (cheapTicket) {
        return toggleCheapTickets(arr);
      }
      if (fastTicket) {
        return toggleFastTickets(arr);
      }
    },
    [toggleCheapTickets, toggleFastTickets, cheapTicket, fastTicket],
  );

  const filterTickets = useCallback(
    (arr) => {
      switch (ticketFilter) {
        case 'All':
          toggleFilterTickets(arr.slice(0, currentTicket));
          break;
        case 'nonStop':
          arr.filter(
            (e) =>
              e.firstTicket.stops.length === 0 &&
              e.lastTicket.stops.length === 0,
          );
          toggleFilterTickets(arr.slice(0, currentTicket));
          break;
        case 'oneStop':
          arr.filter(
            (e) =>
              e.firstTicket.stops.length === 1 &&
              e.lastTicket.stops.length === 1,
          );
          toggleFilterTickets(arr.slice(0, currentTicket));
          break;
        case 'twoStop':
          arr.filter(
            (e) =>
              e.firstTicket.stops.length === 2 &&
              e.lastTicket.stops.length === 2,
          );
          toggleFilterTickets(arr.slice(0, currentTicket));
          break;
        case 'threeStop':
          arr.filter(
            (e) =>
              e.firstTicket.stops.length === 3 &&
              e.lastTicket.stops.length === 3,
          );
          toggleFilterTickets(arr.slice(0, currentTicket));
          break;
        default:
          return arr;
      }
    },
    [toggleFilterTickets, ticketFilter, currentTicket],
  );

  const getTickets = useCallback(() => {
    ticketService.getTicketList().then((data) => filterTickets(data));
  }, [ticketService, filterTickets]);

  useEffect(() => {
    getTickets();
    return () => {};
  }, [getTickets]);

  const onMoreTickets = () => {
    setLoad(true);
    // eslint-disable-next-line no-use-before-define
    buttonDisabled = true;
    setCurrentTicket(() => currentTicket + 5);
    getTickets();
    // eslint-disable-next-line no-use-before-define
    buttonDisabled = false;
  };

  const tickets = elements.map((e, index) => (
    <Ticket
      price={e.price}
      firstTicket={e.firstTicket}
      lastTicket={e.lastTicket}
      // eslint-disable-next-line react/no-array-index-key
      key={index}
    />
  ));

  let buttonDisabled = false;
  const button = (
    <Button
      type="primary"
      style={{ height: '50px' }}
      onClick={onMoreTickets}
      disabled={buttonDisabled}
    >
      Показать еще 5 билетов!
    </Button>
  );

  return (
    <ul className="ticket-list">
      {load ? <Loading /> : tickets}
      {button}
    </ul>
  );
}

export default connect()(TicketList);
