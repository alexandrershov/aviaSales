import './TicketList.css';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button } from 'antd';

import Ticket from '../Ticket/Ticket';
// eslint-disable-next-line import/no-named-as-default
import TicketServices from '../TicketServices/TicketServices';
import Loading from '../Loading/Loading';

function TicketList() {
  const ticketService = useMemo(() => new TicketServices(), []);
  const [elements, setElements] = useState([]);
  const cheapTicket = useSelector((state) => state.buttonFilterreducer.cheap);
  const fastTicket = useSelector((state) => state.buttonFilterreducer.fast);
  const ticketFilter = useSelector(
    (state) => state.setFilterTicketReducer.filter,
  );
  const [currentTicket, setCurrentTicket] = useState(5);
  const [load, setLoad] = useState(true);
  const [tickets, setTickets] = useState([]);

  const toggleCheapTickets = useCallback((arr) => {
    const currentArr = arr.sort((a, b) => a.price - b.price);
    setTickets(currentArr);
  }, [setTickets]);
  
  const toggleFastTickets = useCallback((arr) => {
    const currentArr = arr.sort(
      (a, b) =>
        a.firstTicket.duration +
        a.lastTicket.duration -
        (b.firstTicket.duration + b.lastTicket.duration)
    );
    setTickets(currentArr);
  }, [setTickets]);

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

  useEffect(() => {
    ticketService.getTicketList()
    .then((data) => {
      setElements(data);
      setLoad(false);
    })
    .catch((error) => {
      console.error('Ошибка при получении списка билетов:', error);
      setLoad(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  useEffect(() => {
    const filterTickets = () => {
      let newArr = [];
      elements.forEach((el) => {
        if (ticketFilter.includes('All')) {
          newArr = elements;
        }
        if (ticketFilter.includes('nonStop')) {
          if (el.firstTicket.stops === '-' && el.lastTicket.stops === '-') {
            newArr.push(el);
          }
        }
        if (ticketFilter.includes('oneStop')) {
          if ((el.firstTicket.stops?.length === 1 && el.firstTicket.stops !== '-') && (el.lastTicket.stops?.length === 1 && el.lastTicket.stops !== '-')) {
            newArr.push(el);
          }
        }
        if (ticketFilter.includes('twoStop')) {
          if (
            el.firstTicket.stops?.length === 2 &&
            el.lastTicket.stops?.length === 2
          ) {
            newArr.push(el);
          }
        }
        if (ticketFilter.includes('threeStop')) {
          if (
            el.firstTicket.stops?.length === 3 &&
            el.lastTicket.stops?.length === 3
          ) {
            newArr.push(el);
          }
        }
      });
      toggleFilterTickets(newArr);
    };
    if (elements && elements.length > 0) {
      filterTickets();
    }
  }, [currentTicket, elements, ticketFilter, toggleFilterTickets]);

  const onMoreTickets = () => {
    setLoad(true);
    setCurrentTicket(() => currentTicket + 5);
  };

  const button = (
    <Button
      type="primary"
      style={{ height: '50px' }}
      onClick={onMoreTickets}
    >
      Показать еще 5 билетов!
    </Button>
  );
  const ticketElements = tickets.slice(0, currentTicket).map( (e) => (
    <Ticket
    price={e.price}
    carrier={e.carrier}
    firstTicket={e.firstTicket}
    lastTicket={e.lastTicket}
    />
    ));

    const renderTicket = load ? <Loading /> : ticketElements;
  return (
    <ul className="ticket-list">
      {renderTicket?.length > 1 ? renderTicket : 'sry data ticket do not...'}
      {renderTicket?.length > 1 ? button : null}
    </ul>
  );
}

export default connect()(TicketList);