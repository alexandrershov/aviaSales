import './Ticket.css';
import add from 'date-fns/add';


function Ticket({ price, firstTicket, lastTicket, carrier }) {
  const changeStops = (arr) => {
    if (arr === '-') {
      return arr;
    }
    return arr.map((e, index) => {
      if (index + 1 === arr.length) {
        return e;
      }
      return `${e}, `;
    });
  };

  const timePeriod = (e, inTravel) => {
    const dateStartFormat = new Date(e);
    const doneTime = add(dateStartFormat, {
      years: 0,
      months: 0,
      weeks: 0,
      days: 0,
      hours: Math.trunc(inTravel / 60),
      minutes: inTravel % 60,
      seconds: 0,
    });
    const doneTimeMin = doneTime.getMinutes();
    const doneTimeHour = doneTime.getHours();
    const startTimeMin = dateStartFormat.getMinutes();
    const startTimeHour = dateStartFormat.getHours();

    return `${startTimeHour}:${startTimeMin} - ${doneTimeHour}:${doneTimeMin}`;
  };

  const convertDuration = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}ч ${minutes}`;
  };

  const firstStops = changeStops(firstTicket.stops);
  const lastStops = changeStops(lastTicket.stops);

  return (
    <div>
      <li className="ticket">
        <div className="ticket__block">
          <div className="ticket__price">{price} Р</div>
          <div className="ticket__logo">
            <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo..." />
          </div>
        </div>
        <div className="ticket__block">
          <div className="ticket__block_text">
            <span className="city">
              {firstTicket.origin} – {firstTicket.destination}
            </span>
            {timePeriod(firstTicket.date, firstTicket.duration)}
          </div>
          <div className="ticket__block_text">
            <span className="city">В пути</span>
            {convertDuration(firstTicket.duration)}
          </div>
          <div className="ticket__block_text">
            <span className="city">Пересадка</span>
            {firstStops}
          </div>
        </div>
        <div className="ticket__block">
          <div className="ticket__block_text">
            <span className="city">
              {lastTicket.origin} – {lastTicket.destination}
            </span>
            {timePeriod(lastTicket.date, lastTicket.duration)}
          </div>
          <div className="ticket__block_text">
            <span className="city">В пути</span>
            {convertDuration(lastTicket.duration)}
          </div>
          <div className="ticket__block_text">
            <span className="city">Пересадка</span>
            {lastStops}
          </div>
        </div>
      </li>
    </div>
  );
}

export default Ticket;

// ticket__block_text
