var React = require('react');
var CardStore = require('../stores/CardStore');
var CardRank = require('./CardRank.react');

function getState() {
    return {
        cards: CardStore.getCards(),
        strategy: CardStore.getStrategy()
    };
}

var CardApp = React.createClass({

    getInitialState: function() {
        return getState();
    },

    componentDidMount: function () {
        CardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CardStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var cardViews = [];
        var strategy = this.state.strategy;
        for (var i = 0; i < this.state.cards.length; i++) {
            var card = this.state.cards[i];
            cardViews.push(<CardRank key={card.value} card={card} strategy={strategy}/>);
        }
        return (
            <div className='fuck-the-dealer-app'>{cardViews}</div>);
    },

    _onChange: function () {
        this.setState(getState());
    }

});

module.exports = CardApp;