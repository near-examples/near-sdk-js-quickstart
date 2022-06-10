import {NearContract, NearBindgen, call, view, near} from 'near-sdk-js'

@NearBindgen
class RandomHub extends NearContract {
    constructor() {
        //execute the NEAR Contract's constructor
        super()
    }

    /*
        Generate a random number within the range of min and max (both inclusive)
    */
    @view
    generateRandomNumber() {
        // Get random string and check what the the character code is at the first index
        let randomString = near.randomSeed(); 
        // Random between 0 and 65535? I think???
        let randomNumber = randomString.charCodeAt(0);

        if(randomNumber > 95) {
            env.log(`Random number (${randomNumber}) greater than 95. Returning 1`)
            return 1
        } else {
            env.log(`Random number (${randomNumber}) less than or equal to 95. Returning 0`)
            return 0;
        }
    }
}