import React, { useEffect, useState } from 'react';
import { createTeam, getUserTeams } from '../helpers/FirebaseApi'; // Adjust the import path as necessary
import { useAuth } from '../contexts/authContext';
import TeamElement from '../components/teamElement';
import { useNavigate } from 'react-router-dom';

const Teams: React.FC = () => {

    const navigate = useNavigate();
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

            {teams.length === 0 ? (
                <>
                    <p>You don't have any teams yet.</p>
                    <button onClick={() => {
                        if (currentUser) {
                            createTeam([currentUser.uid, '12344', 'UnUydbkKc0Kdaxu25d7LD9lRC5OO', 'PZMUhUaXfWS4252wiBm3BmnYqj2Z'], 'idegas_test').then(() => {
                                navigate(0);
                        });
                    }}}>Create team </button>
                </>
            ) : (
                <ul className="teams-list">
                    {teams.map(team => (
                        <TeamElement key={team.id} team={team} />
                    ))}
                </ul>
            )}

        </div>
    );
};

export default Teams;