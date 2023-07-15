import Chat from '@/components/chat-mendable';
// import { Button } from '@/components/ui/button';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/20/solid';

export default function Home() {
  return (
    <div className="flex bg-gray-50 min-h-screen items-center justify-center">
      <Chat />
    </div>
  );
}
