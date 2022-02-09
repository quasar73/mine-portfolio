export interface GetMessageDto {
    id: string;
    message: string;
    telegram: string;
    discord: string;
    email: string;
    seen: boolean;
    date: string;
}
