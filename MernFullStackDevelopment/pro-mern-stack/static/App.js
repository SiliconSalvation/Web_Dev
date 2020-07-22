'use strict';

var contentNode = document.getElementById('contents');

var continents = ['Africa', 'North America', 'South America', 'Asia', 'Australia', 'Europe', 'Antartica'];
var message = continents.map(function (c) {
  return 'Hello ' + c + '!';
}).join(' ');

var component = React.createElement(
  'p',
  null,
  message
);

ReactDOM.render(component, contentNode); // Render the component inside the content Node