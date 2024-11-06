import { getRow } from "./utils.js";

/**
 * @param {fFtTKey} key
 * @returns {CalebInputHandlerMapCB}
 */
function movefFtT(key) {
    return function(state) {
        resetJumpState(state);

        state.caleb.fFtT.type = key
        state.caleb.fFtT.startCount = state.input.anykeyCount
        state.input.anykey = true;

        return true;
    }
}

/**
 * @param {GameState} state
 * @returns {boolean}
 */
function anykeyHandler(state) {
    if (state.input.anykeyCount
}

/**
 * @param dir {-1 | 1}
 * @returns {CalebInputHandlerMapCB}
 */
function moveWB(dir) {
    return function(state) {
        if (state.caleb.dash.dashing) {
            return false;
        }

        const caleb = state.caleb;
        const dash = caleb.dash;
        const opts = caleb.opts.dash;

        dash.dashing = true;
        dash.dashDistance = opts.distance
        dash.dashStart = null
        dash.dashDir = dir

        resetJumpState(state);

        return true;
    }
}

/**
 * @param input {number[]}
 * @param dir {-1 | 1}
 * @returns {CalebInputHandlerMapCB}
 */
function moveKJ(input, dir) {
    return function(state) {
        if (state.caleb.jump.noJumpTime > 0) {
            return false;
        }

        const caleb = state.caleb;
        const jump = caleb.jump;
        const opts = caleb.opts.jump;
        const number = Math.min(Math.max(1, +input.join("")), 15)
        jump.jumping = true;
        jump.jumpDistance = number;
        jump.jumpStart = null
        jump.noJumpTime = (number * opts.noJumpMultiplier) + opts.noJumpBase;
        jump.jumpDir = dir

        resetDashState(state);

        return true;
    }
}

/** @returns {CalebJump} */
export function defaultJumpState() {
    return {
        jumping: false,
        jumpDistance: 0,
        noJumpTime: 0,
        jumpDir: /** @type {-1 | 1} */(1),
        jumpStart: null,
    }
}

/** @returns {CalebDash} */
export function defaultDashStat() {
    return {
        dashing: false,
        dashDir: 1,
        dashStart: null,
        dashDistance: 0,
        noDashTime: 0,
    }
}

/** @returns {fFtT} */
export function defaultfFtT() {
    return {
        type: "f",
        startCount: 0,
    }
}



/**
 * @param state {GameState}
 */
export function resetJumpState(state) {
    const jump = state.caleb.jump
    state.caleb.physics.vel.y = 0
    jump.jumping = false;
    jump.jumpDistance = 0;
    jump.noJumpTime = 0;
    jump.jumpDir = 1
    jump.jumpStart = null
}

/**
 * @param state {GameState}
 */
export function resetDashState(state) {
    const dash = state.caleb.dash
    dash.dashing = false;
    dash.dashDistance = 0;
    dash.dashDir = 1;
    dash.noDashTime = 0;
}

/**
 * @param dir {number}
 * @returns {CalebInputHandlerMapCB}
 */
function moveHL(dir) {
    /**
     * @param state {GameState}
     * @param timing {InputTiming}
     * @returns {boolean}
     */
    return function(state, timing) {
        const hold = timing.tickHoldDuration;
        const x = state.opts.caleb.normWidthsPerSecond * (hold / state.loopDelta);

        state.caleb.physics.vel.x = dir * x;
        return true;
    }
}

/** @param i {number}
  * @param input {number[]}
  */
function addNumericHandler(i, input) {
    /**
     * @param _ {GameState}
     * @param timing {InputTiming}
     * @returns {boolean}
     */
    return function(_, timing) {
        if (timing.initial) {
            input.push(i);
        }
        return false;
    }
}

/**
 * @param next {CalebInputHandlerMapCB}
 * @returns {CalebInputHandlerMapCB}
 */
function onKeyDown(next) {
    return function(state, timing) {
        if (timing.initial) {
            return next(state, timing)
        }
        return false
    }
}

/**
 * @param next {CalebInputHandlerMapCB}
 * @returns {CalebInputHandlerMapCB}
 */
function onKeyUp(next) {
    return function(state, timing) {
        if (timing.done) {
            return next(state, timing)
        }
        return false
    }
}


/**
 * @param next {CalebInputHandlerMapCB}
 * @param input {number[]}
 * @returns {CalebInputHandlerMapCB}
 */
function clearNumericState(next, input) {
    return function(state, timing) {
        const out = next(state, timing);
        input.length = 0;
        return out;
    }
}


/**
 * @param next {CalebInputHandlerMapCB}
 * @returns {CalebInputHandlerMapCB}
 */
function withHold(next) {
    return function(state, timing) {
        const hold = timing.tickHoldDuration;
        if (hold === 0 && !timing.initial) {
            return false;
        }
        return next(state, timing);
    }
}

/**
 * @param {CalebInputHandlerMapCB} next
 * @param {boolean} anykeyState
 * @returns {CalebInputHandlerMapCB}
 */
function anykey(next, anykeyState) {
    return function(state, timing) {
        if (state.input.anykey !== anykeyState) {
            return false;
        }
        return next(state, timing);
    }
}

/**
 * @return {CalebInputHandlerMap}
 */
export function createCalebInputHandler() {
    /** @type {number[]} */
    const numericInput = []

    /** @type {CalebInputHandlerMap} */
    const inputHandlerMap = {
        0: anykey(withHold(addNumericHandler(0, numericInput)), false),
        1: anykey(withHold(addNumericHandler(1, numericInput)), false),
        2: anykey(withHold(addNumericHandler(2, numericInput)), false),
        3: anykey(withHold(addNumericHandler(3, numericInput)), false),
        4: anykey(withHold(addNumericHandler(4, numericInput)), false),
        5: anykey(withHold(addNumericHandler(5, numericInput)), false),
        6: anykey(withHold(addNumericHandler(6, numericInput)), false),
        7: anykey(withHold(addNumericHandler(7, numericInput)), false),
        8: anykey(withHold(addNumericHandler(8, numericInput)), false),
        9: anykey(withHold(addNumericHandler(9, numericInput)), false),
        h: anykey(withHold(moveHL(-1)), false),
        l: anykey(withHold(moveHL(1)), false),
        k: anykey(onKeyDown(clearNumericState(moveKJ(numericInput, -1), numericInput)), false),
        j: anykey(onKeyDown(clearNumericState(moveKJ(numericInput, 1), numericInput)), false),
        w: anykey(onKeyDown(moveWB(1)), false),
        b: anykey(onKeyDown(moveWB(-1)), false),
        f: anykey(onKeyDown(movefFtT("f")), false),
        anykey: anykey(anykeyHandler, true),
    };

    return inputHandlerMap;
}
