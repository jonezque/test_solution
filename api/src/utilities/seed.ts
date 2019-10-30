import { getManager, getRepository, Like, Repository } from 'typeorm';

import { Section } from '../entity/section.js';
import { Solution } from '../entity/solution.js';
import { Symptom } from '../entity/symptom.js';
import { Tag } from '../entity/tag.js';
import data from '../sample-data.json';

interface ISymptom {
  symptom: string;
  solutions: string[];
}

const createTag = async (like: string, repo: Repository<Symptom>, ...labels: string[]) => {
  const s = await repo.findOne({ data: Like(`%${like}%`) });
  if (s) {
    const tags = labels.map(x => new Tag(x));
    s.tags = tags;
    await getManager().save([s, ...tags ]);
  }
}

const createTags = async () => {
    const repo = getRepository(Symptom);
    return await Promise.all([
        createTag('computer', repo, 'laptop', 'computer'),
        createTag('keyboard', repo, 'keyboard', 'mouse'),
        createTag('monitor', repo, 'monitor', 'display', 'show', 'picture'),
        createTag('sound', repo, 'sound', 'voice', 'mic', 'microphone', 'hear'),
        createTag('button', repo, 'button', 'menu', 'start'),
        createTag('icons', repo, 'icons', 'order'),
        createTag('file', repo, 'file', 'deleted', 'recover'),
        createTag('text', repo, 'text', 'small', 'large'),
    ]);
};

export const seed = async() => {
  if ((await getRepository(Section).find()).length)
    return;

  for (const key in data) {
      const section = new Section(key);
      await getRepository(Section).save(section);

      const obj = data as any;
      const arr = obj[key] as ISymptom[];
      arr.forEach(async x => {
        const symptom = new Symptom(x.symptom);
        symptom.section = section;
        const sol = x.solutions.map(y => {
          const s = new Solution(y);
          s.symptom = symptom;
          return s;
        });
        await getManager().save([symptom, ...sol]);
      });
  }
  await createTags();
}