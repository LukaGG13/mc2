import React, { useEffect, useState } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "../styles/Login.css";
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
    const { t } = useTranslation();
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { userLoggedIn, loading, currentUser } = useAuth()
    const navigate = useNavigate();

    const handleLogin = async (username: string, password: string) => {
        if (!userLoggedIn) {
            doSignInWithEmailAndPassword(username, password).catch((error) => {
                //TODO: Add translation for this error and use setErorr
                console.error(error);
                setError(error);
            })
        }
    }

    const handleRegister = async (username: string, password: string) => {
        if (!userLoggedIn) {
            doCreateUserWithEmailAndPassword(username, password).catch((error) => {
                //TODO: Add translation for this error and use setErorr
                console.error(error);
                setError(error);
            });
        }

    }

    const handleGoogleSignIn = async (e: any) => {
        e.preventDefault();
        if (!userLoggedIn) {
            doSignInWithGoogle().catch((error) => {
                console.error(error);
            });
        }
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignup) {
            if (formData.password != formData.confirmPassword) {
                setError(t('passwordsDontMatch'));
                return;
            }
            else {
                setError(null);
                handleRegister(formData.email, formData.password);
            }
        } else {
            setError(null);
            handleLogin(formData.email, formData.password);

        }
    };

    useEffect(() => {
        if (currentUser && !loading && userLoggedIn) {
            navigate('/');
        }
    }, [userLoggedIn, navigate, loading, currentUser]);

    return (
        <div className="auth-page">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>{isSignup ? t("signUp") : t("login")}</h2>

                <div className="form-group">
                    <label>{t('email')}</label>
                    <input
                        type="email"
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>{t('password')}</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </span>
                </div>

                {isSignup && (
                    <div className="form-group">
                        <label>{t('confirmPassword')}</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                )}

                {error && <div className="error">{error}</div>}

                <button type="submit" className="submit-button">
                    {isSignup ? t("signUp") : t("login")}
                </button>

                <div className="separate">
                    <p className="sep-text">{t('or')}</p>
                </div>

                <button onClick={handleGoogleSignIn} className="auth-button">
                    <GoogleIcon className="google-icon" />
                    {t('loginGoogle')}
                </button>

                <div className="toggle-link">
                    {isSignup ? t('haveAccount') : t('dontHaveAcoount')}
                    <button type="button" onClick={() => setIsSignup(!isSignup)}>
                        {!isSignup ? t("signUp") : t("login")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
