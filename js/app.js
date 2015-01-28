window.React = require('React');
var CardApp = require('./components/CardApp.react');

React.render(
    <CardApp />,
    document.getElementById('cards')
);