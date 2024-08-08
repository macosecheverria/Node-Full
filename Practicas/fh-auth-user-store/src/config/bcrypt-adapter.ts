import bcrypt from "bcryptjs";

export class BcryptAdapter {
    static hash(password: string){
        return bcrypt.hashSync(password);
    }

    static compare(password: string, hashed: string){
        return bcrypt.compareSync(password,hashed);
    }

    
}