import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890', 10);

const generateTodoId = () => {
    return nanoid();
};

export default generateTodoId;

