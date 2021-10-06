/**
 * curriedAdd returns an accumulated total from all previous calls when no number is passed in 
 * as a parameter. When a number is passed in, the number is added to the accumulator and a function
 * which has logic similar to curriedAdd is returned. Outside of tripping up poor unsuspecting 
 * applicants, I have no other idea why such a function is needed.
 * @param {*} total 
 * @returns 
 */
function curriedAdd(total) {

    let totalAll = 0;

    if (total) {
        totalAll = totalAll + total;
        return function addAgain(total) {
            if (total) {
                totalAll = totalAll + total;
                return addAgain;
            } else {
                return totalAll;
            }
        }
    } else {
        return totalAll;
    }
}

module.exports = { curriedAdd };
