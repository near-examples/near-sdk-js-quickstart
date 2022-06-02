import {NearContract, NearBindgen, call, view, near} from 'near-sdk-js'

@NearBindgen
class CoinFlip extends NearContract {
    constructor() {
        //execute the NEAR Contract's constructor
        super()
        //set default values for the points
        this.points = {}
    }

    /*
        Flip a coin. Pass in the side (heads or tails) and a random number will be chosen
        indicating whether the flip was heads or tails. If you got it right, you get a point.
    */
    @call
    flipCoin(side) {
        // Get the current player and ensure they're in the game state
        const status = near.jsvmCall('random-hub.examples.near', 'getRandomNumber', [0, 1]);
        env.log(`status: ${status}`);
    }

    // View how many points a specific player has
    @view
    viewPoints(player) {
        return this.points[player];
    }
}