const contentNode = document.getElementById('contents');

const continents = ['Africa', 'North America', 'South America','Asia', 'Australia', 'Europe', 'Antartica'];
const message = continents.map(c => `Hello ${c}!`).join(' ');

const component = <p>{message}</p>

ReactDOM.render(component, contentNode);  // Render the component inside the content Node
