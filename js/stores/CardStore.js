var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('underscore');

const firstCard = 2;
const lastCard = 14;

var cardRange = _.range(firstCard, lastCard + 1);
var cards = cardRange.map(function (n) {

    function displayName(cardValue) {
        if (cardValue === 14) {
            return 'A'
        }
        if (cardValue === 13) {
            return 'K'
        }
        if (cardValue === 12) {
            return 'Q'
        }
        if (cardValue === 11) {
            return 'J'
        }
        return cardValue;
    }

    return {
        value: n,
        name: displayName(n),
        count: 4
    }
});
var allStrategies = _.reduce(cardRange, function (acc, n) {
    for (var lower = firstCard; lower <= n; lower++) {
        for (var higher = n; higher <= lastCard; higher++) {
            acc.push({low: lower, middle: n, high: higher});
        }
    }
    return acc;
}, []);
var strategy = findOptimalStrategy(cards);

function pickCard(card) {
    _.findWhere(cards, card).count--;
}

function findOptimalStrategy(cards) {
    return {low: 3, middle: 7, high: 10};
}

var CardStore = _.extend({}, EventEmitter.prototype, {

    getCards: function() {
        return cards;
    },

    getStrategy: function() {
        return strategy;
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case Constants.PICK_CARD:
            pickCard(action.card);
            break;
        default:
            return true;
    }

    CardStore.emitChange();
    return true;

});

module.exports = CardStore;
