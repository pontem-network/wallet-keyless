/// <reference types="vite/client" />

interface Window {
    pontem?: {
        addKeylessAccount: (payload: { jwt: string }) => Promise<{ result: { status: 'OK' } }>
    }
} 