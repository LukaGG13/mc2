import Herc from '../assets/herc.svg';
import Pik from '../assets/pik.svg';
import Tref from '../assets/tref.svg';
import Kara from '../assets/kara.svg';
import { suit } from '../types/types';

function BiranjeAduta({adut, setAdut}: {adut:suit, setAdut: any}) {
    const suits: suit[] = [
        { name: 'Tref', icon: Tref, value: 3 },
        { name: 'Kara', icon: Kara, value: 1 },
        { name: 'Herc', icon: Herc, value: 0 },
        { name: 'Pik', icon: Pik, value: 2 }
    ];

    return (
        <table>
            <tbody>
                <tr>
                    {suits.map((suit) => (
                        <td key={suit.name}>
                            <button 
                                className={adut.name === suit.name ? "zvanje-icon-sellected" : "zvanje-icon"} 
                                onClick={() => setAdut(suit)}
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