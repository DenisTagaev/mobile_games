import { View, Image } from "react-native";
import Matter from "matter-js";

const Obstacle = (props) => {
  const width = props.radius;
  const xPos = props.body.position.x;
  const yPos = props.body.position.y;
  const angle = props.body.angle;

  return (
    <View
      style={{
        width: width,
        height: width,
        left: xPos,
        top: yPos,
        position: "absolute",
        backgroundSize: "auto",
        transform: [{ rotate: angle + "deg" }],
      }}
    >
      <Image
        style={{
          resizeMode: "cover",
          height: props.radius,
          width: props.radius,
        }}
        source={props.extraOptions.source}
      />
    </View>
  );
};

export default (world, color, pos, radius, extraOptions) => {
  const theBox = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: extraOptions.label,
    frictionAir: 0.25,
    angularVelocity: 0,
    restitution: extraOptions.restitution,
    mass: 1,
    friction: 0.1,
    frictionStatic: 0,
    isStatic: extraOptions.isStatic,
    isSleeping: extraOptions.isSleeping,
    angle: extraOptions.angle,
    velocity: { x: 0, y: 0 },
  });
  Matter.World.add(world, theBox);
  return { body: theBox, color, pos, radius, extraOptions, renderer: <Obstacle /> };
};
