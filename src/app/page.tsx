'use client';

import { useState } from 'react';
import { 
  Container, 
  Title, 
  TextInput,
  NativeSelect,
  Button, 
  Stack, 
  Group,
  Text,
  Textarea,
  MantineProvider,
  Box,
  Code,
  Paper
} from '@mantine/core';

// List of Discord supported syntax highlighting languages
const languages = [
  { value: 'diff', label: 'diff' },
  { value: 'bash', label: 'bash' },
  { value: 'css', label: 'css' },
  { value: 'cs', label: 'cs (C#)' },
  { value: 'fix', label: 'fix' },
  { value: 'md', label: 'md (Markdown)' },
  { value: 'json', label: 'json' },
  { value: 'js', label: 'js (JavaScript)' },
  { value: 'ts', label: 'ts (TypeScript)' },
  { value: 'yml', label: 'yml (YAML)' },
  { value: 'python', label: 'python' },
  { value: 'jsx', label: 'jsx (React)' },
  { value: 'tsx', label: 'tsx (React TypeScript)' },
  { value: 'java', label: 'java' },
  { value: 'html', label: 'html' },
  { value: 'php', label: 'php' },
  { value: 'ruby', label: 'ruby' },
  { value: 'rust', label: 'rust' },
  { value: 'go', label: 'go' },
  { value: 'cpp', label: 'cpp (C++)' },
];

// Type for our supported languages
type SupportedLanguage = 'diff' | 'bash' | 'css' | 'cs' | 'fix' | 'md' | 'json' | 'js' | 'ts' | 'yml' | 
  'python' | 'jsx' | 'tsx' | 'java' | 'html' | 'php' | 'ruby' | 'rust' | 'go' | 'cpp' | 'markdown';

export default function Home() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<SupportedLanguage>('diff');
  const [generatedCode, setGeneratedCode] = useState('');
  
  // Generate formatted code for Discord
  const generateCode = () => {
    const formattedCode = `\`\`\`${language}\n${text}\n\`\`\``;
    setGeneratedCode(formattedCode);
  };
  
  // Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  // Transform languages array for NativeSelect
  const languageOptions = languages.map(lang => ({ 
    label: lang.label, 
    value: lang.value 
  }));
  
  // Custom label styles
  const labelStyle = {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#fff',
    display: 'block',
  };
  
  return (
    <MantineProvider>
      <Container size="md" py={40}>
        <Stack>
          <Title order={1} align="center" mb={20}>
            Discord Colored Text Generator
          </Title>
          
          <Text size="md" color="dimmed" align="center" mb={20}>
            Generate syntax-highlighted text for Discord using code blocks
          </Text>
          
          <Paper p="md" withBorder mb={5}>
            <Text 
              component="label" 
              htmlFor="discord-text-input"
              style={labelStyle}
              mb={10}
            >
              Enter your text
            </Text>
            
            <Textarea
              id="discord-text-input"
              placeholder="Type or paste your text here"
              value={text}
              onChange={(event) => setText(event.currentTarget.value)}
              minRows={5}
              autosize
              mb={5}
              styles={{
                input: {
                  fontSize: '1rem',
                }
              }}
            />
          </Paper>
          
          <Paper p="md" withBorder mb={15}>
            <Text 
              component="label" 
              htmlFor="syntax-select"
              style={labelStyle}
              mb={10}
            >
              Syntax Highlighting
            </Text>
            
            <NativeSelect
              id="syntax-select"
              data={languageOptions}
              value={language}
              onChange={(event) => setLanguage(event.currentTarget.value as SupportedLanguage)}
              styles={{
                input: {
                  fontWeight: 500,
                  fontSize: '1rem',
                }
              }}
            />
          </Paper>
          
          <Button 
            onClick={generateCode} 
            mb={20}
            disabled={!text.trim()}
            color="blue"
            fullWidth
            size="lg"
          >
            Generate Code
          </Button>
          
          {generatedCode && (
            <>
              <Text weight={700} size="lg" mb={5} color="white">Generated Code:</Text>
              <Box 
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.sm,
                  fontFamily: 'monospace',
                  marginBottom: 10,
                  overflow: 'auto',
                  border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
                })}
              >
                <Code block color="blue">{text}</Code>
              </Box>
              
              <Text weight={700} size="lg" mb={5} color="white">Copy this to Discord:</Text>
              <Box 
                sx={(theme) => ({
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
                  padding: theme.spacing.md,
                  borderRadius: theme.radius.sm,
                  fontFamily: 'monospace',
                  marginBottom: 10,
                  overflow: 'auto',
                  border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`
                })}
              >
                <Code block>{generatedCode}</Code>
              </Box>
              
              <Button 
                onClick={copyToClipboard} 
                variant="outline"
                color="green"
                fullWidth
                size="lg"
              >
                Copy to Clipboard
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </MantineProvider>
  );
}
