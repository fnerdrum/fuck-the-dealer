var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var Actions = {
    pickCard: function(card) {
        AppDispatcher.handleAction({
            actionType: Constants.PICK_CARD,
            card: card
        })
    },
    changeAggressiveness: function(aggressiveness) {
        AppDispatcher.handleAction({
            actionType: Constants.CHANGE_AGGRESSIVITY,
            aggressiveness: aggressiveness
        })
    }
};

module.exports = Actions;