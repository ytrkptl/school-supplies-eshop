import React from 'react';
import { StyledFooter, FooterTitle, FooterGrid, FooterLink, FooterAuthor } from './footer.styles';

const Footer = () => (
	<StyledFooter>
      <FooterTitle>Dummy Footer</FooterTitle>
      <FooterGrid>
        <FooterLink to="/">Footer links would go here</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
        <FooterLink to="/">Dummy Link</FooterLink>
      </FooterGrid>
      <FooterAuthor>Created by: Yatrik Patel, September 4, 2019</FooterAuthor>
  </StyledFooter>
)

export default Footer;