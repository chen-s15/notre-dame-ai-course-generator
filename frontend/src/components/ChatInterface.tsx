import { useState } from 'react'
import {
  VStack,
  Box,
  Input,
  Button,
  Text,
  useToast,
  HStack,
  Icon,
  useColorModeValue,
  Flex,
  Tooltip,
} from '@chakra-ui/react'
import { FiSend, FiUser, FiDownload } from 'react-icons/fi'
import { RiRobot2Line } from 'react-icons/ri'
import { sendMessage } from '../services/api'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const userBgColor = useColorModeValue('notredame.50', 'notredame.700')
  const aiBgColor = useColorModeValue('blue.50', 'notredame.600')
  const borderColor = useColorModeValue('notredame.100', 'notredame.600')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendMessage([...messages, userMessage])
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from AI',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const exportToCSV = () => {
    if (messages.length === 0) {
      toast({
        title: 'No messages to export',
        status: 'info',
        duration: 2000,
        isClosable: true,
      })
      return
    }

    // Create CSV content
    const csvContent = [
      'Role,Content',  // CSV header
      ...messages.map(msg => `${msg.role},"${msg.content.replace(/"/g, '""')}"`)
    ].join('\n')

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `chat_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: 'Export successful',
      description: 'Chat log has been downloaded as CSV',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <VStack spacing={4} align="stretch" h="full">
      <Flex justify="flex-end" mb={2}>
        <Tooltip label="Export chat to CSV">
          <Button
            onClick={exportToCSV}
            size="sm"
            leftIcon={<Icon as={FiDownload} />}
            colorScheme="notredame"
            variant="outline"
            isDisabled={messages.length === 0}
          >
            Export Chat
          </Button>
        </Tooltip>
      </Flex>
      <Box
        flex={1}
        minH="500px"
        maxH="700px"
        overflowY="auto"
        borderWidth={1}
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
        sx={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            width: '10px',
            background: useColorModeValue('gray.100', 'notredame.800'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('notredame.200', 'notredame.600'),
            borderRadius: '24px',
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            bg={message.role === 'user' ? userBgColor : aiBgColor}
            p={4}
            borderRadius="lg"
            mb={4}
            boxShadow="sm"
          >
            <Flex align="center" mb={2}>
              <Icon
                as={message.role === 'user' ? FiUser : RiRobot2Line}
                mr={2}
                boxSize={5}
                color={message.role === 'user' ? 'notredame.500' : 'notredame.gold'}
              />
              <Text fontWeight="bold" color={message.role === 'user' ? 'notredame.500' : 'notredame.gold'}>
                {message.role === 'user' ? 'You' : 'AI Assistant'}
              </Text>
            </Flex>
            <Text whiteSpace="pre-wrap" pl={7}>
              {message.content}
            </Text>
          </Box>
        ))}
      </Box>

      <form onSubmit={handleSubmit}>
        <HStack spacing={2}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about course materials, activities, or assessments..."
            disabled={isLoading}
            size="lg"
            borderRadius="lg"
            _focus={{
              borderColor: 'notredame.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-notredame-500)',
            }}
          />
          <Button
            type="submit"
            size="lg"
            colorScheme="notredame"
            isLoading={isLoading}
            loadingText="Sending"
            disabled={isLoading || !input.trim()}
            borderRadius="lg"
            px={8}
          >
            <Icon as={FiSend} />
          </Button>
        </HStack>
      </form>
    </VStack>
  )
}

export default ChatInterface 