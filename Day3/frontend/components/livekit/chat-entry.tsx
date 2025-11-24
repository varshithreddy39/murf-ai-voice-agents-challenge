import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ChatEntryProps extends React.HTMLAttributes<HTMLLIElement> {
  /** The locale to use for the timestamp. */
  locale: string;
  /** The timestamp of the message. */
  timestamp: number;
  /** The message to display. */
  message: string;
  /** The origin of the message. */
  messageOrigin: 'local' | 'remote';
  /** The sender's name. */
  name?: string;
  /** Whether the message has been edited. */
  hasBeenEdited?: boolean;
}

export const ChatEntry = ({
  name,
  locale,
  timestamp,
  message,
  messageOrigin,
  hasBeenEdited = false,
  className,
  ...props
}: ChatEntryProps) => {
  const time = new Date(timestamp);
  const title = time.toLocaleTimeString(locale, { timeStyle: 'full' });

  // Highlight Notion-related keywords
  const highlightNotionKeywords = (text: string) => {
    const keywords = ['notion', 'task', 'complete', 'done', 'todo', 'database'];
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    
    return text.split(regex).map((part, i) => {
      if (keywords.some(k => k.toLowerCase() === part.toLowerCase())) {
        return (
          <span key={i} className="font-semibold text-green-600 dark:text-green-400">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <li
      title={title}
      data-lk-message-origin={messageOrigin}
      className={cn('group flex w-full gap-3 py-2', className)}
      {...props}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shadow-md transition-transform duration-200 group-hover:scale-105',
          messageOrigin === 'local'
            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 order-2'
            : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30'
        )}
      >
        {messageOrigin === 'local' ? (
          <svg
            className="w-5 h-5 text-purple-600 dark:text-purple-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-green-600 dark:text-green-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        'flex-1 flex flex-col gap-1.5',
        messageOrigin === 'local' ? 'items-end' : 'items-start'
      )}>
        <div className={cn(
          'flex items-center gap-2 text-xs',
          messageOrigin === 'local' ? 'flex-row-reverse' : 'flex-row'
        )}>
          {name && (
            <span className="font-bold text-foreground">
              {name}
            </span>
          )}
          <span className="text-muted-foreground/60 font-mono text-[10px]">
            {hasBeenEdited && <span className="mr-1">✏️</span>}
            {time.toLocaleTimeString(locale, { timeStyle: 'short' })}
          </span>
        </div>
        
        <div
          className={cn(
            'px-4 py-2.5 rounded-2xl text-sm leading-relaxed max-w-[85%] shadow-sm transition-all duration-200 group-hover:shadow-md',
            messageOrigin === 'local'
              ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-foreground rounded-tr-sm'
              : 'bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 text-foreground rounded-tl-sm'
          )}
        >
          {highlightNotionKeywords(message)}
        </div>
      </div>
    </li>
  );
};
