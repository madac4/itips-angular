export interface IWaiterResponse {
    success: boolean;
    redirectTo: string;
    user: Waiter;
}

export type Waiter = {
    _id: string;
    name: string;
    role: string;
    venueId: string;
};
