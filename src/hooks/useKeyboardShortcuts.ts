/**
 * useKeyboardShortcuts Hook
 * Register global keyboard shortcuts
 */

'use client';

import { useEffect } from 'react';

interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrlKey, shiftKey, altKey, callback }) => {
        const ctrlMatch = ctrlKey === undefined || e.ctrlKey === ctrlKey;
        const shiftMatch = shiftKey === undefined || e.shiftKey === shiftKey;
        const altMatch = altKey === undefined || e.altKey === altKey;

        if (e.key.toLowerCase() === key.toLowerCase() && ctrlMatch && shiftMatch && altMatch) {
          e.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
