import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeClosed, ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { loginApi } from '@/api/auth.api'
import { useAuth } from '@/context/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function LoginPage() {
  useDocumentTitle('Login')
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await loginApi(email, password)
      if (res.data) {
        login(res.data.user, res.data.token)
        navigate('/admin')
      }
    } catch {
      setError('Email atau password salah.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden md:flex relative w-[60%] bg-gradient-to-br from-[#121212] via-[#0c0c0c] to-[#0c0c0c] items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground">HIMATIF</h1>
          <p className="text-muted-foreground mt-2">Admin Panel</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-3xl font-bold text-foreground">HIMATIF</h1>
            <p className="text-muted-foreground mt-1">Admin Panel</p>
          </div>

          <h2 className="text-xl font-semibold text-foreground mb-1">Masuk</h2>
          <p className="text-sm text-muted-foreground mb-8">Masuk ke panel administrasi</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-border focus:border-primary rounded-none px-0 py-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive-foreground">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
