import { Sparkles, Star, Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 animate-pulse">
          <Star className="h-4 w-4 text-yellow-400" />
        </div>
        <div className="absolute top-40 right-32 animate-pulse animation-delay-1000">
          <Star className="h-3 w-3 text-pink-400" />
        </div>
        <div className="absolute bottom-32 left-32 animate-pulse animation-delay-2000">
          <Star className="h-5 w-5 text-purple-400" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse animation-delay-3000">
          <Star className="h-4 w-4 text-blue-400" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent mb-3">
            Cartas Cósmicas
          </h1>
          <p className="text-purple-200 text-lg font-medium mb-2">
            ✨ Carregando dimensão cósmica... ✨
          </p>
        </div>

        {/* Loading Card */}
        <div className="backdrop-blur-sm bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-indigo-900/80 border-purple-500/30 shadow-2xl rounded-lg p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-purple-300 animate-spin" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
                Preparando Portal
              </h2>
              <Sparkles className="h-6 w-6 text-purple-300 animate-spin" />
            </div>

            {/* Loading Animation */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-1000"></div>
              <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce animation-delay-2000"></div>
            </div>

            <p className="text-purple-300 text-sm">
              Conectando com o universo das cartas mágicas...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
