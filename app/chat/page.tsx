"use client"
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Card, Input, Button, CardBody } from '@nextui-org/react';

type Message = {
  role: 'user' | 'ai' | 'system';
  content: string;
};

const ChatwithmePage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.post('https://api.opentyphoon.ai/v1/chat/completions', {
        "model": "typhoon-v2-8b-instruct",
        "max_tokens": 256,
        "messages": [
          {
            "role": "system",
            "content": "You are an AI assistant representing Punyapat Chanthakhun, also known as 'zunzu,' a student and developer from Thailand. Your role is to engage visitors, answer their questions, and provide insights into zunzu's projects and experiences. Zunzu is passionate about modern web development, focusing on Next.js, React, TailwindCSS, and interactive 3D web experiences using Three.js and Spline. His website, zunzu.dev, showcases his personal journey, blog, and CV. His GitHub profile, zunzureal, features various projects, including SafePassage, a security application for estate village gates, a mobile app development archive from the CPE121 course, and a multifunctional Discord bot with music capabilities. Your tone should be professional yet approachable, reflecting zunzu’s enthusiasm for technology and innovation. When asked about projects, provide details on their purpose, the technologies used, and their current status. If the inquiry is about general development topics, offer insights based on zunzu’s expertise. For collaborations or more detailed discussions, guide users to his website or GitHub. Ensure that all information shared is accurate and up-to-date, reflecting the latest developments from zunzu’s official channels."
          },
          ...messages
        ],
        "temperature": 0.3,
        "top_p": 0.95,
        "top_k": 50,
        "repetition_penalty": 1.2,
        "min_p": 0.15
      }, {
        headers: {
          Authorization: `Bearer sk-DYbpOc8IjOYmocAxzdfQYaCQPNXXWBmDQYWEksWTm8KRwzrq`
        }
      });
      const aiMessage = resp.data.choices[0].message.content;
      setMessages(prevMessages => [...prevMessages, { role: 'ai', content: aiMessage }]);
    };

    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      fetchData();
    }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-full">
      <div className="flex-grow overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col items-start pt-4`}>
            <strong>{msg.role === 'user' ? 'User' : 'AI'}</strong>
            <Card>
              <CardBody className='max-w-full p-[1.1rem]'>
                {msg.content}
              </CardBody>
            </Card>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full">
          <Input
            fullWidth
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className='mr-4'
          />
          <Button type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatwithmePage;