import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles.jsx";

const Spinner = ({
  overlayHeight = "",
  overlayWidth = "",
  containerHeight = "",
  containerWidth = "",
}) => (
  <SpinnerOverlay height={overlayHeight} width={overlayWidth}>
    <SpinnerContainer height={containerHeight} width={containerWidth} />
  </SpinnerOverlay>
);

export default Spinner;
