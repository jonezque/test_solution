import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Symptom } from './symptom';

@Entity()
export class Solution {
    constructor(data: string) {
        this.data = data;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 700 })
    data: string;

    @ManyToOne(type => Symptom, e => e.solutions)
    symptom: Symptom;
}
