import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { loadJson, saveJson } from './storage';

const lightColors = {
  primary: '#E85D04',
  whatsapp: '#25D366',
  background: '#FAF7F2',
  surface: '#FFFFFF',
  text: '#1F1B16',
  muted: '#6F665C',
  border: '#E8E1D6',
  overlay: 'rgba(0,0,0,0.5)',
};

const darkColors: typeof lightColors = {
  primary: '#FF7A1A',
  whatsapp: '#25D366',
  background: '#14110F',
  surface: '#1F1B18',
  text: '#F4EEE6',
  muted: '#A39A8F',
  border: '#332D27',
  overlay: 'rgba(0,0,0,0.7)',
};

export type Colors = typeof lightColors;
type Mode = 'light' | 'dark';

export const radius = { sm: 8, md: 14, lg: 20, pill: 999 };

const THEME_KEY = 'theme-mode';

type ThemeValue = { mode: Mode; colors: Colors; toggle: () => void };

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [override, setOverride] = useState<Mode | null>(null);

  useEffect(() => {
    loadJson<Mode>(THEME_KEY).then((saved) => {
      if (saved === 'light' || saved === 'dark') setOverride(saved);
    });
  }, []);

  const mode: Mode = override ?? (system === 'dark' ? 'dark' : 'light');

  const toggle = useCallback(() => {
    const next: Mode = mode === 'dark' ? 'light' : 'dark';
    setOverride(next);
    saveJson(THEME_KEY, next);
  }, [mode]);

  const value = useMemo(
    () => ({ mode, colors: mode === 'dark' ? darkColors : lightColors, toggle }),
    [mode, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return ctx;
}
