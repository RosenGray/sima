'use client';

import { useState } from 'react';
import { Button, Flex, Heading, Text, Container, Section } from '@radix-ui/themes';
import styled from 'styled-components';
import Header from '../components/Header';

const PageContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  padding-top: 6rem; /* Add padding to account for fixed header */
`;

const MainContent = styled(Section)`
  text-align: center;
  max-width: 600px;
`;

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark-theme', !isDark);
    document.documentElement.classList.toggle('light-theme', isDark);
  };

  return (
    <>
      <Header isDark={isDark} onThemeToggle={toggleTheme} />


    </>
  );
}
