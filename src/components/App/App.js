import './App.css';
import TicketList from '../TicketList/TicketList';
import ButtonTicket from '../ButtonTicket/ButtonTicket';
import FilterTicket from '../FilterTicket/FilterTicket';

function App() {
  return <div className="App">
    <FilterTicket />
    <div className="wrapper">
      <ButtonTicket />
      <TicketList />
    </div>
  </div>;
}

export default App;
