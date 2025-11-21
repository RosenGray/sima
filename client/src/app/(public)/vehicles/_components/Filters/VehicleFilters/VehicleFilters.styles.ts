"use client";
import styled from "styled-components";

export const VehicleFiltersContainer = styled.div`
  transform: translateY(-50%);
  background: var(--accent-1);
  height: 200px;
  border-radius: var(--radius-3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--gray-6);
  display:flex;
  flex-direction: column;
`;

export const VehicleFiltersHeader = styled.header`
  height: 60px;
  border-bottom: 0.5px solid var(--gray-6);
`;

export const VehicleFiltersContent = styled.div`
  flex: 1;
  padding: 20px;
`;