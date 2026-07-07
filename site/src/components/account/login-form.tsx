'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

/** Login area riservata: usa l'API auth di Payload (cookie httpOnly). */
export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setPending(true)
    const formData = new FormData(event.currentTarget)
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: String(formData.get('email') ?? ''),
          password: String(formData.get('password') ?? ''),
        }),
      })
      if (!response.ok) {
        setError('Email o password non corretti.')
        return
      }
      router.refresh()
    } catch {
      setError('Errore di connessione. Riprova.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 h-11 w-full rounded-md border bg-background px-3 text-sm outline-none ring-ring/50 focus:ring-2"
        />
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
      >
        {pending ? 'Accesso in corso…' : 'Accedi'}
      </button>
    </form>
  )
}
