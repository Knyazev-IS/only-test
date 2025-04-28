export interface Event {
    date: number;
    description: string;
}

export interface DataTimePeriod {
    title: string;
    events: Event[];
}
