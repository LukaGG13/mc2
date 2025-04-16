export interface suit {
    name: string;
    icon: string;
    value: number;
}

export interface team {
    id: string; //FirebaseID pl1_pl2_pl3_pl4
    name: string | null;
    members: string[]; // Array of user UIDs
    iniviteToken: string | null;
    partije: game[];
}

export interface game {
    date_time: string;
    pointsUs: number;
    pointsThem: number;
    callingsUs: [number, number, number, number, number, number, number, number, number]; //20, bela, 50, 100, 150, 200, stiglja, auzmis, bela
    callingsThem: [number, number, number, number, number, number, number, number, number]; //20, bela, 50, 100, 150, 200, stiglja, auzmis, bela
}

export interface Team {
    id: string;
    name: string;
    members: string[];  // Array of user UIDs
    score: number;
    // other team fields
}

export interface UserTeams {
    teamIds: string[];  // References to teams the user belongs to
}