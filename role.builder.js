module.exports = {

    run: (creep) => {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        } else if (! creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = true;
        }


        if (creep.memory.working) {
            const targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

            if (targets) {
                if (creep.build(targets, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            } else {
                const target = creep.room.controller;

                if (creep.upgradeController(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {
            const sources = creep.room.find(FIND_SOURCES);

            if (sources.length) {
                const target = creep.pos.findClosestByPath(sources);
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
    }
}