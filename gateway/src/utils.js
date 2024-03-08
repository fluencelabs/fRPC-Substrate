/**
 * Find the most repeated value in the results array
 */
export function resultsQuorum(results, minNum) {
    const resultCounts = results
        .filter((obj) => obj.success)
        .map((obj) => obj.value)
        .reduce(function (i, v) {
            if (i[v] === undefined) {
                i[v] = 1;
            } else {
                i[v] = i[v] + 1;
            }
            return i;
        }, {});

    const maxRepeated = Math.max(...Object.values(resultCounts));
    if (maxRepeated >= minNum) {
        const [val, _] = Object.entries(resultCounts).find(
            ([_, count]) => count === maxRepeated,
        );

        return {
            value: val,
            success: true,
            error: ""
        };
    } else return {
        value: "",
        success: false,
        error: "No consensus in results"
    };
}