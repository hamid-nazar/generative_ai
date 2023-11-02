
export interface UserProps {
    firstName: string;
    lastName: string;
    profileImageUrl: string;

}


export enum UploadStatus {
    PENDING,
    PROCESSING,
    FAILED,
    SUCCESS,
    UPLOADING,
    ERROR
}

export interface FileProps {
    id: string;
    name: string;
    uploadStatus: UploadStatus;
    url: string;
    key:string;
    createdAt: Date;
}


export interface MessageProps {
    id: string;
    text: string | React.ReactNode;
    isUserMessage: boolean;
    createdAt: string 
}