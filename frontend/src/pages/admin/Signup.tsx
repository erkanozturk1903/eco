import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const navigate = useNavigate();

  const { register, isLoading, error, isAuthenticated, clearError } = useAuthStore();

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
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 6) {
      setLocalError('Şifre en az 6 karakter olmalı');
      return;
    }

    const success = await register(email, password, fullName);
    if (success) {
      navigate('/admin/login?registered=true');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Kayıt</h1>
          <p className="text-muted-foreground mt-2">Yeni bir yönetici hesabı oluşturun</p>
        </div>

        {(error || localError) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Ad Soyad</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ad Soyad"
              disabled={isLoading}
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Şifre Tekrar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Zaten hesabınız var mı?{' '}
            <Link to="/admin/login" className="text-primary hover:underline font-medium">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
