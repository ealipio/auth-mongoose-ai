'use client';
import { ArrowUpIcon } from '@heroicons/react/20/solid';
import Img from 'next/image';
import { useState, useRef } from 'react';
import { Message, Agent } from '../../lib/openai';

const convertNewLines = (text: string) => {
  const linkRegex = /(^|\s)(https?:\/\/\S+)/g;
  return text.split('\n').map((line, i) => {
    const matches = line.match(linkRegex);
    if (matches) {
      const parts = line.split(linkRegex);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.match(linkRegex)) {
              return (
                <a
                  className="text-[#8870FF] hover:underline"
                  key={j}
                  href={part.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.trim()}
                </a>
              );
            } else {
              return <span key={j}>{part}</span>;
            }
          })}
          <br />
        </span>
      );
    } else {
      return (
        <span key={i}>
          {line}
          <br />
        </span>
      );
    }
  });
};

function Reply({ message, role }: { role: Agent; message: string }) {
  if (!message) return null;
  const formattedMessage = convertNewLines(message);

  if (role === 'system') {
    return null;
  }

  if (role === 'user') {
    return (
      <div className="mt-2 scale-95 flex items-center justify-end">
        <p className="bg-[#B2A4FF] text-white rounded-3xl p-3 px-4">
          {formattedMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 scale-95 flex items-center justify-start pr-8">
      <p className="bg-[#DCD6FF] rounded-3xl p-3">{formattedMessage}</p>
    </div>
  );
}

function ChatBox() {
  const messagesRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  console.log({ messages });
  // send message to API /api/chat endpoint
  const sendMessage = async () => {
    setLoading(true);

    const newMessages = [
      ...messages,
      { role: 'user', content: message } as Message,
    ];

    setMessage('');

    setMessages(newMessages);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: newMessages.slice(-10), // remember last 10 messages
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    let lastMessage = '';

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      lastMessage = lastMessage + chunkValue;

      setMessages([
        ...newMessages,
        { role: 'assistant', content: lastMessage } as Message,
      ]);

      messagesRef.current?.scrollIntoView({ block: 'end' });

      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-black shadow-sm border-2 p-4 rounded-2xl">
      {/* <!--  Message header section starts    --> */}
      <div className="flex gap-8 items-center">
        <div className="h-12 w-12 justify-center items-center rounded-full bg-blue-500 border-2 border-black">
          <Img
            className="scale-75"
            src="/images/cat-face.png"
            width={60}
            height={60}
            alt="cat"
          />
        </div>
        <div className="">
          <h3 className="text-indigo-500 text-lg font-bold">CatGPT</h3>
          <p className="-mt-1 text-green-500 text-base">Active now</p>
        </div>
      </div>
      {/* {/* <!-- Message header section ends --> */}
      <div className="mt-2 bg-slate-500/50 w-auto h-1"></div>
      {/* <!-- Chat inbox section starts --> */}
      <div className="grow md:h-[52vh] overflow-auto">
        <div className="h-full">
          <div className="h-full overflow-auto scrollbar">
            <div className="mt-6">
              {/* <!-- Contains the incoming and outgoing messages --> */}
              <div ref={messagesRef} className="">
                <div className="mr-16">
                  <p className="bg-slate-600 rounded-2xl p-3 text-base">
                    Hello, ask me anything about Eisson?
                  </p>
                </div>

                {messages.map((message, index) => (
                  <Reply
                    key={index}
                    message={message.content}
                    role={message.role}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* <!--  Message bottom section starts --> */}
        </div>
      </div>
      <div className="msg-bottom mt-2">
        <div className="msg-input flex gap-2 items-center">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            className="bg-neutral-300 text-black placeholder:text-black/30 rounded-2xl p-3 w-full text-base focus:outline-none focus:bg-white"
            placeholder="Type a message"
          />
          <button
            onClick={sendMessage}
            className="bg-slate-500 text-base text-white rounded-2xl p-4"
          >
            <ArrowUpIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
