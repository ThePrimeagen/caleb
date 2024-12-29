import * as Input from "../../input/input.js"
import { ZERO } from "../../math/vector.js";
import * as Level from "../level/level.js"
import * as CalebUtils from "./utils.js";
import { recordMovement } from "../../movementStats.js";

/**
 * @param {-1 | 1} dir
 * @returns {InputHandler}
 */
function moveWB(dir) {
    return function(state) {
        if (state.caleb.dash.dashing) {
            recordMovement(dir === 1 ? "w" : "b", null, false);
            return false;
        }

        const caleb = state.caleb;
        const dash = caleb.dash;

        const row = CalebUtils.getNextRow(state.caleb)
        const col = CalebUtils.getNextCol(state.caleb)
        const letters = Level.getLetters(state, row)

        let destination = -1
        for (const {idx} of letters) {
            if (dir === -1 && idx < col) {
                destination = idx
            } else if (dir === 1 && idx > col) {
                destination = idx
            }
        }

        if (destination === -1) {
            recordMovement(dir === 1 ? "w" : "b", null, false);
            return
        }

        recordMovement(dir === 1 ? "w" : "b", null, true);
        resetJumpState(state);
        resetDashState(state);
        resetVel2(state);

        const distance = destination - state.caleb.physics.next.body.pos.x + CalebUtils.CALEB_WIDTH
        dash.dashing = true;
        dash.dashDistance = Math.abs(distance)
        dash.dashStart = null
        dash.dashDir = distance > 0 ? 1 : -1
        if (dash.dashDir === 1) {
            dash.dashDistance -= CalebUtils.CALEB_WIDTH
        }

        return true;
    }
}

/**
 * @param {GameState} state
 */
function movePortal(state) {
    const caleb = state.caleb;
    caleb.portal.portaling = true
    caleb.portal.tick = 0
    recordMovement("%", null, true);
    return true
}

/**
 * @param {-1 | 1} dir
 * @returns {InputHandler}
 */
function moveKJ(dir) {

    return function(state) {
        if (state.caleb.jump.noJumpTime > 0) {
            recordMovement(dir === 1 ? "j" : "k", null, false);
            return false;
        }

        const input = state.input;
        const caleb = state.caleb;
        const jump = caleb.jump;
        const opts = caleb.opts.jump;
        const number = Math.min(Math.max(state.input.numericModifier, 1), 15)

        input.numericModifier = 0
        jump.jumping = true;
        jump.jumpDistance = number
        jump.jumpStart = null
        recordMovement(dir === 1 ? "j" : "k", number, true);
        jump.noJumpTime = (number * opts.noJumpMultiplier) + opts.noJumpBase;
        jump.jumpDir = dir

        if (dir === 1) {
            jump.jumpDistance -= CalebUtils.CALEB_HEIGHT
        }

        resetDashState(state);
        resetVel2(state);

        return true;
    }
}

/**
 * @param dir {number}
 * @returns {InputHandler}
 */
function moveHL(dir) {
    return function(state) {
        resetVel2(state);
        state.caleb.physics.next.vel.x = state.opts.caleb.normWidthsPerSecond * dir
        // Track hold time in handleHL
        return true;
    }
}

/**
 * @param {fFtTKey} key
 * @returns {InputHandler}
 */
function movefFtT(key) {
    return function(state) {
        state.caleb.fFtT.type = key
        state.caleb.fFtT.startTick = state.tick
        state.input.anykey = completefFtT;

        // modifies a structure while iterating it...
        state.input.inputs.length = 0

        return true;
    }
}

/**
 * @param {GameState} state
 */
function completeCommand(state) {
    const input = state.input.inputs[0]
    if (!input) {
        return
    }

    state.input.inputs.length = 0
    state.input.anykey = null
    if (input.key === "q") {
        state.done = true
    }
}

/**
 * @param {GameState} state
 * @returns {boolean}
 */
function command(state) {
    state.input.anykey = completeCommand;
    state.input.inputs.length = 0
    return true;
}

/**
 * @param {GameState} state
 */
function completefFtT(state) {
    const caleb = state.caleb;
    const fFtT = caleb.fFtT;
    const dash = caleb.dash;
    const input = state.input.inputs[0];
    if (!input) {
        recordMovement(fFtT.type, null, false);
        return;
    }

    state.input.inputs.length = 0;
    state.input.anykey = null;

    const row = CalebUtils.getNextRow(state.caleb);
    const col = CalebUtils.getNextCol(state.caleb);
    const letters = Level.getLetters(state, row);
    let destination = -1;
    for (const {key, idx} of letters) {
        if (input.key === key) {
            if ((fFtT.type === "f" || fFtT.type === "t") && idx > col ||
                (fFtT.type === "F" || fFtT.type === "T") && idx < col) {
                destination = idx;
                break;
            }
        }
    }

    if (destination === -1) {
        recordMovement(fFtT.type, null, false);
        return;
    }

    recordMovement(fFtT.type, input.key, true);
    resetJumpState(state);
    resetDashState(state);
    resetVel2(state);

    // Adjust destination based on motion type (f/F/t/T)
    if (fFtT.type === "t") {
        destination -= CalebUtils.CALEB_WIDTH - 0.01; // Move before character
    } else if (fFtT.type === "T") {
        destination += 1.01; // Move after character
    }

    const distance = destination - CalebUtils.getNextX(caleb);
    dash.dashing = true;
    dash.dashDistance = Math.abs(distance);
    dash.dashStart = null;
    dash.dashDir = distance > 0 ? 1 : -1;

    caleb.physics.next.acc.x = 0;
    caleb.physics.next.acc.y = 0;
}

/**
* @param {string} key
* @param {InputHandler} next
* @returns {InputHandler}
*/
function filter(key, next) {
    return function(state, input) {
        if (key !== input.key) {
            return false;
        }
        return next(state, input);
    }
}

function onDown(next) {
    return function(state, input) {
        if (input.type !== "down" && input.type !== "down-up") {
            return false;
        }
        return next(state, input);
    }
}

const _0 = "0".charCodeAt(0)
const _9 = "9".charCodeAt(0)

/**
 * @param {InputHandler} next
 * @returns {InputHandler}
 */
function isNumeric(next) {
    return function(state, input) {
        const code = input.key.charCodeAt(0)
        if (code < _0 || code > _9) {
            return false;
        }
        return next(state, input);
    }
}

/**
 * @param {GameState} state
 * @param {Input} input
 * @returns boolean
 */
function numericModifier(state, input) {
    state.input.numericModifier *= 10
    state.input.numericModifier += +input.key
    return true;
}

const h = filter("h", moveHL(-1));
const l = filter("l", moveHL(1));
const j = onDown(filter("j", moveKJ(1)));
const k = onDown(filter("k", moveKJ(-1)));
const w = onDown(filter("w", moveWB(1)));
const b = onDown(filter("b", moveWB(-1)));
const f = onDown(filter("f", movefFtT("f")));
const t = onDown(filter("t", movefFtT("t")));
const F = onDown(filter("F", movefFtT("F")));
const T = onDown(filter("T", movefFtT("T")));
const quit = onDown(filter(":", command));
const numeric = onDown(isNumeric(numericModifier))
const portal = onDown(filter("%", movePortal));

/**
 * @param {GameState} state
 */
function handleHL(state) {
    if (state.input.anykey) {
        state.caleb.physics.next.vel.x = 0
        return
    }

    const delta = 1000 / 60; // Assuming 60fps, adjust if needed
    const hInput = Input.get(state.input, "h")
    const lInput = Input.get(state.input, "l")

    // Track hold times
    if (hInput && hInput.type === "hold") {
        recordMovement("h", delta);
    }
    if (lInput && lInput.type === "hold") {
        recordMovement("l", delta);
    }

    // Handle movement
    if (hInput && !lInput) {
        h(state, hInput)
    } else if (!hInput && lInput) {
        l(state, lInput)
    } else if (!state.caleb.dash.dashing) {
        state.caleb.physics.next.vel.x = 0
    }
}

/**
 * @param {GameState} state
 * @param {number} _
 */
export function apply(state, _) { }

/**
 * @param {GameState} state
 * @param {number} _
 */
export function update(state, _) {
    handleHL(state);
    if (state.input.anykey) {
        state.input.anykey(state)
        return
    }

    for (const i of state.input.inputs) {
        numeric(state, i)
        j(state, i)
        k(state, i)
        w(state, i)
        b(state, i)
        f(state, i)
        F(state, i)
        t(state, i)
        T(state, i)
        quit(state, i)
        portal(state, i)
    }
}

/**
 */
export function tickClear() { }

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

/** @param {CalebOpts} opts
/** @returns {CalebHodl} */
export function defaultHodlState(opts) {
    return {
        hodlTime: opts.hodlTime
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
        startTick: 0,
    }
}

/** @returns {CalebPortal} */
export function defaultPortal() {
    return {
        portaling: false,
        to: 0,
    }
}


/**
 * @param state {GameState}
 */
export function resetPlatformHold(state) {
    state.caleb.platform.platform = null
}

/**
 * @param state {GameState}
 */
export function resetVel2(state) {
    state.caleb.physics.current.vel2.set(ZERO);
    state.caleb.physics.next.vel2.set(ZERO);
}

/**
 * @param state {GameState}
 */
export function resetJumpState(state) {
    const jump = state.caleb.jump
    state.caleb.physics.next.vel.y = 0
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
 * @param {GameState} state
 */
export function resetPortalState(state) {
    state.caleb.portal.portaling = false
    state.caleb.portal.tick = 0
}

