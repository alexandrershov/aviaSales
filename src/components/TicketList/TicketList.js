import './TicketList.css';
import { useEffect, useState, useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button } from 'antd';

import Ticket from '../Ticket/Ticket';
// eslint-disable-next-line import/no-named-as-default
import TicketServices from '../../TicketServices/TicketServices';
import Loading from '../Loading/Loading';

function TicketList() {
  const ticketService = new TicketServices();
  const [elements, setElements] = useState([]);
  const cheapTicket = useSelector((state) => state.buttonFilterreducer.cheap);
  const fastTicket = useSelector((state) => state.buttonFilterreducer.fast);
  const ticketFilter = useSelector(
    (state) => state.setFilterTicketReducer,
  );
  const [currentTicket, setCurrentTicket] = useState(5);
  const [tickets, setTickets] = useState([]);
  const [load, setLoad] = useState(true);
  // let errorMessage = 0;
  const toggleCheapTickets = useCallback((arr) => {
    const currentArr = arr.sort((a, b) => a.price - b.price);
    setTickets(currentArr);
    setLoad(false);
  }, [setTickets]);
  
  const toggleFastTickets = useCallback((arr) => {
    const currentArr = arr.sort(
      (a, b) => (a.firstTicket.duration + a.lastTicket.duration) - (b.firstTicket.duration + b.lastTicket.duration)
    );
    setTickets(currentArr);
    setLoad(false);
  }, [setTickets]);

  const toggleFilterTickets = useCallback(
    (arr) => {
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
    const getTicketsElements = () => {
      let errorCount = 0; 
    
      const handleErrors = () => {
        errorCount += 1;
        console.log(errorCount); // специально оставил, чтобы смотреть сколько будет ошибок ПОДРЯД
        if (errorCount >= 3) {
          console.error('Произошло слишком много ошибок');
          return;
        }
        getTicketsElements(); 
      };
    
      ticketService
        .getTicketList()
        .then(res => {
          if (res?.error !== undefined) {
            handleErrors();
            return;
          }
          const data = ticketService.transformTicket(res.tickets);
          if (data?.length > 0) setElements([...elements, ...data]);
        })
        .catch( () => {
          handleErrors();
        });
    };
    getTicketsElements();
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ elements ]);

  useEffect(() => {
    const filterTickets = () => {
      setLoad(true);
      const newArr = [];
      elements.forEach((el) => {
        if (ticketFilter.withOut) {
          if (el.firstTicket.stops === '-' && el.lastTicket.stops === '-') {
            newArr.push(el);
          }
        }
        if (ticketFilter.one) {
          if ((el.firstTicket.stops?.length === 1 && el.firstTicket.stops !== '-') && (el.lastTicket.stops?.length === 1 && el.lastTicket.stops !== '-')) {
            newArr.push(el);
          }
        }
        if (ticketFilter.two) {
          if (
            el.firstTicket.stops?.length === 2 &&
            el.lastTicket.stops?.length === 2
          ) {
            newArr.push(el);
          }
        }
        if (ticketFilter.three) {
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
    setCurrentTicket(() => currentTicket + 5);
  };

  const button = (
    <Button
    type="primary"
    style={{ height: '50px'}}
    onClick={onMoreTickets}
  >
    Показать еще 5 билетов
  </Button>
  );

  const ticketElements = tickets.slice(0, currentTicket).map( (e, i) => (
    <Ticket
    price={e.price}
    carrier={e.carrier}
    firstTicket={e.firstTicket}
    lastTicket={e.lastTicket}
    // eslint-disable-next-line react/no-array-index-key
    key={i}
    />
    ));

    const renderLoading = load ? <Loading/> : ticketElements;
    const renderButtonElements = ticketElements?.length > 1 ? button : null;
  return (
    <ul className="ticket-list">
      {renderLoading}
      {renderLoading?.length < 1 ? <span className='reserv-text'>Сорри по вашему запросу данные не найдены</span> : null}
      {renderButtonElements}
    </ul>
  );
}

export default connect()(TicketList);