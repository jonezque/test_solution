import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Symptom } from './symptom';

@Entity()
export class Section {
    constructor(data: string) {
        this.data = data;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @OneToMany(type => Symptom, e => e.section, { cascade: true })
    symptoms: Symptom[];
}
