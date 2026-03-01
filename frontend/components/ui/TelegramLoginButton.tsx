"use client";

import { useEffect, useRef } from 'react';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface TelegramLoginButtonProps {
  botName: string;
  onAuth: (user: TelegramUser) => void;
  className?: string;
}

export function TelegramLoginButton({ botName, onAuth, className }: TelegramLoginButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Глобальный колбэк для Telegram
    (window as any).onTelegramAuth = (user: TelegramUser) => {
      onAuth(user);
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', botName);
    script.setAttribute('data-size', 'large');
	script.setAttribute('data-auth-url', `${window.location.origin}/api/auth/telegram-redirect`);
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-lang', 'ru');

    if (buttonRef.current) {
      buttonRef.current.innerHTML = '';
      buttonRef.current.appendChild(script);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.innerHTML = '';
      }
      delete (window as any).onTelegramAuth;
    };
  }, [botName, onAuth]);

  return <div ref={buttonRef} className={className} />;
}