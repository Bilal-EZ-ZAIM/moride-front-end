import React from 'react';
import { Phone, Video, Mic, MicOff, PhoneOff } from 'lucide-react';

interface CallOverlayProps {
  type: 'audio' | 'video';
  onEnd: () => void;
}

export function CallOverlay({ type, onEnd }: CallOverlayProps) {
  const [isMuted, setIsMuted] = React.useState(false);

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center">
      {type === 'video' && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      )}
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 rounded-full bg-gray-800 text-white hover:bg-gray-700"
        >
          {isMuted ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={onEnd}
          className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700"
        >
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}