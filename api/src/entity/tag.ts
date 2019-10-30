import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Symptom } from './symptom';


@Entity()
export class Tag {
    constructor(data: string) {
      this.data = data;
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string;

    @ManyToMany(type => Symptom, e => e.tags)
    symptoms: Symptom[];
}
