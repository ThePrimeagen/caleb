import * as Utils from "../utils.js"
import * as Window from "../window.js"
import * as Caleb from "../objects/caleb/caleb.js"

/**
 * @param state {GameState}
 */
export function projectStaticObjects(state) {
    for (const p of state.level.activeLevel.platforms) {
        const render = p.behaviors.render
        if (!render) {
            continue
        }
        Window.project(state.ctx.canvas, render, p.physics.current.body);
    }
}

/**
 * @param state {GameState}
 */
export function reset(state) {
    state.caleb = Caleb.createCaleb(state)
    state.gameOver = false;
    state.loopStartTime = Utils.now()
    state.loopDelta = 0;
    state.tick = 0;
    state.levelChanged = true;
}

/**
 * @param {GameOptions} opts
 * @param {InputState} input
 * @param {HTMLCanvasElement} canvas
 * @param {LevelSet} level
 * @returns {GameState}
 */
export function createGameState(opts, input, canvas, level) {
    /** @type {GameState} */
    const state = {
        debug: {
            previous: {
                platforms: [],
                caleb: null,
            },
        },
        opts,
        now: Utils.now,
        level,
        levelChanged: true,

        tick: 0,

        caleb: null,
        gameOver: false,
        loopStartTime: 0,
        loopDelta: 0,
        ctx: canvas.getContext("2d"),
        rn: {zero: 1},
        input,
    };

    return state
}
