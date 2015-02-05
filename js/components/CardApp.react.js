var React = require('react');
var CardStore = require('../stores/CardStore');
var CardActions = require('../actions/CardActions');
var CardRank = require('./CardRank.react');

function getState() {
    return {
        cards: CardStore.getCards(),
        strategy: CardStore.getStrategy(),
        aggressiveness: CardStore.getAggressiveness()
    };
}

var CardApp = React.createClass({

    getInitialState: function () {
        return getState();
    },

    componentDidMount: function () {
        CardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        CardStore.removeChangeListener(this._onChange);
    },

    changeAggressiveness: function(event) {
        CardActions.changeAggressiveness(event.target.value)
    },

    render: function () {
        var strategy = this.state.strategy;
        var cardViews = this.state.cards.map(function(card) {
            return <CardRank key={card.value} card={card} strategy={strategy}/>;
        });
        return (
            <div className='fuck-the-dealer-app'>
                <div className='cards'>{cardViews}</div>
                <input type="range" min="0" max="100" id="aggressiveness" onChange={this.changeAggressiveness}/>
                <label htmlFor="aggressiveness">{Math.round(this.state.aggressiveness)}%</label>
            </div>);
    },

    _onChange: function () {
        this.setState(getState());
    }

});

module.exports = CardApp;