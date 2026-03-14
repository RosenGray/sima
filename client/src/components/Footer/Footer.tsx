"use client";

import React, { FC } from "react";
import {
  FooterContainer,
  FooterInner,
  FooterLeft,
  FooterRight,
} from "./Footer.styles";

const Footer: FC = () => {
  return (
    <FooterContainer>
      {/* place holder for disclaimer */}
      <FooterInner>
        <FooterLeft />
        <FooterRight />
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;
