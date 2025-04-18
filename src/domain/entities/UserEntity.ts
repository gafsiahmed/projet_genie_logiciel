import { ObjectId } from "mongodb";
import { BaseEntity } from "./BaseEntity";


export abstract class User extends BaseEntity {
    protected firstName: string;
    protected lastName: string;
    protected password: string;
    protected email: string;
    protected phoneNumber: number;
    protected role: string;

    constructor(data: {
        id?: ObjectId,
        firstName?: string,
        lastName?: string,
        password?: string,
        email?: string,
        phoneNumber?: number,
        role?: string
    }) {
        super(data.id);
        this.firstName = data.firstName || "";
        this.lastName = data.lastName || "";
        this.password = data.password || "";
        this.email = data.email || "";
        this.phoneNumber = data.phoneNumber || 0;
        this.role = data.role || "";
    }

    public getFirstName(): string {
        return this.firstName;
 }

    public getLastName(): string {
        return this.lastName;  
    }
    public getPassword(): string {
        return this.password; 
    }
    public getEmail(): string {
        return this.email;
    }

    public getPhoneNumber(): number {
        return this.phoneNumber;
    }
    public getRole(): string {
        return this.role; 
    }

}