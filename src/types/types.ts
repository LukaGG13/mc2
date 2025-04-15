export interface suit {
    name: string;
    icon: string;
    value: number;
}

export interface team {
    id: string; //FirebaseID pl1_pl2_pl3_pl4
    name: string | null;
    friendUser: string;
    againstUser1: string;
    againstUser2: string;
    iniviteToken: string | null;
    partije: game[];
}

export interface game {
    id: string;
    date_time: string;
    pointsUs: number;
    pointsThem: number;
    callingsUs: [number, number, number, number, number, number, number, number, number]; //20, bela, 50, 100, 150, 200, stiglja, auzmis, bela
    callingsThem: [number, number, number, number, number, number, number, number, number]; //20, bela, 50, 100, 150, 200, stiglja, auzmis, bela
}