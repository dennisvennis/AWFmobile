import React, { Component } from "react";
import SvgUri from "react-native-svg-uri";

class SvgImages extends Component {
  // Change this method
  UNSAFE_componentWillReceiveProps(nextProps) {
    // Your existing logic
  }

  render() {
    const { source, width, height } = this.props;

    return <SvgUri width={width} height={height} source={source} />;
  }
}

export default SvgImages;
