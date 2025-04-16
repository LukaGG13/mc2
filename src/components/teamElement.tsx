import React from 'react';
import './teamElement.css';
import { team } from '../types/types';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

interface TeamElementProps {
    team: team;
}

const TeamElement: React.FC<TeamElementProps> = (props) => {
    console.log(props.team);
    const navigate = useNavigate();
    return (
        <div className="team-element" onClick={() => {navigate('/game', {state: {team: props.team}})}}>
            <div className="games-played">Played: {props.team?.partije.length || "0"}</div>
            <h4 className='team-name'>{props.team?.name || "name"}</h4>
           
            <ol className='team-list'>
                <li>{props.team?.members[1] || "friend"}</li>
                <li>{props.team?.members[2] || "against1"}</li>
                <li>{props.team?.members[3] || "agains2"}</li>
            </ol>
            {props.team?.partije.length > 0 && (
            <div onClick={(e => {e.stopPropagation(); navigate('/team-stats', {state: {team: props.team}})})} className='team-info-container'>
                <InfoIcon className='team-info'></InfoIcon>
            </div>)}
        </div>
    );
};

export default TeamElement;