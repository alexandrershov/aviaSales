import { connect, useDispatch, useSelector } from 'react-redux';
import './FilterTicket.css';

function FilterTicket() {
  const dispath = useDispatch();

  const { all, withOut, one, two, three } = useSelector((state) => state.setFilterTicketReducer);
  const toggleAll = () => {
    dispath({ type: 'TOGGLE_ALL' });
  };
  const toggleWithOut = () => {
    dispath({ type: 'TOGGLE_WITHOUT' });
  };
  const toggleOne = () => {
    dispath({ type: 'TOGGLE_ONE' });
  };
  const toggleTwo = () => {
    dispath({ type: 'TOGGLE_TWO' });
  };
  const toggleThree = () => {
    dispath({ type: 'TOGGLE_THREE' });
  };

  return (
    <div className="filter">
      <h2 className="title">Количество пересадок</h2>
      <ul className="filter-list">
      <li className="list-item">
      <input
        type="checkbox"
        className="check"
        checked={all}
        onChange={toggleAll}
      />
      <span className="filter-list_text">All</span>
      </li>
      <li className="list-item">
          <input
            type="checkbox"
            className="check"
            checked={withOut}
            onChange={toggleWithOut}
          />
          <span className="filter-list_text">withOut</span>
      </li>
      <li className="list-item">
          <input
            type="checkbox"
            className="check"
            checked={one}
            onChange={toggleOne}
          />
          <span className="filter-list_text">one</span>
      </li>
      <li className="list-item">
          <input
            type="checkbox"
            className="check"
            checked={two}
            onChange={toggleTwo}
          />
          <span className="filter-list_text">two</span>
      </li>
      <li className="list-item">
          <input
            type="checkbox"
            className="check"
            checked={three}
            onChange={toggleThree}
          />
          <span className="filter-list_text">three</span>
      </li>
          </ul>
    </div>
  );
}

export default connect()(FilterTicket);
