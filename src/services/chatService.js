import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'https://api.malonda.mw';

let socket = null;

export const chatService = {
  /**
   * Connect to the WebSocket server.
   */
  connect(userId, token) {
    if (socket?.connected) return socket;

    socket = io(SOCKET_URL, {
      auth: { token },
      query: { userId },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => console.log('[Chat] Connected:', socket.id));
    socket.on('disconnect', () => console.log('[Chat] Disconnected'));
    socket.on('connect_error', (err) => console.error('[Chat] Error:', err.message));

    return socket;
  },

  disconnect() {
    socket?.disconnect();
    socket = null;
  },

  /**
   * Send a message to a recipient.
   */
  sendMessage(recipientId, message) {
    if (!socket?.connected) return;
    socket.emit('message:send', { recipientId, message });
  },

  /**
   * Listen for incoming messages.
   */
  onMessage(callback) {
    socket?.on('message:receive', callback);
    return () => socket?.off('message:receive', callback);
  },

  /**
   * Emit typing indicator.
   */
  sendTyping(recipientId) {
    socket?.emit('typing', { recipientId });
  },

  onTyping(callback) {
    socket?.on('typing', callback);
    return () => socket?.off('typing', callback);
  },

  /**
   * Mark messages as read.
   */
  markRead(senderId) {
    socket?.emit('message:read', { senderId });
  },

  getSocket() {
    return socket;
  },
};

export default chatService;
