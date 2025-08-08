'use client';

import { useState } from 'react';
import { Button, Flex, Heading, Text, Container, Section } from '@radix-ui/themes';
import styled from 'styled-components';

const PageContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 100;
`;

const MainContent = styled(Section)`
  text-align: center;
  max-width: 600px;
`;

const ThemeToggleButton = styled(Button)`
  cursor: pointer;
`;

// Icons for light and dark theme
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark-theme', !isDark);
    document.documentElement.classList.toggle('light-theme', isDark);
  };

  return (
    <>
      <Header>
        <ThemeToggleButton 
          variant="ghost" 
          size="2"
          onClick={toggleTheme}
          title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </ThemeToggleButton>
      </Header>

      <PageContainer size="4">
        <MainContent size="1">
          <Flex direction="column" gap="6" align="center">
            <Heading size="9" weight="bold">
              Hello World
            </Heading>
            
            <Text size="6" color="gray">
              Welcome to our Marketplace
            </Text>
            
            <Text size="4" color="gray" style={{ maxWidth: '500px', lineHeight: '1.6' }}>
              Discover amazing products, connect with sellers, and build your business 
              in our vibrant marketplace community. Your journey starts here.
            </Text>
            
            <Flex gap="4" mt="4">
              <Button size="3" variant="solid">
                Get Started
              </Button>
              <Button size="3" variant="outline">
                Learn More
              </Button>
            </Flex>
          </Flex>
        </MainContent>
      </PageContainer>
    </>
  );
}
