import React, { useEffect } from 'react';
import { useState } from 'react';
import Zvanje from './zvanje';
import BiranjeAduta from './aduti';
import Yolo from '../pages/yolo';
import { game, suit, team } from '../types/types';
import Tref from '../assets/tref.svg';
import Camera from '../assets/camera.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { addGame, getTeam, searchByDocumentId } from '../helpers/FirebaseApi';


function RoundHistory({ miHistory, viHistory, count, setCount }: { miHistory: number[], viHistory: number[], count: number, setCount: any }) {
    return (<>
        {miHistory.map((mi, index) => {
            if (index === count) {
                return (<tr key={index} style={{ backgroundColor: 'red' }} onClick={() => { setCount(miHistory.length); }}>
                    <td>{mi}</td><td>{viHistory[index]}</td>
                </tr>)
            } else {
                return (<tr key={index} style={{ backgroundColor: '#242424' }} onClick={() => { setCount(index); }}>
                    <td>{mi}</td><td>{viHistory[index]}</td>
                </tr>)
            }
        })
        }
    </>
    );
}

function TkoZove({ setMiZvali }: { setMiZvali: any }) {
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMiZvali(event.target.value === 'mi');
    };

    return (
        <>
            <td>
                <label>
                    <input type="radio" name="myRadio" defaultChecked={true} value="mi" onChange={handleRadioChange} />
                    Mi zvali
                </label>
            </td>
            <td>
                <label>
                    <input type="radio" name="myRadio" value="vi" onChange={handleRadioChange} />
                    Vi zvali
                </label>
            </td>
        </>
    )
}

