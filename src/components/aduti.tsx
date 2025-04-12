import Herc from '../assets/herc.svg';
import Pik from '../assets/pik.svg';
import Tref from '../assets/tref.svg';
import Kara from '../assets/kara.svg';

function BiranjeAduta({adut, setAdut}: {adut:any, setAdut: any}) {
    const suits = [
        { name: 'Tref', icon: Tref },
        { name: 'Kara', icon: Kara },
        { name: 'Herc', icon: Herc },
        { name: 'Pik', icon: Pik }
    ];

    return (
        <table>
            <tbody>
                <tr>
                    {suits.map((suit) => (
                        <td key={suit.name}>
                            <button 
                                className={adut === suit.name ? "zvanje-icon-sellected" : "zvanje-icon"} 
                                onClick={() => setAdut(suit.name)}
                            >
                                <img src={suit.icon} alt={suit.name} />
                            </button>
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
} export default BiranjeAduta;