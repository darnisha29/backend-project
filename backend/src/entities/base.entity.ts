import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Base {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @CreateDateColumn({
        select: false,
        name: "created_at",
        type: "datetimeoffset",
        default: () => "SYSDATETIMEOFFSET()",
    })
    created_at: Date;

    @UpdateDateColumn({
        select: false,
        name: "updated_at",
        type: "datetimeoffset",
        default: () => "SYSDATETIMEOFFSET()",
        onUpdate: "SYSDATETIMEOFFSET()"
    })
    updated_at: Date;
}