function GameComponent() {
    const location = useLocation();
    const navigate = useNavigate();

    const [miZvanjeUkupno, setMiZvanjeUkupno] = useState<number[]>([]);
    const [viZvanjeUkupno, setViZvanjeUkupno] = useState<number[]>([]);

    function Upisi({ mi, vi, setMi, setVi, miZvanje, setMiZvanje, viZvanje, setViZvanje, miUkupno, setMiUkupno, viUkpno, setViUkupno, miHistory, setMiHistory, viHistory, setViHistory, count, setCount, setAdut, resetZvanje, setResetZvanje, miZvali, setMiZvali }: {
        mi: number | string,
        vi: number | string,
        setMi: React.Dispatch<React.SetStateAction<number | string>>,
        setVi: React.Dispatch<React.SetStateAction<number | string>>,
        miZvanje: number[],
        setMiZvanje: React.Dispatch<React.SetStateAction<number[]>>,
        viZvanje: number[],
        setViZvanje: React.Dispatch<React.SetStateAction<number[]>>,
        miUkupno: number,
        setMiUkupno: React.Dispatch<React.SetStateAction<number>>,
        viUkpno: number,
        setViUkupno: React.Dispatch<React.SetStateAction<number>>,
        miHistory: number[],
        setMiHistory: React.Dispatch<React.SetStateAction<number[]>>,
        viHistory: number[],
        setViHistory: React.Dispatch<React.SetStateAction<number[]>>,
        count: number,
        setCount: React.Dispatch<React.SetStateAction<number>>,
        adut: suit,
        setAdut: React.Dispatch<React.SetStateAction<suit>>,
        resetZvanje: boolean,
        setResetZvanje: React.Dispatch<React.SetStateAction<boolean>>,
        miZvali: boolean,
        setMiZvali: React.Dispatch<React.SetStateAction<boolean>>
    }) {
        const upis = () => {
            let tempMiUkupno: number = 0;
            let tempViUkupno: number = 0;

            let miPartija: number = +mi;
            let viPartija: number = +vi;
            miZvanje.map((elem: any) => miPartija += elem)
            viZvanje.map((elem: any) => viPartija += elem)
            console.log(miPartija, viPartija);
            console.log(miZvanje, viZvanje);

            setMiZvanjeUkupno([...miZvanjeUkupno, ...miZvanje]);
            setViZvanjeUkupno([...viZvanjeUkupno, ...viZvanje]);
            console.log(miZvanjeUkupno, viZvanjeUkupno);
    
            if (miZvali) {
                if (viPartija >= miPartija) {
                    viPartija += miPartija;
                    miPartija = 0;
                }
            } else {
                if (miPartija >= viPartija) {
                    miPartija += viPartija;
                    viPartija = 0;
                }
            }
    
    
            if (count === viHistory.length) {
                setViHistory([...viHistory, viPartija]);
                setMiHistory([...miHistory, miPartija]);
                setCount(count + 1);
                setMiUkupno(miPartija + miUkupno);
                setViUkupno(viPartija + viUkpno);
                tempMiUkupno = miPartija + miUkupno;
                tempViUkupno = viPartija + viUkpno;
            } else {
                const tempMiHistory = [...miHistory];
                const tempViHistory = [...viHistory];
                setMiUkupno(miPartija + miUkupno);
                setViUkupno(viPartija + viUkpno);
                tempMiHistory[count] = miPartija;
                tempViHistory[count] = viPartija;
                setMiHistory(tempMiHistory);
                setViHistory(tempViHistory);
                setCount(miHistory.length);
                tempMiUkupno = miPartija + miUkupno;
                tempViUkupno = viPartija + viUkpno;
            }
    
            setMi(0);
            setVi(0);
    
            setMiZvanje([]);
            setViZvanje([]);
            setAdut({ name: 'Tref', icon: Tref, value: 3 });
            setResetZvanje(!resetZvanje);
            setMiZvali(true);
    
            if (miUkupno > 1000 && miUkupno > viUkpno) {
                setMiUkupno(0);
                setViUkupno(0);
                setMiHistory([]);
                setViHistory([]);
                roundToJson();
            }
            if (viUkpno > 1000 && viUkpno > miUkupno) {
                setMiUkupno(0);
                setViUkupno(0);
                setMiHistory([]);
                setViHistory([]);
                roundToJson();
            }
        }
    
        return (
            <button onClick={upis}>Upisi</button>
        );
    }

    const [miUkupno, setMiUkupno] = useState<number>(0);
    const [viUkpno, setViUkupno] = useState<number>(0);
    const [miZvali, setMiZvali] = useState<boolean>(true);
    const [miHistory, setMiHistory] = useState<number[]>([]);
    const [viHistory, setViHistory] = useState<number[]>([]);
    const [mi, setMi] = useState<number | string>('');
    const [vi, setVi] = useState<number | string>('');
    const [miZvanje, setMiZvanje] = useState<number[]>([]);
    const [viZvanje, setViZvanje] = useState<number[]>([]);
    const [count, setCount] = useState<number>(0);
    const [adut, setAdut] = useState<suit>({ name: 'Tref', icon: Tref, value: 3 });
    const [resetZvanje, setResetZvanje] = useState<boolean>(false);

    const [openYoloMi, setOpenYoloMi] = useState(false);
    const [openYoloVi, setOpenYoloVi] = useState(false);

    // useEffect(() => {
    //     if (miUkupno > 1000 && miUkupno > viUkpno) {
    //         setMiUkupno(0);
    //         setViUkupno(0);
    //         setMiHistory([]);
    //         setViHistory([]);
    //         roundToJson();
    //     }
    //     if (viUkpno > 1000 && viUkpno > miUkupno) {
    //         setMiUkupno(0);
    //         setViUkupno(0);
    //         setMiHistory([]);
    //         setViHistory([]);
    //         roundToJson();
    //     }
    // }, [miUkupno, viUkpno]);


    /* trenutno preboji koliko je puta bilo svako zvanje
    prebacit cu i u zvanju da ovak funkcijnira onda nece bit potreba za ovim
    nadam se da ti je dobar json :heart: :thumbsup: 
    :heart: :thumbsup: 
    */
    const roundToJson = () => {
        const zm: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const zv: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (const zvanje of miZvanjeUkupno) {
            if (zvanje == 20) zm[0]++;
            if (zvanje == 50) zm[1]++;
            if (zvanje == 100) zm[2]++;
            if (zvanje == 150) zm[3]++;
            if (zvanje == 200) zm[4]++;
            if (zvanje == 1001) zm[5]++;
        }

        for (const zvanje of viZvanjeUkupno) {
            if (zvanje == 20) zv[0]++;
            if (zvanje == 50) zv[1]++;
            if (zvanje == 100) zv[2]++;
            if (zvanje == 150) zv[3]++;
            if (zvanje == 200) zv[4]++;
            if (zvanje == 1001) zv[5]++;
        }

        const game: game = {
            date_time: new Date().toISOString(),
            pointsUs: miUkupno,
            pointsThem: viUkpno,
            callingsUs: zm as any,
            callingsThem: zv as any
        }
        console.log(JSON.stringify(game));
        if (location.state.team) {
            const teamName: team = location.state.team;
            getTeam(teamName.id).then((team) => {
                console.log('Team found:', team);
                addGame(team, game).then(() => {
                    console.log('Game added successfully');
                }
                ).catch((error) => {
                    console.error('Error adding game:', error);
                }
                );
            }).catch((error) => {
                console.error('Error searching for team:', error);
            });
        }
        else {
            console.log('No team found in location state');
        }
    }

    return (
        <>
            {!openYoloMi && !openYoloVi && <>
                <table>
                    <tbody>
                        <tr>
                            <td>Mi: {miUkupno}</td>
                            <td>Vi: {viUkpno}</td>
                        </tr>
                        <RoundHistory miHistory={miHistory} viHistory={viHistory} count={count} setCount={setCount} />
                        <tr>
                            <TkoZove setMiZvali={setMiZvali} />
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <center>
                                    <BiranjeAduta adut={adut} setAdut={setAdut} />
                                </center>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="number" value={mi} placeholder='0' onChange={e => {
                                    if (+e.target.value > 162) {
                                        e.target.value = "162";
                                    }
                                    if (+e.target.value < 0 || e.target.value == "") {
                                        e.target.value = "";
                                    }
                                    if (e.target.value != '') { setMi(+e.target.value); setVi(162 - +e.target.value) }
                                    else { setMi(''); setVi('') }
                                }}
                                />
                            </td>
                            <td>
                                <input type="number" value={vi} placeholder='0' onChange={e => {
                                    if (+e.target.value > 162) {
                                        e.target.value = "162";
                                    }
                                    if (+e.target.value < 0 || e.target.value == "") {
                                        e.target.value = "";
                                    }
                                    if (e.target.value != '') { setVi(+e.target.value); setMi(162 - +e.target.value) }
                                    else { setVi(''); setMi('') }
                                }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <center>
                    <Zvanje setMiZvanje={setMiZvanje} setViZvanje={setViZvanje} miZvanje={miZvanje} viZvanje={viZvanje} reset={resetZvanje} />
                    <Upisi mi={mi} vi={vi} setMi={setMi} setVi={setVi} miZvanje={miZvanje} setMiZvanje={setMiZvanje} viZvanje={viZvanje} setViZvanje={setViZvanje} miUkupno={miUkupno} setMiUkupno={setMiUkupno} viUkpno={viUkpno} setViUkupno={setViUkupno} miHistory={miHistory} setMiHistory={setMiHistory} viHistory={viHistory} setViHistory={setViHistory} count={count} setCount={setCount} adut={adut} setAdut={setAdut} resetZvanje={resetZvanje} setResetZvanje={setResetZvanje} miZvali={miZvali} setMiZvali={setMiZvali} />
                    
                </center>
            </>}
            {!openYoloMi && !openYoloVi && <button onClick={() => { setOpenYoloMi(!openYoloMi); }}><img src={Camera} alt={"Bodovi kamera mi"} /></button>}
            {!openYoloVi && !openYoloMi && <button onClick={() => { setOpenYoloVi(!openYoloVi); }}><img src={Camera} alt={"Bodovi kamera vi"} /></button>}
            {openYoloMi && <div className="yolo">
                <Yolo suit={adut} _setPoints={(points: number) => {
                    setMi(points);
                    setVi(162 - points);
                }} setOpenYolo={setOpenYoloMi} />
            </div>}
            {openYoloVi && <div className="yolo">
                <Yolo suit={adut} _setPoints={(points: number) => {
                    setVi(points);
                    setMi(162 - points);
                }} setOpenYolo={setOpenYoloVi} />
            </div>}
            <br></br>
            <button style={{margin: '10px'}} onClick={() => {navigate('/')}}>Go Back</button>
        </>
    )
} export default GameComponent;