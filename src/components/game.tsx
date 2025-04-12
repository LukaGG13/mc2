import React from 'react';
import { useState } from 'react';
import Zvanje from './zvanje';
import BiranjeAduta from './aduti';
import Yolo from '../pages/yolo';
import { suit } from '../types/types';
import Tref from '../assets/tref.svg';
import Camera from '../assets/camera.svg';


function RoundHistory({ miHistory, viHistory, count, setCount }: { miHistory: number[], viHistory: number[], count: number, setCount: any }) {
    return (<>
        {miHistory.map((mi, index) => {
            if (index === count) {
                return (<tr key={index} style={{ backgroundColor: 'red' }} onClick={() => { setCount(miHistory.length); }}>
                    <td>{mi}</td> <td>{viHistory[index]}</td>
                </tr>)
            } else {
                return (<tr key={index} style={{ backgroundColor: '#242424' }} onClick={() => { setCount(index); }}>
                    <td>{mi}</td> <td>{viHistory[index]}</td>
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

function Upisi({ mi, vi, setMi, setVi, miZvanje, setMiZvanje, viZvanje, setViZvanje, miUkupno, setMiUkupno, viUkpno, setViUkupno, miHistory, setMiHistory, viHistory, setViHistory, count, setCount, setAdut, resetZvanje, setResetZvanje, miZvali, setMiZvali }: {
    mi: number,
    vi: number,
    setMi: React.Dispatch<React.SetStateAction<number>>,
    setVi: React.Dispatch<React.SetStateAction<number>>,
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
        let miPartija: number = mi;
        let viPartija: number = vi;
        miZvanje.map((elem: any) => miPartija += elem)
        viZvanje.map((elem: any) => viPartija += elem)

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
        } else {
            const tempMiHistory = [...miHistory];
            const tempViHistory = [...viHistory];
            setMiUkupno(miPartija + miUkupno - miHistory[count]);
            setViUkupno(viPartija + viUkpno - viHistory[count]);
            tempMiHistory[count] = miPartija;
            tempViHistory[count] = viPartija;
            setMiHistory(tempMiHistory);
            setViHistory(tempViHistory);
            setCount(miHistory.length);
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
        }
        if (viUkpno > 1000 && viUkpno > miUkupno) {
            setMiUkupno(0);
            setViUkupno(0);
            setMiHistory([]);
            setViHistory([]);
        }
    }

    return (
        <button onClick={upis}>Upisi</button>
    );
}

function GameComponent() {
    const [miUkupno, setMiUkupno] = useState<number>(0);
    const [viUkpno, setViUkupno] = useState<number>(0);
    const [miZvali, setMiZvali] = useState<boolean>(true);
    const [miHistory, setMiHistory] = useState<number[]>([]);
    const [viHistory, setViHistory] = useState<number[]>([]);
    const [mi, setMi] = useState(0);
    const [vi, setVi] = useState(0);
    const [miZvanje, setMiZvanje] = useState<number[]>([]);
    const [viZvanje, setViZvanje] = useState<number[]>([]);
    const [count, setCount] = useState<number>(0);
    const [adut, setAdut] = useState<suit>({name: 'Tref', icon: Tref, value: 3});
    const [resetZvanje, setResetZvanje] = useState<boolean>(false);

    const [openYoloMi, setOpenYoloMi] = useState(false);
    const [openYoloVi, setOpenYoloVi] = useState(false);

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
                                <input type="number" value={"" + mi} onChange={e => {
                                    if (+e.target.value > 162) {
                                        e.target.value = "162";
                                    }
                                    if (+e.target.value < 0) {
                                        e.target.value = "0";
                                    }
                                    setMi(+e.target.value); setVi(162 - +e.target.value) }} 
                                />
                            </td>
                            <td>
                                <input type="number" value={"" + vi} onChange={e => { 
                                    if (+e.target.value > 162) {
                                        e.target.value = "162";
                                    }
                                    if (+e.target.value < 0) {
                                        e.target.value = "0";
                                    }
                                    setVi(+e.target.value); setMi(162 - +e.target.value) }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <center>
                    <Zvanje setMiZvanje={setMiZvanje} setViZvanje={setViZvanje} miZvanje={miZvanje} viZvanje={viZvanje} reset={resetZvanje} />
                    <Upisi mi={mi} vi={vi} setMi={setMi} setVi={setVi} miZvanje={miZvanje} setMiZvanje={setMiZvanje} viZvanje={viZvanje} setViZvanje={setViZvanje} miUkupno={miUkupno} setMiUkupno={setMiUkupno} viUkpno={viUkpno} setViUkupno={setViUkupno} miHistory={miHistory} setMiHistory={setMiHistory} viHistory={viHistory} setViHistory={setViHistory} count={count} setCount={setCount} adut={adut} setAdut={setAdut} resetZvanje={resetZvanje} setResetZvanje={setResetZvanje} miZvali={miZvali} setMiZvali={setMiZvali} />
                </center>
            </>}
            {!openYoloMi && !openYoloVi && <button onClick={() => { setOpenYoloMi(!openYoloMi); }}><img src={Camera} alt={"Bodovi kamera mi"}/></button>}
            {!openYoloVi && !openYoloMi && <button onClick={() => { setOpenYoloVi(!openYoloVi); }}><img src={Camera} alt={"Bodovi kamera vi"}/></button>}
            {openYoloMi && <div className="yolo">
                <Yolo suit={adut} _setPoints={(points: number) =>{
                    setMi(points);
                    setVi(162 - points);
                }} setOpenYolo={setOpenYoloMi} />
            </div>}
            {openYoloVi && <div className="yolo">
                <Yolo suit={adut} _setPoints={(points: number) =>{
                    setVi(points);
                    setMi(162 - points);
                }} setOpenYolo={setOpenYoloVi} />
            </div>}
        </>
    )
} export default GameComponent;