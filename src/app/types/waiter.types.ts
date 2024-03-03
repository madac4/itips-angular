export interface IWaiterResponse {
    success: boolean;
    redirectTo: string;
    user: Waiter;
}

export type Waiter = {
    avatar: string;
    email: string;
    id: string;
    name: string;
    qrCode: string;
    role: string;
    userCode: number;
    target: Target;
};

export type Target = {
    target: string;
    targetAmount: number;
    currentAmount: number;
};

export type ITipRequest = {
    amount: number;
    rate: string;
    review: string;
    payTax: boolean;
};

export type ITipResponse = {
    success: boolean;
    title: string;
    message: string;
    redirectTo: string;
};
