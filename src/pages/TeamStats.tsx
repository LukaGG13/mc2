import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApexCharts from 'apexcharts'
import { team } from '../types/types';

interface data {
    value: number[];
    date: string[];
}


const TeamStats: React.FC = () => {
    const navigate = useNavigate();
    const team = useLocation().state.team as team;
    console.log(team);

    // const [dvadeset, setDvadeset] = useState<data>({value: [], date: []});
    // const [pedeset, setPedeset] = useState<data>({value: [], date: []});
    // const [sto, setSto] = useState<data>({value: [], date: []});
    // const [stoPedeset, setStoPedeset] = useState<data>({value: [], date: []});
    // const [dvesta, setDvesta] = useState<data>({value: [], date: []});
    // const [hiljadu, setHiljadu] = useState<data>({value: [], date: []});

    useEffect(() => {
        let dvadeset: data = {value: [], date: []};
        let pedeset: data = {value: [], date: []};
        let sto: data = {value: [], date: []};
        let stoPedeset: data = {value: [], date: []};
        let dvesta: data = {value: [], date: []};
        let hiljadu: data = {value: [], date: []};
        if (team) {
            //TODO: Use one date for all
            for (let i = 0; i < team.partije.length; i++) {
                const partije = team.partije[i];
                const datePartije = new Date(partije.date_time).toLocaleDateString();
                //console.log(datePartije);
                //console.log(partije);
                dvadeset.value.push(partije.callingsUs[0]);
                dvadeset.date.push(datePartije);
                pedeset.value.push(partije.callingsUs[1]);
                pedeset.date.push(datePartije);
                sto.value.push(partije.callingsUs[2]);
                sto.date.push(datePartije);
                stoPedeset.value.push(partije.callingsUs[3]);
                stoPedeset.date.push(datePartije);
                dvesta.value.push(partije.callingsUs[4]);
                dvesta.date.push(datePartije);
                hiljadu.value.push(partije.callingsUs[5]);
                hiljadu.date.push(datePartije);
            }
            // setDvadeset(dvadeset);
            // setPedeset(pedeset);
            // setSto(sto);
            // setStoPedeset(stoPedeset);
            // setDvesta(dvesta);
            // setHiljadu(hiljadu);
        }

        const options20 = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '20',
                data: dvadeset.value
            }],
            xaxis: {
                categories: dvadeset.date
            }
        }

        const chartOrigin20 = document.querySelector('#chart20');
        if (chartOrigin20 && !chartOrigin20.classList.contains('on1')) {
            const chart = new ApexCharts(document.querySelector('#chart20'), options20);
            document.getElementById('chart20')?.classList.add('on1');
            chart.render();
        }

        const options50 = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '50',
                data: pedeset.value
            }],
            xaxis: {
                categories: pedeset.date
            }
        }

        const chartOrigin50 = document.querySelector('#chart50');
        if (chartOrigin50 && !chartOrigin50.classList.contains('on2')) {
            const chart = new ApexCharts(document.querySelector('#chart50'), options50);
            document.getElementById('chart50')?.classList.add('on2');
            chart.render();
        }

        const options100 = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '100',
                data: sto.value
            }],
            xaxis: {
                categories: sto.date
            }
        }

        const chartOrigin100 = document.querySelector('#chart100');
        if (chartOrigin100 && !chartOrigin100.classList.contains('on3')) {
            const chart2 = new ApexCharts(document.querySelector('#chart100'), options100);
            document.getElementById('chart100')?.classList.add('on3');
            chart2.render();
        }

        const options150 = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '150',
                data: stoPedeset.value
            }],
            xaxis: {
                categories: stoPedeset.date
            }
        }

        const chartOrigin150 = document.querySelector('#chart150');
        if (chartOrigin150 && !chartOrigin150.classList.contains('on4')) {
            const chart = new ApexCharts(document.querySelector('#chart150'), options150);
            document.getElementById('chart150')?.classList.add('on4');
            chart.render();
        }

        const options200 = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '200',
                data: dvesta.value
            }],
            xaxis: {
                categories: dvesta.date
            }
        }

        const chartOrigin200 = document.querySelector('#chart200');
        if (chartOrigin200 && !chartOrigin200.classList.contains('on5')) {
            const chart = new ApexCharts(document.querySelector('#chart200'), options200);
            document.getElementById('chart200')?.classList.add('on5');
            chart.render();
        }

        const options1001 = {
            chart: {
                type: 'line'
            },
            series: [{
                name: '1001',
                data: hiljadu.value
            }],
            xaxis: {
                categories: hiljadu.date
            }
        }

        const chartOrigin1001 = document.querySelector('#chart1001');
        if (chartOrigin1001 && !chartOrigin1001.classList.contains('on6')) {
            const chart = new ApexCharts(document.querySelector('#chart1001'), options1001);
            document.getElementById('chart1001')?.classList.add('on6');
            chart.render();
        }
    }, []);

    
    useEffect(() => {
        
    }, [team]);

    if (!team) {
        console.error("No team data found");
        return <div>No team data found</div>;
    }
    return (
        <div className="team-stats">
            <h1>Team Statistics</h1>
            <h2>Name: {team.name}</h2>
            <h3>Members:</h3>
            <ul>
                {team.members.map((member: string, index: number) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
            <h4>20:</h4>
            <div style={{ color: 'black' }} id="chart20"></div>
            <h4>50:</h4>
            <div style={{ color: 'black' }} id="chart50"></div>
            <h4>100:</h4>
            <div style={{ color: 'black' }} id="chart100"></div>
            <h4>150:</h4>
            <div style={{ color: 'black' }} id="chart150"></div>
            <h4>200:</h4>
            <div style={{ color: 'black' }} id="chart200"></div>
            <h4>1001:</h4>
            <div style={{ color: 'black' }} id="chart1001"></div> 
            <button onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
};

export default TeamStats;