var React = require('react');
var CardActions = require('../actions/CardActions');

var CardRank = React.createClass({
    pickCard: function(event) {
        var card = this.props.card;
        CardActions.pickCard(card)

    },
    render: function () {
        var classes = 'card-wrapper';
        if (this.props.strategy.low === this.props.card.value) {
            classes += ' low';
        }
        if (this.props.strategy.middle === this.props.card.value) {
            classes += ' middle';
        }
        if (this.props.strategy.high === this.props.card.value) {
            classes += ' high';
        }

        return <div className={classes}>
            <button type="button" onClick={this.pickCard} disabled={this.props.card.count <= 0}
                className='card'><p>{this.props.card.name}</p></button>
            <p className='counter'>{this.props.card.count}</p>
        </div>;
    }
});

module.exports = CardRank;