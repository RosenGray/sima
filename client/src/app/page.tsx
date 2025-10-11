

import { Button, Flex, Heading, Text, Container, Section, Box } from '@radix-ui/themes';
import styled from 'styled-components';
import Header from '../components/Header';
import { useTheme } from "next-themes";


// const PageContainer = styled(Container)`
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   padding-top: 6rem; /* Add padding to account for fixed header */
// `;

// const MainContent = styled(Section)`
//   text-align: center;
//   max-width: 600px;
// `;

export default function Home() {
  console.log('Home');
  // const { theme, setTheme } = useTheme();

  // const toggleTheme = () => {
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
  // };

  return (
    <>
      <Header  />

      <Box >
        <Box >
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
              <Button size="3" variant="solid">Get Started</Button>
              <Button size="3" variant="outline">Learn More</Button>
            </Flex>
          </Flex>
          <div style={{ marginTop: 40, width: '100%' }}>
   
          </div>
        </Box>
      </Box>
    </>
  );
}
