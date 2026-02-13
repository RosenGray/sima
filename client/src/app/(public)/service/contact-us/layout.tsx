import { FC, ReactNode } from "react";
import Header from "@/components/Header/Header/Header";
import {
  ContactUsLayoutSection,
  ContactUsLayoutMain,
  ContactUsLayoutContainer,
} from "./layout.styles";

interface ContactUsLayoutProps {
  children: ReactNode;
}

const ContactUsLayout: FC<ContactUsLayoutProps> = ({ children }) => {
  return (
    <ContactUsLayoutSection>
      <Header />
      <ContactUsLayoutMain>
        <ContactUsLayoutContainer
          size="4"
          px={{ initial: "3", sm: "4", md: "6" }}
          style={{ width: "100%" }}
        >
          {children}
        </ContactUsLayoutContainer>
      </ContactUsLayoutMain>
    </ContactUsLayoutSection>
  );
};

export default ContactUsLayout;
