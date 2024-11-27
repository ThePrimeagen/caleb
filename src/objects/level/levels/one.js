import * as Utils from "./utils.js"

/**
 * @returns {LevelSet}
 */
export function createLevel() {
    const data = {
        "path": "./levels/default.json",
        "editorState": {
            "levelSet": {
                "levels": [
                    {
                        "letterMap": [],
                        "platforms": [
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 30
                                    },
                                    "width": 32,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 38,
                                        "y": 26
                                    },
                                    "width": 1,
                                    "height": 4
                                },
                                "behaviors": {
                                    "next": {
                                        "type": "next-level",
                                        "toLevel": 1,
                                        "toLevelPosition": {
                                            "x": 1,
                                            "y": 0
                                        }
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 7
                                    },
                                    "width": 1,
                                    "height": 23
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 8,
                                        "y": 7
                                    },
                                    "width": 31,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 38,
                                        "y": 8
                                    },
                                    "width": 1,
                                    "height": 18
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 30,
                                        "y": 25
                                    },
                                    "width": 3,
                                    "height": 5
                                },
                                "behaviors": {
                                    "instagib": {
                                        "type": "instagib"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            }
                        ],
                        "initialPosition": {
                            "x": 3,
                            "y": 21
                        }
                    },
                    {
                        "letterMap": [],
                        "platforms": [
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 30
                                    },
                                    "width": 9,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 26
                                    },
                                    "width": 1,
                                    "height": 4
                                },
                                "behaviors": {
                                    "next": {
                                        "type": "next-level",
                                        "toLevel": 0,
                                        "toLevelPosition": {
                                            "x": 30,
                                            "y": 0
                                        }
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 15,
                                        "y": 29
                                    },
                                    "width": 7,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 38,
                                        "y": 25
                                    },
                                    "width": 1,
                                    "height": 5
                                },
                                "behaviors": {
                                    "next": {
                                        "type": "next-level",
                                        "toLevel": 2,
                                        "toLevelPosition": {
                                            "x": 1,
                                            "y": 0
                                        }
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 21,
                                        "y": 30
                                    },
                                    "width": 18,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 7
                                    },
                                    "width": 1,
                                    "height": 19
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 38,
                                        "y": 7
                                    },
                                    "width": 1,
                                    "height": 18
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            }
                        ],
                        "initialPosition": {
                            "x": 24,
                            "y": 24
                        }
                    },
                    {
                        "letterMap": [],
                        "platforms": [
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 30
                                    },
                                    "width": 7,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 14,
                                        "y": 19
                                    },
                                    "width": 1,
                                    "height": 12
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 14,
                                        "y": 18
                                    },
                                    "width": 21,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 34,
                                        "y": 7
                                    },
                                    "width": 5,
                                    "height": 12
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 22
                                    },
                                    "width": 3,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 7
                                    },
                                    "width": 3,
                                    "height": 15
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 10,
                                        "y": 7
                                    },
                                    "width": 24,
                                    "height": 1
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            },
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 7,
                                        "y": 23
                                    },
                                    "width": 1,
                                    "height": 7
                                },
                                "behaviors": {
                                    "next": {
                                        "type": "next-level",
                                        "toLevel": 1,
                                        "toLevelPosition": {
                                            "x": 30,
                                            "y": 0
                                        }
                                    }
                                }
                            }
                        ],
                        "initialPosition": {
                            "x": 24,
                            "y": 24
                        }
                    },
                    {
                        "letterMap": [],
                        "platforms": [
                            {
                                "selected": null,
                                "AABB": {
                                    "pos": {
                                        "x": 25,
                                        "y": 25
                                    },
                                    "width": 1,
                                    "height": 6
                                },
                                "behaviors": {
                                    "obstacle": {
                                        "type": "obstacle"
                                    },
                                    "render": {
                                        "type": "render"
                                    }
                                }
                            }
                        ],
                        "initialPosition": {
                            "x": 24,
                            "y": 24
                        }
                    }
                ],
                "title": "The Initial",
                "difficulty": 0,
                "initialLevel": 0,
                "current": 0
            },
            "debug": false,
            "tick": 170839,
            "change": 2306,
            "mouse": {
                "startTime": 1732713825013,
                "startingEl": null,
                "state": "invalid"
            },
            "outerRect": {
                "margin": 7,
                "maxX": 39,
                "maxY": 31
            }
        }
    }

    // @ts-ignore solve all my problems
    return Utils.convertLevelSet(data.editorState.levelSet)
}

