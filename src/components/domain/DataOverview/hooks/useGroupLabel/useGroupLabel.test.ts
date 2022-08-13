import { useGroupLabel } from './useGroupLabel';

describe('Returns correct group label', () => {
    test('Returns "task" label for group: tasks', () => {
        const label = useGroupLabel('tasks');

        expect(label).toStrictEqual('task');
    });

    test('Returns "project" label for group: projects', () => {
        const label = useGroupLabel('projects');

        expect(label).toStrictEqual('project');
    });
});
