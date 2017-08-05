class App extends React.Component {
  constructor(props) {
    super(props);

  }

  logMe(e) {
    // Stop page from refreshing
    e.preventDefault();

    console.log(this.textInput1.value, this.textInput2.value, this.textInput3.value, this.textInput4.value);

    var pmileage = parseInt(this.textInput1.value);
    var cmileage = parseInt(this.textInput2.value);
    var gallons = parseInt(this.textInput3.value);
    var price = parseInt(this.textInput4.value);

    var inputs = {
      pmileage: pmileage,
      cmileage: cmileage,
      gallons: gallons,
      price: price
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
      success: function(data) {
        console.log('POST. Client side receives back posted data: ', data);
      },
      error: function(error) {
        console.error('POST. Client side receives back error data: ', error);
      }
    });

  }

  get() {

  }

  render() {
    return (
      <div>
        <span>App rendered to the page!</span>
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
          </table>
        </div>
      </div>
    );
  }
}