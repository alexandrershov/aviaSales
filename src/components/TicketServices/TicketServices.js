class TicketServices {

  peopleID = null;

  currentArr = [];

  getResults = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(
        `Sorry, field do not loaded data, url:${url} status:${result.status}`,
      );
    }
    return result.json();
  };

  getSearchId = async () => {
    const result = await this.getResults(
      'https://aviasales-test-api.kata.academy/search',
    );
    this.peopleID = result.searchId;
  };

  getTicketList = async () => {
    if (this.peopleID === null) await this.getSearchId();
    const results = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${this.peopleID}`,
    );
    // if (results.status === 500) return this.getTicketList();
    const result = await results.json();
    return result;
  };

  transformTicket = (arr) => (
    arr.map((e) => {
      if (e.segments[0].stops.length < 1) {
        e.segments[0].stops = '-';
      }
      if (e.segments[1].stops.length < 1) {
        e.segments[1].stops = '-';
      };
        return {
          price: e.price,
          carrier: e.carrier,
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
        };  
        }));
}

export default TicketServices;
