import { Mail, Lock } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SocialAuth } from '../components/auth/SocialAuth';
import { Button } from '../components/common/Button';

export function Login() {
  return (
    <AuthLayout
      title="Connexion"
      subtitle="Bienvenue ! Connectez-vous pour continuer"
    >
      <SocialAuth />

      <form className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="exemple@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
            Mot de passe oublié ?
          </a>
        </div>

        <Button type="submit" className="w-full">
          Se connecter
        </Button>

        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <a href="/register" className="font-medium text-emerald-600 hover:text-emerald-500">
            S'inscrire
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}