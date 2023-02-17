export interface DisciplineI {
    name: string;
}

export interface CreatedByI {
    firstName: string;
    lastName: string;
    role: string;
}

export interface AtletaI {
    id: number;
    name: string;
    lastName: string;
    document: string;
    age: number;
    dateOfBirth: Date;
    maritalStatus: string;
    levelOfSchooling: string;
    address: string;
    cell: string;
    phone: string;
    bloodType: string;
    weight: number;
    height: number;
    isActive: boolean;
    discipline: DisciplineI;
    created_by: CreatedByI;
}

