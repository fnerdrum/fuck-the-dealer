var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Actions = {
    pickCard: function(card) {
        AppDispatcher.handleAction({
            actionType: Constants.PICK_CARD,
            card: card
        })
    },
    changeAggressivity: function(aggressivity) {
        AppDispatcher.handleAction({
            actionType: Constants.CHANGE_AGGRESSIVITY,
            aggressivity: aggressivity
        })
    }
};

module.exports = Actions;