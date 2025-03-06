import { ChakraProvider, Container, VStack, Heading, Box, useColorModeValue, Image, Flex } from '@chakra-ui/react'
import ChatInterface from './components/ChatInterface'
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    notredame: {
      navy: '#0C2340',
      gold: '#C99700',
      blue: '#0C2340',
      50: '#E5E9EE',
      100: '#B3BCC9',
      200: '#8997AB',
      300: '#5C6F8C',
      400: '#395377',
      500: '#0C2340',
      600: '#0A1D36',
      700: '#081729',
      800: '#05101C',
      900: '#03080F',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'notredame',
      },
    },
  },
})

function App() {
  const bgColor = useColorModeValue('white', 'notredame.700')

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg="gray.50" py={8}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="stretch">
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <Flex direction="column" align="center" gap={4}>
                <Image
                  src="/nd-logo.png"
                  alt="Notre Dame Learning Logo"
                  height="80px"
                  objectFit="contain"
                />
                <Box textAlign="center">
                  <Heading as="h1" size="xl" color="notredame.navy" mb={2}>
                    AI Course Material Generator
                  </Heading>
                  <Heading as="h2" size="sm" color="notredame.500" fontWeight="normal">
                    Create engaging educational content with AI assistance
                  </Heading>
                </Box>
              </Flex>
            </Box>
            <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md">
              <ChatInterface />
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default App
