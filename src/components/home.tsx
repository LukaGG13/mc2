import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { doSendEmailLink } from "../firebase/auth";
import { useAuth } from "../contexts/authContext";
import { getAuth, User } from "firebase/auth";


interface ButtonProps {
  text: string;
  onClick: () => void;
}

const NavigationButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className="nav-button" onClick={onClick}>
      {text}
    </button>
  );
};

const HomeComponent: React.FC = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  const { t } = useTranslation();
  const [disableSendEmail, setDisableSendEmail] = useState<boolean>(false);

  if (currentUser === null) {
    console.error("No user logged in");
    return ("No user logged in");
  }

  const handleStartGame = () => {
    console.log("Start game clicked");

    // Navigation logic here
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // Navigation logic here
  };

  const handleTournament = () => {
    console.log("Tournament clicked");
    // Navigation logic here
  };

  function emailVerified(currentUser: User) {
    if (!currentUser || currentUser.emailVerified) return;
    // return (
    //     <>
    //         <IonAlert
    //             isOpen={true}
    //             header={t('emailNotVerified')}
    //             message={t('emailNotVerifiedMessage')}
    //             backdropDismiss={false}
    //             buttons={[
    //                 {
    //                     text: t('resendVerificationEmailButton'),
    //                     role: 'resendVerificationEmailButton',
    //                     handler: async () => {
    //                         await doSendEmailLink(currentUser);
    //                         //TODO: Should exit alert here

    //                     },
    //                 },
    //                 {
    //                     text: 'Ok'
    //                 },
    //             ]}
    //         ></IonAlert>
    //     </>
    // );
    return (
      <>
        <h3>{t('verifyEmail')}</h3>
        <button disabled={disableSendEmail} onClick={
          async () => {
            await doSendEmailLink(currentUser);
            setDisableSendEmail(true);
          }
        }>{t('sendVerEmail')}</button>
      </>

    )
  }

  return (
    <div className="home-container">
      <h1>Bela Block</h1>
      {currentUser && auth.currentUser && emailVerified(auth.currentUser)}
      <div className="button-container">
        <Link to={"/start-game"}>
          <NavigationButton text="Start Game" onClick={handleStartGame} />
        </Link>
        <Link to={"/teams"}>
          <NavigationButton text="Teams" onClick={handleStartGame} />
        </Link>
        <Link to={"/settings"}>
          <NavigationButton text="Settings" onClick={handleSettings} />
        </Link>
        <Link to={"/tournament"}>
          <NavigationButton text="Tournament" onClick={handleTournament} />
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;