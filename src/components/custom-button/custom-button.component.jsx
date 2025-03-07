import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <CustomButtonContainer
    $isGoogleSignIn={isGoogleSignIn}
    $inverted={inverted}
    {...otherProps}>
    {children}
  </CustomButtonContainer>
);

export default CustomButton;
