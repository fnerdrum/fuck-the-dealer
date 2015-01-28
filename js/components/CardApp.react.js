var React = require('react');
var CardStore = require('../stores/CardStore');
var CardRank = require('./CardRank.react');

function getCardState() {
    return {
        cards: CardStore.getCards()
    };
}

var CardApp = React.createClass({

    getInitialState: function() {
        return getCardState();
    },

    componentDidMount: function () {
        CardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CardStore.removeChangeListener(this._onChange);
    },

    render: function () {
        var cardViews = [];
        for (var i = 0; i < this.state.cards.length; i++) {
            var card = this.state.cards[i];
            cardViews.push(<CardRank key={card.value} name={card.name} count={card.count} />);
        }
        return (
            <div className='fuck-the-dealer-app'>{cardViews}</div>);
    },

    _onChange: function () {
        this.setState(getCardState());
    }

});

module.exports = CardApp;