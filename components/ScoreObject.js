import { View, Image } from "react-native";
import Matter from "matter-js";

const Egg = (props) => {
  const width = props.radius;
  const xPos = props.body.position.x;
  const yPos = props.body.position.y;

  return (
    <View
      style={{
        width: width,
        height: width,
        left: xPos,
        top: yPos,
        borderRadius: 40,
        position: "absolute",
        backgroundSize: "cover",
    }}
    >
      <Image
        style={{
            resizeMode: "contain",
            height: 40,
            width: 40,
        }}
        source={props.extraOptions.source}
      />
    </View>
  );
};

export default (world, color, pos, radius, extraOptions) => {
  const theBox = Matter.Bodies.circle(
    pos.x,
    pos.y,
    radius,
    {
      label: extraOptions.label,
      frictionAir: 0.1,
      angularVelocity: 0,
      restitution: extraOptions.restitution,
      mass: 0,
      inverseMass: 0,
      inertia: 0,
      inverseInertia: 0,
      friction: 8,
      frictionStatic: 0,
      isStatic: extraOptions.isStatic,
      isSleeping: extraOptions.isSleeping,
      velocity: { x: 0, y: 0 },
    }
  );
  Matter.World.add(world, theBox);
  return { body: theBox, color, pos, radius, extraOptions, renderer: <Egg /> };
};
