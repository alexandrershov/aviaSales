import { connect, useDispatch } from 'react-redux';
import './FilterTicket.css';

function FilterTicket() {
  const dispath = useDispatch();

  const filterArr = [
    ['All', 'Все', {chek: true} ],
    ['nonStop', 'Без пересадок', {chek: false}],
    ['oneStop', '1 пересадка', {chek: false}],
    ['twoStop', '2 пересадка', {chek: false}],
    ['threeStop', '3 пересадка', {chek: false}]];

  const toggleFilterTicket = (e) => {
    dispath({ type: 'GET_FILTER_TICKET', payload: e.target.value });
  };

  const chekedInput = (e, ind) => {
    filterArr[ind][2].chek = !filterArr[ind][2].chek;
    toggleFilterTicket(e);
  };

  const input = filterArr.map( (e, index) => (
    <li className="list-item">
      <input
        type="checkbox"
        className="check"
        defaultChecked={e[2].chek}
        value={e[0]}
        onChange={(event) => chekedInput(event, index)}
      />
      <span className="filter-list_text">{e[1]}</span>
  </li>
  ));


  return (
    <div className="filter">
      <h2 className="title">Количество пересадок</h2>
      <ul className="filter-list">
        {input}
      </ul>
    </div>
  );
}

export default connect()(FilterTicket);
