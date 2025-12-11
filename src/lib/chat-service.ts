type ChatMessage = { id: string; client: string; sender: 'Client' | 'Admin'; text: string; timestamp: number };

export const chatService = {
  send(client: string, sender: 'Client' | 'Admin', text: string) {
    const msg: ChatMessage = { id: `${Date.now()}-${Math.random()}`, client, sender, text, timestamp: Date.now() };
    const raw = typeof window !== 'undefined' ? localStorage.getItem('chat_messages') : null;
    const arr: ChatMessage[] = raw ? JSON.parse(raw) : [];
    arr.push(msg);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chat_messages', JSON.stringify(arr));
      try { new BroadcastChannel('chat').postMessage(msg); } catch {}
    }
    return msg;
  },
  list(client: string): ChatMessage[] {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('chat_messages') : null;
    const arr: ChatMessage[] = raw ? JSON.parse(raw) : [];
    return arr.filter(m => m.client === client).sort((a,b)=>a.timestamp-b.timestamp);
  },
  subscribe(callback: (msg: ChatMessage) => void) {
    try {
      const ch = new BroadcastChannel('chat');
      ch.onmessage = (e) => callback(e.data as ChatMessage);
      return () => ch.close();
    } catch {
      return () => {};
    }
  }
};
