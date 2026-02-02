"use client"

import type React from "react";

import { createContext, useCallback, useState } from "react";

interface FloatingWidgetState {
  isOpen: boolean;
  title?: string;
  description?: string;
  isGenerating?: boolean;
  fileName?: string;
  fileSize?: string;
  progress?: number;
  onComplete?: () => void;
  onCancel?: () => void;
}

export interface FloatingWidgetContextType {
  state: FloatingWidgetState;
  openWidget: (options: Omit<FloatingWidgetState, "isOpen">) => void;
  closeWidget: () => void;
  updateProgress: (progress: number) => void;
  setGenerating: (isGenerating: boolean) => void;
  abortController?: AbortController;
  setAbortController: (controller: AbortController) => void;
}

const initialState: FloatingWidgetState = {
  isOpen: false,
  title: "",
  description: "",
  isGenerating: false,
  fileName: "",
  fileSize: "",
  progress: 0,
}

export const FloatingWidgetContext = createContext<FloatingWidgetContextType | undefined>(undefined);

export function FloatingWidgetProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<FloatingWidgetState>(initialState);
  const [abortController, setAbortController] = useState<AbortController | undefined>();

  const openWidget = useCallback((options: Omit<FloatingWidgetState, "isOpen">) => {
    setState({ ...options, isOpen: true });
  }, []);

  const closeWidget = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const updateProgress = useCallback(
    (progress: number) => {
      setState((prev) => ({ ...prev, progress }));

      if (progress === 100) {
        const timer = setTimeout(() => {
          setState((prev) => ({ ...prev, isOpen: false }));
          if (state.onComplete) state.onComplete();
        }, 1000);

        return () => clearTimeout(timer);
      }
    },
    [state.onComplete],
  );

  const setGenerating = useCallback((isGenerating: boolean) => {
    setState((prev) => ({ ...prev, isGenerating }));
  }, []);

  return (
    <FloatingWidgetContext.Provider
      value={{
        state,
        openWidget,
        closeWidget,
        updateProgress,
        setGenerating,
        abortController,
        setAbortController
      }}
    >
      {children}
    </FloatingWidgetContext.Provider>
  )
}