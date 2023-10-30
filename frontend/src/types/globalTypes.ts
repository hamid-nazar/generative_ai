export interface MessageProps {
    role: string;
    content: string;
}


export interface UserProps {
    firstName: string;
    lastName: string;
    profileImageUrl: string;

}

enum UploadStatus {
    PENDING,
    PROCESSING,
    FAILED,
    SUCCESS,
}

export interface FileProps {
    id: string;
    name: string;
    uploadStatus: UploadStatus;
    url: string;
    key:string;
    createdAt: Date;
}