var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('underscore');

const firstCard = 1;
const lastCard = 13;

var aggressiveness = 50;
var cardRange = _.range(firstCard, lastCard + 1);
var cards = cardRange.map(function (n) {

    function displayName(cardValue) {
        if (cardValue === 1) {
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
var strategy = findOptimalStrategy();

function pickCard(card) {
    _.findWhere(cards, card).count--;
    strategy = findOptimalStrategy();
}

function findOptimalStrategy() {
    var remaining = remaingCards();
    return _.max(allStrategies, function (strategy) {
        var countMiddle = getCount(strategy.middle);
        var countLower = getCount(strategy.low);
        var countHigher = getCount(strategy.high);

        return expectedPlayerDrinks(remaining, countMiddle, countLower, countHigher) * aggressiveness
            + expectedDealerDrinks(strategy, remaining, countMiddle, countLower, countHigher) * (100 - aggressiveness);
    })
}

function findCard(cardValue) {
    return _.find(cards, function (c) {
        return c.value === cardValue;
    });
}

function getCount(cardValue) {
    return findCard(cardValue).count;
}

function remaingCards() {
    return _.reduce(cards, function (acc, c) {
        return acc + c.count;
    }, 0);
}

function expectedPlayerDrinks(remaining, countMiddle, countLower, countHigher) {
    return 0;
}

function expectedDealerDrinks(strategy, remaining, countMiddle, countLower, countHigher) {
    var expectedMiddle = 10 * (countMiddle / remaining);
    var expectedLower = strategy.low < strategy.middle ? 5 * (countLower / remaining) : 0;
    var expectedHigher = strategy.high > strategy.middle ? 5 * (countHigher / remaining) : 0;

    return expectedMiddle + expectedLower + expectedHigher;
}

function changeAggressiveness(aggr) {
    if (aggr == 0) {
        aggressiveness = 0.0001;
    } else if (aggr == 100) {
        aggressiveness = 99.9999;
    } else {
        aggressiveness = aggr;
    }
    strategy = findOptimalStrategy()
}

var CardStore = _.extend({}, EventEmitter.prototype, {

    getCards: function () {
        return cards;
    },

    getStrategy: function () {
        return strategy;
    },

    getAggressiveness: function () {
        return aggressiveness;
    },

    emitChange: function () {
        this.emit('change');
    },

    addChangeListener: function (callback) {
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case Constants.PICK_CARD:
            pickCard(action.card);
            break;
        case Constants.CHANGE_AGGRESSIVITY:
            changeAggressiveness(action.aggressiveness);
            break;
        default:
            return true;
    }

    CardStore.emitChange();
    return true;

});

module.exports = CardStore;
