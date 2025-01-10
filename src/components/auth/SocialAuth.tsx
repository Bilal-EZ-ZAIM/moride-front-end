import React from 'react';
import { Button } from '../common/Button';

export function SocialAuth() {
  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => console.log('Google login')}
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        Continuer avec Google
      </Button>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => console.log('Facebook login')}
      >
        <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
        Continuer avec Facebook
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Ou</span>
        </div>
      </div>
    </div>
  );
}