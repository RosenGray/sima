"use client";
import {Container} from "@radix-ui/themes";
import styled from "styled-components";

export const ProfessionalServicePageContainer = styled(Container)`
  height: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;

  & > div:first-child{

    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
  }


`;