import React from "react";
import { CircleArrow } from "react-scroll-up-button";

class ScrollUpButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styleScrollUp = {
            borderColor: "#53cdcb",
            fill: "#53cdcb"
        }

        return (
            <CircleArrow
              ContainerClassName="ScrollUpButton__Container"
              TransitionClassName="ScrollUpButton__Toggled"
              StopPosition={0}
              distance={100}
              breakpoint={768}
              EasingType="easeOutCubic"
              AnimationDuration={2000}
              style={styleScrollUp}
              ToggledStyle={{}}
            />
        );
    }
}

export default ScrollUpButton;