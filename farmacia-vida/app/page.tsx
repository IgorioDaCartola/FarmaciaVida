'use client';

import {useState} from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgotPage, setIsForgotPage] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isValidEmail = (emailValue: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError('');
    setPasswordError('');

    let isValid = true;

    if (!email.trim()) {
      setEmailError('Por favor, informe seu e-mail.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Por favor, informe um e-mail válido.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Por favor, informe sua senha.');
      isValid = false;
    }

    if (isValid) {
      alert('Login bem-sucedido!');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Por favor, informe seu e-mail.');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Por favor, informe um e-mail válido.');
      return;
    }

    alert('Instruções para redefinir a senha foram enviadas para o seu e-mail.');
  };

  const toggleView = (isForgot: boolean) => {
    setIsForgotPage(isForgot);
    setEmailError('');
    setPasswordError('');
  };

  return (
    <main className="login-container">
      <div className= "login-card">

        <header className="card-header">
          <div className="logo-container">
            <Image 
              src="/logo.png" 
              alt="Logótipo Farmácia Vida" 
              width={190} 
              height={80} 
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h2>{isForgotPage ? 'Recuperar acesso' : 'Entrar no sistema'}</h2>
          <p>
            {isForgotPage
             ? 'Informe seu e-mail para redefinir a senha.'
             : 'Use suas credenciais de acesso.'}
          </p>
        </header>

        {isForgotPage ? (
          <form onSubmit={handleForgotSubmit} noValidate>
            <div className="input-group">
              <label htmlFor="email">
                E-mail <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="usuario@farmaciaVida.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <span className="error-message">{emailError}</span>}
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
              Enviar instruções
            </button>

            <div className="back-to-login-container">
              <button type="button" className="btn-link" onClick={() => toggleView(false)}>
                Voltar para login
              </button>
            </div>
          </form>
        ) : (

        <form onSubmit={handleSubmit} noValidate>
          
          <div className="input-group">
            <label htmlFor="email">
              E-mail <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="usuario@farmaciaVida.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">
              Senha <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          <div className="forgot-password-container">
            <button type="button" className="btn-link" onClick={() => toggleView(true)}>
              Esqueci minha senha
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Entrar
          </button>
        </form>
        )}
      </div>
    </main>
  );
}