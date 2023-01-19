import { START_GAME, UPDATE_VARIABLES, END_GAME } from "../actions/game";

const initialState = {
    minimum: 0,
    maximum: 1000,
    gameStarted: false,
    solution: 0,
    scores: []
};

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export default (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_VARIABLES:
            return {
                ...state,
                minimum: action.minimum,
                maximum: action.maximum,
                gameStarted: false,
                solution: 0,
                scores: []
            } 
        case START_GAME:
            return {
                ...state,
                gameStarted: true,
                solution: random(state.minimum, state.maximum),
            }
            case END_GAME:
                return {
                    ...state,
                    gameStarted: false,
                    solution: 0,
                    scores: [
                        { steps: action.steps, player: 'Joueur inconnu '},
                        ...state.scores,
                    ],
                };
        default:
            return state;
    }
}