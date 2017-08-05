class App extends React.Component {
  // constructor() {

  // }

  render() {
    return (
      <div>
        <span>App rendered to the page!</span>
        <div id="input">
          <form>
          <table>
            <thead>
              <tr>
                <th>Previous Mileage:</th>
                <th>Current Mileage:</th>
                <th>Gallons:</th>
                <th>Price per Gallon ($2.59/gal):</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="text" name="pmileage"></input></td>
                <td><input type="text" name="cmileage"></input></td>
                <td><input type="text" name="gallons"></input></td>
                <td><input type="text" name="price"></input></td>
              </tr>
            </tbody>
          </table>
            <input type="submit" value="Submit"></input>
          </form>
        </div>
        <div id="displayhistory">
          <table>
            <caption>Gas History</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>Previous Mileage</th>
                <th>Current Mileage</th>
                <th>Gallons</th>
                <th>Price per Gallon</th>
                <th>MPG</th>
                <th>Total Gas Money</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    );
  }
}