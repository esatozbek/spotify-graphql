import random from 'lodash/random';

function idGenerator() {
    let ids: number[] = [];

    return function generateId(currentIds?: number[]) {
        if (currentIds) {
            ids = currentIds;
        }
        let randomId = random(1_000_000, 9_999_999);
        while (ids.includes(randomId)) {
            randomId = random(1_000_000, 9_999_999);
        }
        ids.push(randomId);
        return randomId;
    };
}

export default idGenerator;
