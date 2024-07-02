interface MessageProps {
  id: string;
  type: "user" | "chatgpt";
  content: TextProps[];
  contentSearch?: string;
  rendered: boolean;
}

interface TextProps {
  id: string;
  content: string;
  type: "text" | "code";
}

interface HistoryProps {
  id: string;
  name: string;
  messages: MessageChildProps[];
  isArchive: boolean;
  timeSaved: string;
}

interface MessageChildProps {
  id: string;
  list: MessageProps[];
  isLoading: boolean;
  index: number;
}

export type { MessageProps, TextProps, MessageChildProps, HistoryProps };
