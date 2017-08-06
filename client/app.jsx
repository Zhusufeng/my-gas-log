class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  // Render what's in the database
  componentDidMount() {
    this.get();
  }

  logMe(e) {
    // Stop page from refreshing
    e.preventDefault();

    console.log(this.textInput1.value, this.textInput2.value, this.textInput3.value, this.textInput4.value);

    var pmileage = parseInt(this.textInput1.value);
    var cmileage = parseInt(this.textInput2.value);
    var gallons = parseInt(this.textInput3.value);
    var price = parseFloat(this.textInput4.value);
    var mpg = +((cmileage - pmileage)/gallons).toFixed(2);
    console.log('MPG is ', mpg);
    // + turns to Number
    // toFixed() rounds to number of decimal places specified
    // console.log('MPG is ', +mpg.toFixed(2));
    var total = +(gallons * price).toFixed(2);
    console.log('Gas total is ', total);

    var inputs = {
      pmileage: pmileage,
      cmileage: cmileage,
      gallons: gallons,
      price: price,
      mpg: mpg,
      total: total
    };
    this.post(inputs);
    this.textInput1.value = '';
    this.textInput2.value = '';
    this.textInput3.value = '';
    this.textInput4.value = '';
  }

  post(info) {
    // Use jQuery to POST to server
    $.ajax({
      url: '/post',
      type: 'POST',
      data: JSON.stringify(info),
      contentType: 'application/json',
      success: (data) => {
        console.log('POST. Client side receives back posted data: ', data);
      },
      error: (error) => {
        console.error('POST. Client side receives back error data: ', error);
      }
    });

  }

  get() {
    // Use jQuery to GET from server
    $.ajax({
      url: '/post',
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        console.log('GET. Client side received back all data: ', data);
        this.setState({ tableData: data }).bind(this);
      },
      error: () => {
        console.error('GET. Client side receives back error data: ', error);
      }
    });
      // .done(data) => {
      //   console.log('This is the DONE');
      //   this.setState({ tableData: data }).bind(this);
      // });
  }

  render() {
    return (
      <div>
        <span>App rendered to the page!</span>
        <div>
          <h3>How to Use My Gas Log</h3>
          <span>Instructions:</span>
          <ol>
            <li>Record master odometer mileage (Previous Mileage).</li>
            <li>Fill up your car's gas tank all the way.</li>
            <li>Drive around.</li>
            <li>When you go to put in more gas, record how much gas you needed to refill tank (Gallons).</li>
            <li>Record how much the gas cost per gallon (Price).</li>
            <li>Record new master odometer mileage (Current Mileage).</li>
          </ol>
        </div>
        <div id="input">
          <form>
          <table method="post">
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
                <td>
                  <input
                    type="text"
                    name="pmileage"
                    ref={(input) => { this.textInput1 = input;}}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="cmileage"
                    ref={(input) => { this.textInput2 = input;}}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="gallons"
                    ref={(input) => {this.textInput3 = input;}}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="price"
                    ref={(input) => {this.textInput4 = input;}}
                  />
                </td>
              </tr>
            </tbody>
          </table>
            <input
              type="submit"
              value="Submit"
              onClick={this.logMe.bind(this)}
            />
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
            <tbody>
              {this.state.tableData.map((row) => {
                <tr>
                  <td>row.created</td>
                  <td>row.pmileage</td>
                  <td>row.cmileage</td>
                  <td>row.gallons</td>
                  <td>row.price</td>
                  <td>row.mpg</td>
                  <td>row.total</td>
                </tr>
              })}
              <tr>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}