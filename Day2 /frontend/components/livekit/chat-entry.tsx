import * as React from 'react';
import { cn } from '@/lib/utils';
import { User, Robot } from '@phosphor-icons/react';

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
  const isLocal = messageOrigin === 'local';
  const displayName = name || (isLocal ? 'You' : 'Barista');

  return (
    <li
      title={title}
      data-lk-message-origin={messageOrigin}
      className={cn('group flex w-full gap-4', isLocal && 'flex-row-reverse', className)}
      {...props}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full shadow-sm',
          isLocal
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
            : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
        )}
      >
        {isLocal ? <User className="size-5" weight="fill" /> : <Robot className="size-5" weight="fill" />}
      </div>

      {/* Message Content */}
      <div className={cn('flex flex-col gap-2', isLocal && 'items-end')}>
        <header
          className={cn(
            'flex items-center gap-2 text-xs font-semibold uppercase tracking-wide',
            isLocal ? 'flex-row-reverse text-amber-700 dark:text-amber-400' : 'text-orange-700 dark:text-orange-400'
          )}
        >
          <strong>{displayName}</strong>
          <span className="font-mono text-xs font-normal lowercase opacity-0 transition-opacity ease-linear group-hover:opacity-70">
            {hasBeenEdited && '*'}
            {time.toLocaleTimeString(locale, { timeStyle: 'short' })}
          </span>
        </header>
        <span
          className={cn(
            'max-w-sm rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm',
            isLocal
              ? 'bg-amber-600 text-white dark:bg-amber-700'
              : 'border border-gray-200 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200'
          )}
        >
          {message}
        </span>
      </div>
    </li>
  );
};
