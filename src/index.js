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
    @call
    generateRandomNumber(min, max) {
        return 0
    }
}