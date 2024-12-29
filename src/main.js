import * as Config from "./game-config.js"
import * as Levels from "./objects/level/levels/levels.js"
import { assert } from "./assert.js";
import * as Runner from "./game-runner.js";
import * as Simulation from "./simulation/state.js";
import * as State from "./state/state.js";
import * as Utils from "./utils.js";
import * as Input from "./input/input.js";
import { postStats } from "./movementStats.js";

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("game_canvas"))
assert(!!canvas, "expected canvas to exist")

const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.get("debug") === "1";
const seedParam = +urlParams.get("seed")
const seed = seedParam > 0 ? seedParam : 0
const ticks = [Runner.tickWithRender]

// TODO level selection will likely need to be passed in
const level = Levels.levels()[0]
/** @type {GameState} */
let state = null
/** @type {SimState} */
let sim = null

if (seed > 0) {
    let now = 0
    /** @param {number} next */
    function setTime(next) {
        now = next
    }
    Utils.setNow(() => {
        return now
    })

    const rand = Utils.createSimRand(Utils.mulberry32(seed))
    const res = Config.createSimGame(rand, Config.getSimGameConfig(rand), level)
    state = res.state
    sim = res.sim

    ticks.unshift(function(state) {
        setTime(now + state.opts.frameTimeMS)
    });
    ticks.unshift(Simulation.createSimulationTick(sim));

    state.getCtx = () => canvas.getContext("2d")
    state.getDim = () => canvas

} else {
    state = Config.createCanvasGame(canvas, Config.getGameConfig(debug), level)
}

Input.addListenersTo(state, canvas)
Config.addBrowserListeners(state)
State.projectStaticObjects(state);

// Set up movement stats posting every minute
setInterval(postStats, 60000);

const loop = Runner.createGameLoop(state)
Runner.clear(state)
Runner.addStandardBehaviors(state)
Runner.run(
    state,
    loop,
    ticks,
    (e) => {
        console.log("game finished", e)
    });
