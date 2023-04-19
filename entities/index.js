import Object from "../components/Object";
import ScoreObject from "../components/ScoreObject";
import Boundary from "../components/Boundary";
import Obstacle from "../components/Obstacle";
import Matter from "matter-js";
import Constants from "../Constants";

import Images from "../Images/Images";

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 1;

  return {
    physics: { engine, world },

    Player: Object(
      world,
      "green",
      { x: Constants.WINDOW_WIDTH / 2, y: 700 },
      { width: 75, height: 140 },
      {
        isStatic: false,
        label: "Player",
        source: Images.Player,
        restitution: 0,
      }
    ),
    Egg: ScoreObject(
      world,
      "green",
      { x: Constants.WINDOW_WIDTH / 4, y: 140 },
      5,
      { isStatic: false, label: "Score", source: Images.Egg, restitution: 0 }
    ),
    Obstacle1: Obstacle(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH  - 60, y: 160 },
      40,
      { isStatic: false, label: "Obstacle", source: Images.Obstacle, restitution: 0, angle: 45 }
    ),
    Obstacle2: Obstacle(
      world,
      "brown",
      { x: Constants.WINDOW_WIDTH / 5 - 8, y: 265 },
      55,
      { isStatic: true, label: "Obstacle", source: Images.Obstacle, restitution: 0, angle: -45 }
    ),
    LeftBoundary: Boundary(
      world,
      "red",
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 1 }
    ),
    RightBoundary: Boundary(
      world,
      "red",
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 1 }
    ),
    BottomBoundary: Boundary(
      world,
      "#9f0",
      { x: Constants.WINDOW_WIDTH / 2, y: 800 },
      { height: 50, width: Constants.WINDOW_WIDTH }
    ),
  };
};
