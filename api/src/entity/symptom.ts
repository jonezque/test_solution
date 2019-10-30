import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Section } from './section';
import { Solution } from './solution';
import { Tag } from './tag';

@Entity()
export class Symptom {
    constructor(data: string) {
        this.data = data;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @OneToMany(type => Solution, e => e.symptom, { cascade: true })
    solutions: Solution[];

    @ManyToOne(type => Section, e => e.symptoms)
    section: Section;

    @ManyToMany(type => Tag, e => e.symptoms)
    @JoinTable()
    tags: Tag[];
}
