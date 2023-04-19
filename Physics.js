import Matter from "matter-js";
import Constants from "./Constants";

const Physics = (entities,  { touches, dispatch, events, time }) => {
  let createRandom = function (start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  };

  let engine = entities.physics.engine;
  let world = engine.world;

  const constraint1 = Matter.Constraint.create({
    pointA: { x: Constants.WINDOW_WIDTH - 60, y: 240 },
    bodyB: entities.Obstacle1.body,
    stiffness: 0.1, 
    damping: 0.3,
    length: 0
  });

  setInterval(() => {
    Matter.Body.rotate(entities.Obstacle1.body, -0.1);
    Matter.Body.rotate(entities.Obstacle2.body, 0.2);
  }, 1000);
  
  Matter.World.add(world, [constraint1]);

  touches
    .filter((t) => t.type === "move")
    .forEach((t) => {
      x += t.delta.pageX;
      y += t.delta.pageY;
    });

  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-left") {
        Matter.Body.setPosition(entities.Player.body, {
          x: entities.Player.body.position.x - 15,
          y: entities.Player.body.position.y,
        });
      }
      if (events[i].type === "move-right") {
        Matter.Body.setPosition(entities.Player.body, {
          x: entities.Player.body.position.x + 15,
          y: entities.Player.body.position.y,
        });
      }
    }
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    const pairs = event.pairs;
    const objALabel = pairs[0].bodyA.label;
    const objBLabel = pairs[0].bodyB.label;

    if (
      (objALabel === "BoundaryBottom" && objBLabel === "Score") ||
      (objALabel === "Score" && objBLabel === "BoundaryBottom")
    ) {
      dispatch({ type: "game_over" });
    } else if (
      (objALabel === "Player" && objBLabel === "Score") ||
      (objALabel === "Player" && objBLabel === "Score")
    ) {
      dispatch({ type: "add_score" });
      Matter.Body.setPosition(entities.Egg.body, {
        x: createRandom(30, Constants.WINDOW_WIDTH / 2 - 30),
        y: createRandom(50, 500),
      });
    }
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
