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
    flipCoin({ side }) {
        // Get the current player and ensure they're in the game state
        let player = near.predecessorAccountId();
        if(!(player in this.points)) {
            this.points[player] = 0;
        }

        env.log(`${player} chose ${side}`);

        // Cross contract call to the random number hub to get a random number between 0 and 1 (inclusive) as an integer
        const randomNum = near.jsvmCall('random-hub.examples.testnet', 'generateRandomNumber', '');

        // Let's set heads to be 0 and tails to be 1
        let outcome = randomNum == 0 ? "heads" : "tails";

        // Check if the result was what the player passed in
        if(side == outcome) {
            env.log(`You Get a Point! The result was ${outcome}`);
            this.points[player] += 1;
        } else {
            env.log(`You lost a point... The result was ${outcome}`);
            this.points[player] = this.points[player] == 0 ? 0 : this.points[player] - 1;
        }
    }

    // View how many points a specific player has
    @view
    viewPoints({ player }) {
        if(player in this.points) {
          env.log(`Points for ${player}: ${this.points[player]}`);
          return this.points[player];
        }

        env.log(`Points for ${player}: N/A`);
        return null;
    }
}