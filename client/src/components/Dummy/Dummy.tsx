'use client'
import { Avatar, Box, Card, Flex, Section } from '@radix-ui/themes'
import { useTheme } from 'next-themes'
import Container from '../Container/Container'

const Dummy = () => {
  const { setTheme, theme } = useTheme()

  return (
    <div>
      <h1 className="dummy">Dummy</h1>
      <button
        onClick={() => {
          if (theme === 'dark') {
            setTheme('light')
          } else {
            setTheme('dark')
          }
        }}
      >
        sdfdsfdd
      </button>
      <Box>
        <Container>
          <Card
            size={
              {
                //  initial: '3',
                //  md: '5',
                //  xl: '4',
              }
            }
          >
            <Flex gap="3" align="center">
              <Avatar
                size="3"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                radius="full"
                fallback="T"
              />
              <Box></Box>
            </Flex>
          </Card>
        </Container>
      </Box>
    </div>
  )
}

export default Dummy
