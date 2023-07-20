class TicketServices {
  constructor(){
    this.getResults = this.getResults.bind(this);
    this.transformTicket = this.transformTicket.bind(this);
  }

  _url = 'https://front-test.dev.aviasales.ru/tickets';

  peopleID = null;

  getResults = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(
        `Sorry, field do not loaded data, url:${url} status:${result.status}`,
      );
    }
    await result.json();
  };

  getSearchId = async () => {
    const result = await this.getResults(
      'https://aviasales-test-api.kata.academy/search',
    );
    this.peopleID = result.searchId;
  };

  getTicketList = async () => {
    if (this.peopleID === null) await this.getSearchId();
    const result = await this.getResults(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${this.peopleID}`,
    );
    await this.transformTicket(result.tickets);
  };

  transformTicket = (arr) => arr.map((e) => ({
        price: e.price,
        firstTicket: {
          origin: e.segments[0].origin,
          destination: e.segments[0].destination,
          date: e.segments[0].date,
          stops: e.segments[0].stops,
          duration: e.segments[0].duration,
        },
        lastTicket: {
          origin: e.segments[1].origin,
          destination: e.segments[1].destination,
          date: e.segments[1].date,
          stops: e.segments[1].stops,
          duration: e.segments[1].duration,
        },
      }));
}

export default TicketServices;
