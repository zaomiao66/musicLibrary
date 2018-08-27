import { schema } from 'normalizr';

// const lessonSchema = new schema.Entity('lesson', {}, { idAttribute: 'id' });
// const lessonListSchema = new schema.Array(lessonSchema);

const myList = new schema.Entity('myList', {}, { idAttribute: 'id' });
const recommendList = new schema.Entity('recommendList', {}, { idAttribute: 'id' });

export const MYLIST = [myList];
export const RECOMMENDLIST = [recommendList];

// export default {
//   lessonListSchema
// };
