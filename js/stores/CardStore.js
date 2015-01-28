var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var _ = require('underscore');

var _cards = _.range(2, 15).map(function (n) {

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

function pickCard(card) {
    _.findWhere(_cards, card).count--;
}

var CardStore = _.extend({}, EventEmitter.prototype, {

    getCards: function() {
        return _cards;
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
