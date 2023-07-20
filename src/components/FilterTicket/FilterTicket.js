import { connect, useDispatch } from 'react-redux';
import './FilterTicket.css';

function FilterTicket() {
  const dispath = useDispatch();
  const toggleFilterTicket = (e) => {
    dispath({ type: 'GET_FILTER_TICKET', payload: e });
  };

  return (
    <div className="filter">
      <h2 className="title">Количество пересадок</h2>
      <ul className="filter-list">
        <li className="list-item">
          <input
            type="checkbox"
            className="check"
            defaultChecked
            value="All"
            onChange={(e) => toggleFilterTicket(e.target.value)}
          />
          <span className="filter-list_text">Все</span>
        </li>
        <li className="list-item">
          <input
            type="checkbox"
            className="check"
            value="nonStop"
            onChange={(e) => toggleFilterTicket(e.target.value)}
          />
          <span className="filter-list_text">Без пересадок</span>
        </li>
        <li className="list-item">
          <input
            type="checkbox"
            className="check"
            value="oneStop"
            onChange={(e) => toggleFilterTicket(e.target.value)}
          />
          <span className="filter-list_text">1 пересадка</span>
        </li>
        <li className="list-item">
          <input
            type="checkbox"
            className="check"
            value="twoStop"
            onChange={(e) => toggleFilterTicket(e.target.value)}
          />
          <span className="filter-list_text">2 пересадка</span>
        </li>
        <li className="list-item">
          <input
            type="checkbox"
            className="check"
            value="threeStop"
            onChange={(e) => toggleFilterTicket(e.target.value)}
          />
          <span className="filter-list_text">3 пересадка</span>
        </li>
      </ul>
    </div>
  );
}

export default connect()(FilterTicket);
