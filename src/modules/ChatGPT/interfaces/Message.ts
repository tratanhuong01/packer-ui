interface MessageProps {
  id: number;
  type: "user" | "chatgpt";
  content: TextProps[];
  contentSearch?: string;
}

interface TextProps {
  id: number;
  content: string;
  type: "text" | "code";
}

interface HistoryProps {
  id: number;
  name: string;
  messages: MessageChildProps[];
}

interface MessageChildProps {
  id: number;
  list: MessageProps[];
  isLoading: boolean;
  index: number;
}

export type { MessageProps, TextProps, MessageChildProps, HistoryProps };
