import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Giriş</h1>
          <p className="text-muted-foreground mt-2">Yönetim paneline erişmek için giriş yapın</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="admin@example.com"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Hesabınız yok mu?{' '}
            <Link to="/admin/signup" className="text-primary hover:underline font-medium">
              Kayıt Olun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
