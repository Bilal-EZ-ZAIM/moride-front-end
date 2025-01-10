import React, { useState } from 'react';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Button } from '../components/common/Button';

export function ResetPassword() {
  const [step, setStep] = useState<'email' | 'code' | 'password'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'email') {
      // Send reset code to email
      setStep('code');
    } else if (step === 'code') {
      // Verify code
      setStep('password');
    } else {
      // Reset password
      console.log('Password reset');
    }
  };

  return (
    <AuthLayout
      title="Réinitialiser le mot de passe"
      subtitle={
        step === 'email'
          ? "Entrez votre email pour réinitialiser votre mot de passe"
          : step === 'code'
          ? "Entrez le code reçu par email"
          : "Créez votre nouveau mot de passe"
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 'email' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="exemple@email.com"
                required
              />
            </div>
          </div>
        )}

        {step === 'code' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Code de vérification
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                placeholder="Entrez le code à 6 chiffres"
                maxLength={6}
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Un code a été envoyé à {email}
            </p>
          </div>
        )}

        {step === 'password' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          {step === 'email'
            ? 'Envoyer le code'
            : step === 'code'
            ? 'Vérifier le code'
            : 'Réinitialiser le mot de passe'}
        </Button>

        <p className="text-center text-sm text-gray-600">
          <a href="/login" className="text-emerald-600 hover:text-emerald-500">
            Retour à la connexion
          </a>
        </p>
      </form>
    </AuthLayout>
  );
}