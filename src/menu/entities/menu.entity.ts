import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'op_menu' })
export class Menu {

    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn()
    @Exclude()
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ name:'component_path', length: 64 })
    componentPath: string;

    @Column({ length: 64 })
    href: string;

    @Column({ name: 'parent_id', length: 50, nullable: true })
    parentId?: string;

    @Column({name:'parent_ids', length: 2000, nullable: true })
    parentIds?: string;

    @Column({ name: 'create_date', type: 'datetime'})
    createDate: Date;

    @Column({name: 'update_date', type: 'datetime'})
    updateDate: Date;

    @Column({name: 'create_by'})
    createBy: string;

    @Column({name: 'update_by'})
    updateBy: string;
}
