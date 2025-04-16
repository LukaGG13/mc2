import React, { useEffect, useState } from 'react';
import { createTeam, getUserTeams } from '../helpers/FirebaseApi'; // Adjust the import path as necessary
import { useAuth } from '../contexts/authContext';

const TeamsFun: React.FC = () => {
    const { currentUser } = useAuth();
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchTeams = async () => {
            if (!currentUser) return;
            
            try {
                setLoading(true);
                const userTeams = await getUserTeams(currentUser.uid);
                setTeams(userTeams);
            } catch (err) {
                console.error('Error fetching teams:', err);
                setError('Failed to load teams');
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [currentUser]);

    if (loading) return <div>Loading teams...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!currentUser) return <div>Please log in to view teams</div>;
    return (
        <div className="teams-container">
            <h1>Teams</h1>
            {/* Add your teams content here */}
            <button onClick={() =>{
                if (currentUser) {
                    createTeam([currentUser.uid, '12344', 'UnUydbkKc0Kdaxu25d7LD9lRC5OO', 'PZMUhUaXfWS4252wiBm3BmnYqj2Z'], 'idegas_test')
                }
            }}>Create tea   </button>
            {teams.length === 0 ? (
                <p>You don't have any teams yet.</p>
            ) : (
                <ul className="teams-list">
                    {teams.map(team => (
                        <li key={team.id} className="team-item">
                            <h3>{team.name}</h3>
                            <p>Score: {team.score}</p>
                            <p>Members: {team.members.length}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeamsFun;