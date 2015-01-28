var React = require('react');
var CardActions = require('../actions/CardActions');

var CardRank = React.createClass({
    pickCard: function(event) {
        var card = this.props;
        CardActions.pickCard(card)

    },
    render: function () {
        return <div className='card-wrapper'>
            <button type="button" onClick={this.pickCard} disabled={this.props.count <= 0}
                className='card'><p>{this.props.name}</p></button>
            <p className='counter'>{this.props.count}</p>
        </div>;
    }
});

module.exports = CardRank;