import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield, Mail, Smartphone, ArrowLeft } from 'lucide-react';

interface TwoFactorAuthProps {
  email: string;
  onVerify: () => void;
  onBack: () => void;
}

export function TwoFactorAuth({ email, onVerify, onBack }: TwoFactorAuthProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(60);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    // In production, verify OTP with backend
    // For demo, accept any 6-digit code
    if (otpValue === '123456' || otpValue.length === 6) {
      onVerify();
    } else {
      setError('Invalid OTP. Try 123456 for demo.');
    }
  };

  const handleResend = () => {
    setResendTimer(60);
    setOtp(['', '', '', '', '', '']);
    setError('');
    // In production, call API to resend OTP
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f] flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to login</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: '#FF7619', boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)' }}>
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white tracking-tight">Two-Factor Authentication</h1>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mb-8">
          <h2 className="text-3xl text-white mb-2">Verify Your Identity</h2>
          <p className="text-gray-400">
            We've sent a 6-digit code to <span className="text-white">{email}</span>
          </p>
        </div>

        {/* Method Selection */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 p-4 rounded-xl border transition-all ${
              method === 'email'
                ? 'bg-[#FF7619]/20 border-[#FF7619] text-white'
                : 'bg-[#1a1a2e]/50 border-white/10 text-gray-400 hover:border-white/20'
            }`}
          >
            <Mail className="w-5 h-5 mx-auto mb-2" />
            <p className="text-sm">Email</p>
          </button>
          <button
            onClick={() => setMethod('sms')}
            className={`flex-1 p-4 rounded-xl border transition-all ${
              method === 'sms'
                ? 'bg-[#FF7619]/20 border-[#FF7619] text-white'
                : 'bg-[#1a1a2e]/50 border-white/10 text-gray-400 hover:border-white/20'
            }`}
          >
            <Smartphone className="w-5 h-5 mx-auto mb-2" />
            <p className="text-sm">SMS</p>
          </button>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <Label className="text-gray-300 mb-3 block">Enter 6-Digit Code</Label>
          <div className="flex gap-2 justify-between">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl bg-[#1a1a2e]/50 border-white/10 text-white rounded-xl"
                style={{
                  borderColor: digit ? '#FF7619' : undefined,
                }}
              />
            ))}
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          <p className="text-xs text-gray-500 mt-2">Demo: Use 123456 or any 6 digits</p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          className="w-full h-12 text-white rounded-xl shadow-lg transition-all mb-4"
          style={{ 
            backgroundColor: '#FF7619',
            boxShadow: '0 10px 15px -3px rgba(255, 118, 25, 0.3)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 118, 25, 0.9)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF7619'}
        >
          Verify & Continue
        </Button>

        {/* Resend Code */}
        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-gray-400 text-sm">
              Resend code in <span className="text-white">{resendTimer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm transition-colors"
              style={{ color: '#FF7619' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 118, 25, 0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FF7619'}
            >
              Resend Code
            </button>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white text-sm mb-1">Security Notice</p>
              <p className="text-gray-400 text-xs">
                Never share your verification code with anyone. Our team will never ask for this code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
