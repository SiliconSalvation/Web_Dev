var contentNode = document.getElementById('contents');
var component = React.createElement(
  'h1',
  null,
  'Hello World!'
); // Simple JSX component
ReactDOM.render(component, contentNode); // Render the component inside the content Node