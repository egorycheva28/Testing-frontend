describe('UI-tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleDateString("ru-RU");
    };

    //Тестирование добавления задач и покраски их
    //title - название задачи
    //description - описание задачи
    //deadline - дедлайн задачи
    //priority - приоритет задачи
    //status - статус задачи
    //expectedColor - ожидаемый цвет фона задачи
    const testAddData1 = [
        {
            title: 'task',
            description: 'description',
            deadline: '2025-04-29',
            priority: 'Low',
            status: 'Overdue',
            expectedColor: 'rgb(251, 134, 130)'
        },
        {
            title: 'task1',
            description: 'description1',
            deadline: '2025-04-30',
            priority: 'Medium',
            status: 'Active',
            expectedColor: 'rgb(253, 197, 147)'
        },
        {
            title: 'task2',
            description: 'description2',
            deadline: '2025-05-01',
            priority: 'High',
            status: 'Active',
            expectedColor: 'rgb(253, 197, 147)'
        },
        {
            title: 'task3',
            description: 'description3',
            deadline: '2025-05-05',
            priority: 'Critical',
            status: 'Active',
            expectedColor: 'rgba(0, 0, 0, 0)'
        }
    ];
    testAddData1.forEach(({ title, description, deadline, priority, status, expectedColor }) => {
        describe(`Тестирование добавления задач и покраски их`, () => {
            it('Добавляет новую задачу', () => {
                //Открытие модального окна
                cy.get('.addTaskButton').click();

                //Ввод данных в форму
                cy.get('input[placeholder="Введите название задачи"]').type(title);
                cy.get('input[placeholder="Введите описание задачи"]').type(description);
                cy.get('input[type="date"]').type(deadline);
                cy.get('input[placeholder="Введите приоритет задачи"]').type(priority);

                //Добавление задачи
                cy.get('.addTask').contains('Добавить').click();
                cy.reload();

                //Проверка на наличие новой задачи
                cy.contains(title).should('be.visible');
                cy.contains(title).closest('.card').should('contain', title);

                //Проверка статуса
                cy.contains(status).closest('.card').should('contain', status);

                //Проверка дедлайна
                cy.contains(formatDate(deadline)).closest('.card').should('contain', formatDate(deadline));

                //Проверка приоритета
                cy.contains(title).closest('.card').find('.editButton').click();
                cy.get('input[type="text"]').eq(2).should('have.value', priority);
                cy.get('.closeModalButton').click();

                //Проверка цвета фона
                cy.contains(title).closest('.card').should('have.css', 'background-color', expectedColor);

                //Удаление задачи
                cy.contains(title).closest('.card').find('.deleteButton').click();
            });
        });
    });

    //Тестирование добавления задач с макросами в названии и покраски их
    //title - название задачи
    //description - описание задачи
    //expectedColor - ожидаемый цвет фона задачи
    const testAddData2 = [
        {
            title: 'taskDeadline !before 30.04.2025',
            description: 'descriptionDeadline',
            expectedColor: 'rgb(253, 197, 147)'
        },
        {
            title: 'taskPriority !2',
            description: 'descriptionPriority',
            expectedColor: 'rgba(0, 0, 0, 0)'
        }
    ];
    testAddData2.forEach(({ title, description, expectedColor }) => {
        describe(`Тестирование добавления задач с макросами в названии и покраски их`, () => {
            it('Добавляет новую задачу с макросом', () => {
                //Открытие модального окна
                cy.get('.addTaskButton').click();

                //Ввод данных в форму
                cy.get('input[placeholder="Введите название задачи"]').type(title);
                cy.get('input[placeholder="Введите описание задачи"]').type(description);

                //Добавление задачи 
                cy.get('.addTask').contains('Добавить').click();


                //Проверка на наличие новой задачи
                const cleanedText = title.replace(/\s*!.*$/, '');
                cy.contains(cleanedText).should('be.visible');
                cy.contains(cleanedText).closest('.card').should('contain', cleanedText);

                //Проверка дедлайна
                const matchDeadline = title.match(/!before\s*(\d{2}[.-]\d{2}[.-]\d{4})/);
                if (matchDeadline) {
                    console.log(matchDeadline[1]);
                    cy.contains(matchDeadline[1]).closest('.card').should('contain', matchDeadline[1]);
                }

                cy.reload();

                //Проверка приоритета
                const matchPriority = title.match(/!(\d+)/);
                if (matchPriority) {
                    var priority;
                    switch (matchPriority[1]) {
                        case '1':
                            priority = 'Critical';
                            break;
                        case '2':
                            priority = 'High';
                            break;
                        case '3':
                            priority = 'Medium';
                            break;
                        case '4':
                            priority = 'Low';
                            break;
                    }
                    cy.contains(cleanedText).closest('.card').find('.editButton').click();
                    cy.get('input[type="text"]').eq(2).should('have.value', priority);
                    cy.get('.closeModalButton').click();
                }

                //Проверка цвета фона
                cy.contains(cleanedText).closest('.card').should('have.css', 'background-color', expectedColor);

                //Удаление задачи
                cy.contains(cleanedText).closest('.card').find('.deleteButton').click();
            });
        });
    });

    //Тестирование добавления задач с макросами в названии и данными в форме и покраски их
    //title - название задачи
    //description - описание задачи
    //deadline - дедлайн задачи
    //priority - приоритет задачи
    //status - статус задачи
    //expectedColor - ожидаемый цвет фона задачи
    const testAddData3 = [
        {
            title: 'taskDeadline !before 12-12-2025',
            description: 'descriptionDeadline',
            deadline: '2025-04-30',
            priority: 'Critical',
            status: 'Active',
            expectedColor: 'rgb(253, 197, 147)'
        },
        {
            title: 'taskPriority !1',
            description: 'descriptionPriority',
            deadline: '2025-04-30',
            priority: 'Low',
            status: 'Active',
            expectedColor: 'rgb(253, 197, 147)'
        }
    ];
    testAddData3.forEach(({ title, description, deadline, priority, status, expectedColor }) => {
        describe(`Тестирование добавления задач с макросами в названии и данными в форме и покраски их`, () => {
            it('Добавляет новую задачу с макросом и формой заполненной', () => {
                //Открытие модального окна
                cy.get('.addTaskButton').click();

                //Ввод данных в форму
                cy.get('input[placeholder="Введите название задачи"]').type(title);
                cy.get('input[placeholder="Введите описание задачи"]').type(description);
                cy.get('input[type="date"]').type(deadline);
                cy.get('input[placeholder="Введите приоритет задачи"]').type(priority);

                //Добавление задачи 
                cy.get('.addTask').contains('Добавить').click();
                cy.reload();

                //Проверка на наличие новой задачи
                const cleanedText = title.replace(/\s*!.*$/, '');
                cy.contains(cleanedText).should('be.visible');
                cy.contains(cleanedText).closest('.card').should('contain', cleanedText);

                //Проверка статуса
                cy.contains(status).closest('.card').should('contain', status);

                //Проверка дедлайна
                cy.contains(formatDate(deadline)).closest('.card').should('contain', formatDate(deadline));

                //Проверка приоритета
                cy.contains(cleanedText).closest('.card').find('.editButton').click();
                cy.get('input[type="text"]').eq(2).should('have.value', priority);
                cy.get('.closeModalButton').click();

                //Проверка цвета фона
                cy.contains(cleanedText).closest('.card').should('have.css', 'background-color', expectedColor);

                //Удаление задачи
                cy.contains(cleanedText).closest('.card').find('.deleteButton').click();
            });
        });
    });

    //Проверка добавления задачи при длине названия меньше 4 символов
    //title - название задачи
    //description - описание задачи
    //deadline - дедлайн задачи
    //priority - приоритет задачи
    const testWrongData = [
        {
            title: 'abc',
            description: 'description',
            deadline: '2025-04-30',
            priority: 'Medium'
        }
    ];
    testWrongData.forEach(({ title, description, deadline, priority }) => {
        describe(`Проверка добавления задачи при длине названия меньше 4 символов`, () => {
            it('Выдает предупреждение', () => {
                //Открытие модального окна
                cy.get('.addTaskButton').click();

                // Ввод данных в форму
                cy.get('input[placeholder="Введите название задачи"]').type(title);
                cy.get('input[placeholder="Введите описание задачи"]').type(description);
                cy.get('input[type="date"]').type(deadline);
                cy.get('input[placeholder="Введите приоритет задачи"]').type(priority);

                // Добавление задачи
                cy.get('.addTask').contains('Добавить').click();

                // Проверка на наличие предупреждения
                cy.on('window:alert', (txt) => {
                    expect(txt).to.contains('Длина задачи минимум 4 символа');
                });
            });
        });
    });

    //Тестирование редактировния невыполненных задач
    //title1 - название существующей задачи
    //description1 - описание существующей задачи
    //title2 - название новой задачи
    //description2 - описание новой задачи
    //deadline2 - дедлайн новой задачи
    //expectedColor - ожидаемый цвет фона задачи после редактирования
    //expectedStatus - ожидаемый статус задачи после редактирования
    const testEditIncompletedData = [
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            expectedColor: 'rgba(0, 0, 0, 0)',
            expectedStatus: 'Active'
        },
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            deadline2: '2025-04-29',
            expectedColor: 'rgb(251, 134, 130)',
            expectedStatus: 'Overdue'
        },
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            deadline2: '2025-04-30',
            expectedColor: 'rgb(253, 197, 147)',
            expectedStatus: 'Active'
        },
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            deadline2: '2025-05-05',
            expectedColor: 'rgba(0, 0, 0, 0)',
            expectedStatus: 'Active'
        },
    ]
    testEditIncompletedData.forEach(({ title1, description1, expectedStatus, expectedColor, title2, description2, deadline2 }) => {
        describe(`Тестирование редактировния невыполненных задач`, () => {
            var taskId;
            // Создание задачи перед тестом
            before(() => {
                cy.request('POST', 'https://localhost:7235/api/add', { name: title1, description: description1 })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId = response.body;
                        }
                    });
            });
            after(() => {
                cy.request('DELETE', `https://localhost:7235/api/${taskId}`);
            });
            it('Редактирует задачу', () => {
                //Кликаем по кнопке редактирования задачи
                cy.contains(title1).closest('.card').find('.editButton').click();

                //Меняем название задачи
                cy.get('input[type="text"]').first().clear().type(title2);

                //Меняем описание задачи
                cy.get('input[type="text"]').eq(1).clear().type(description2);

                //Меняем дедлайн задачи
                if (deadline2) {
                    cy.get('input[type="date"]').clear().type(deadline2);
                }

                //Сохраняем изменения
                cy.get('.save').click();
                cy.get('.closeModalButton').first().click();
                cy.wait(1000);

                //Проверка на наличие новой задачи
                cy.contains(title2).closest('.card').should('contain', title2);

                //Проверка статус задачи
                cy.contains(expectedStatus).closest('.card').should('contain', expectedStatus);

                //Проверка дедлайна
                if (deadline2) {
                    cy.contains(formatDate(deadline2)).closest('.card').should('contain', formatDate(deadline2));
                }
                //Проверка цвета фона
                cy.contains(title2).closest('.card').should('have.css', 'background-color', expectedColor);
            });
        });
    });

    //Тестирование редактировния выполненных задач
    //title1 - название существующей задачи
    //description1 - описание существующей задачи
    //title2 - название новой задачи
    //description2 - описание новой задачи
    //deadline2 - дедлайн новой задачи
    //expectedColor - ожидаемый цвет фона задачи после редактирования
    //expectedStatus - ожидаемый статус задачи после редактирования
    const testEditCompletedData = [
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            expectedColor: 'rgba(0, 0, 0, 0)',
            expectedStatus: 'Completed'
        },
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            deadline2: '2025-04-29',
            expectedColor: 'rgba(0, 0, 0, 0)',
            expectedStatus: 'Completed'
        },
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            deadline2: '2025-04-30',
            expectedColor: 'rgba(0, 0, 0, 0)',
            expectedStatus: 'Completed'
        },
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'editTask2',
            description2: 'descriptionEditTask2',
            deadline2: '2025-05-05',
            expectedColor: 'rgba(0, 0, 0, 0)',
            expectedStatus: 'Completed'
        },
    ]
    testEditCompletedData.forEach(({ title1, description1, expectedStatus, expectedColor, title2, description2, deadline2 }) => {
        describe(`Тестирование редактировния выполненных задач`, () => {
            var taskId;
            // Создание задачи перед тестом
            before(() => {
                cy.request('POST', 'https://localhost:7235/api/add', { name: title1, description: description1 })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId = response.body;
                            cy.request('PATCH', `https://localhost:7235/api/complete/${taskId}`);
                        }
                    });
            });
            after(() => {
                cy.request('DELETE', `https://localhost:7235/api/${taskId}`);
            });
            it('Редактирует задачу', () => {
                //Кликаем по кнопке редактирования задачи
                cy.contains(title1).closest('.card').find('.editButton').click();

                //Меняем название задачи
                cy.get('input[type="text"]').first().clear().type(title2);

                //Меняем описание задачи
                cy.get('input[type="text"]').eq(1).clear().type(description2);

                //Меняем дедлайн задачи
                if (deadline2) {
                    cy.get('input[type="date"]').clear().type(deadline2);
                }

                //Сохраняем изменения
                cy.get('.save').click();
                cy.get('.closeModalButton').first().click();
                cy.wait(1000);

                //Проверка на наличие новой задачи
                cy.contains(title2).closest('.card').should('contain', title2);

                //Проверка статус задачи
                cy.contains(expectedStatus).closest('.card').should('contain', expectedStatus);

                //Проверка дедлайна
                if (deadline2) {
                    cy.contains(formatDate(deadline2)).closest('.card').should('contain', formatDate(deadline2));
                }
                //Проверка цвета фона
                cy.contains(title2).closest('.card').should('have.css', 'background-color', expectedColor);
            });
        });
    });

    //Тестирование редактировния задачи с длиной имени < 4
    //title1 - название существующей задачи
    //description1 - описание существующей задачи
    //title2 - название новой задачи
    //description2 - описание новой задачи
    const testEditWrongData = [
        {
            title1: 'editTask1',
            description1: 'descriptionEditTask1',
            title2: 'abc',
            description2: 'descriptionEditTask2'
        }
    ]
    testEditWrongData.forEach(({ title1, description1, title2, description2 }) => {
        describe(`Тестирование редактировния задачи с длиной имени < 4`, () => {
            var taskId;
            // Создание задачи перед тестом
            before(() => {
                cy.request('POST', 'https://localhost:7235/api/add', { name: title1, description: description1 })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId = response.body;
                        }
                    });
            });
            after(() => {
                cy.request('DELETE', `https://localhost:7235/api/${taskId}`);
            });
            it('Выдает предупреждение', () => {
                //Кликаем по кнопке редактирования задачи
                cy.contains(title1).closest('.card').find('.editButton').click();

                //Меняем название задачи
                cy.get('input[type="text"]').first().clear().type(title2);

                //Меняем описание задачи
                cy.get('input[type="text"]').eq(1).clear().type(description2);

                //Сохраняем изменения
                cy.get('.save').click();
                cy.get('.closeModalButton').first().click();
                cy.wait(1000);

                // Проверка на наличие предупреждения
                cy.on('window:alert', (txt) => {
                    expect(txt).to.contains('Длина задачи минимум 4 символа');
                });
            });
        });
    });

    //Проверка удаления задачи при клике на кнопку удаления
    //title - название удаляемой задачи
    //description - описание удаляемой задачи
    const deleteTask = {
        title: 'deleteTask',
        description: 'descriptionDeleteTask'
    };

    //Создание задачи перед тестом
    before(() => {
        cy.request('POST', 'https://localhost:7235/api/add', { name: deleteTask.title, description: deleteTask.description });
    });

    it('Удаляет задачу из списка', () => {
        cy.contains(deleteTask.title).closest('.card').find('.deleteButton').click();

        // Проверяем, что задача исчезла
        cy.get(deleteTask.title).should('not.exist');
    });

    //Тестирование выполнения задач
    //title - название задачи
    //description - описание задачи
    //deadline - дедлайн задачи
    //priority - приоритет задачи
    //status - изначальный статус задачи
    //color - изначальный цвет фона задачи
    //expectedColor - ожидаемый цвет фона задачи после выполнения
    //expectedStatus - ожидаемый статус задачи после выполнения
    const testCompleteData = [
        {
            title: 'task',
            description: 'description',
            deadline: '2025-04-29',
            priority: 0,
            status: 'Overdue',
            expectedStatus: 'Late',
            color: 'rgb(251, 134, 130)',
            expectedColor: 'rgba(0, 0, 0, 0)'
        },
        {
            title: 'task',
            description: 'description',
            deadline: '2025-04-30',
            priority: 0,
            status: 'Active',
            expectedStatus: 'Completed',
            color: 'rgb(253, 197, 147)',
            expectedColor: 'rgba(0, 0, 0, 0)'
        },
        {
            title: 'task',
            description: 'description',
            deadline: '2025-05-05',
            priority: 0,
            status: 'Active',
            expectedStatus: 'Completed',
            color: 'rgba(0, 0, 0, 0)',
            expectedColor: 'rgba(0, 0, 0, 0)'
        }
    ]
    testCompleteData.forEach(({ title, description, deadline, priority, status, expectedStatus, color, expectedColor }) => {
        describe(`Тестирование статусов`, () => {
            let taskId;
            //Добавление задачи для теста
            before(() => {
                cy.request('POST', 'https://localhost:7235/api/add', { name: title, description: description, deadline: deadline, priority: priority })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId = response.body;
                        }
                    });
            });
            //Удаление задачи после теста
            after(() => {
                cy.request('DELETE', `https://localhost:7235/api/${taskId}`);
            });

            it(`Изменяет статус с ${status} на ${expectedStatus}`, () => {
                cy.contains(title).closest('.card').should('have.css', 'background-color', color);

                //Изменение статуса
                cy.contains(title).closest('.card').find('.complete').click();

                //Проверка статуса
                cy.contains(title).closest('.card').should('contain', expectedStatus);

                //Проверка цвета фона
                cy.contains(title).closest('.card').should('have.css', 'background-color', expectedColor);

                //Проверка иконки выполнено у задачи
                cy.contains(title).closest('.card').find('.complete').should('have.attr', 'src', '/galka.png');
            });
        });
    });

    //Тестирование невыполнения задач
    //title - название задачи
    //description - описание задачи
    //deadline - дедлайн задачи
    //priority - приоритет задачи
    //status - изначальный статус задачи
    //color - изначальный цвет фона задачи
    //expectedColor - ожидаемый цвет фона задачи после невыполнения
    //expectedStatus - ожидаемый статус задачи после невыполнения
    const testIncompleteData = [
        {
            title: 'task',
            description: 'description',
            deadline: '2025-04-29',
            priority: 0,
            status: 'Late',
            expectedStatus: 'Overdue',
            expectedColor: 'rgb(251, 134, 130)',
            color: 'rgba(0, 0, 0, 0)'
        },
        {
            title: 'task',
            description: 'description',
            deadline: '2025-04-30',
            priority: 0,
            status: 'Completed',
            expectedStatus: 'Active',
            expectedColor: 'rgb(253, 197, 147)',
            color: 'rgba(0, 0, 0, 0)'
        },
        {
            title: 'task',
            description: 'description',
            deadline: '2025-05-05',
            priority: 0,
            status: 'Completed',
            expectedStatus: 'Active',
            color: 'rgba(0, 0, 0, 0)',
            expectedColor: 'rgba(0, 0, 0, 0)'
        }
    ]

    testIncompleteData.forEach(({ title, description, deadline, priority, status, expectedStatus, color, expectedColor }) => {
        describe(`Тестирование статусов`, () => {
            let taskId;
            //Добавление задачи для теста и выполнение её
            before(() => {
                cy.request('POST', 'https://localhost:7235/api/add', { name: title, description: description, deadline: deadline, priority: priority })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId = response.body;
                            cy.request('PATCH', `https://localhost:7235/api/complete/${taskId}`);
                        }
                    });
            });
            //Удаление задачи после теста
            after(() => {
                cy.request('DELETE', `https://localhost:7235/api/${taskId}`);
            });

            it(`Изменяет статус с ${status} на ${expectedStatus}`, () => {
                cy.contains(title).closest('.card').should('have.css', 'background-color', color);

                //Изменение статуса
                cy.contains(title).closest('.card').find('.complete').click();

                //Проверка статуса
                cy.contains(title).closest('.card').should('contain', expectedStatus);

                //Проверка цвета фона
                cy.contains(title).closest('.card').should('have.css', 'background-color', expectedColor);

                //Проверка иконки выполнено у задачи
                cy.contains(title).closest('.card').find('.complete').should('have.attr', 'src', '/point.jpeg');
            });
        });
    });

    //Тестирование сортировки задач
    //sortFilter1 - первый вид сортировки
    //sortFilter2 - второй вид сортировки
    //title1 - название первой задачи
    //description1 - описание первой задачи
    //deadline1 - дедлайн первой задачи
    //priority1 - приоритет первой задачи
    //title2 - название второй задачи
    //description2 - описание второй задачи
    //deadline2 - дедлайн второй задачи
    //priority2 - приоритет второй задачи
    const sortData = [
        {
            sortFilter1: 'StatusAsc',
            sortFilter2: 'StatusDesc',
            title1: 'taskActive',
            description1: 'description1',
            deadline1: '2025-05-01',
            priority1: 0,
            title2: 'taskOverdue',
            description2: 'description2',
            deadline2: '2025-04-28',
            priority2: 0
        },
        {
            sortFilter1: 'PriorityAsc',
            sortFilter2: 'PriorityDesc',
            title1: 'taskLow',
            description1: 'description1',
            deadline1: '2025-04-30',
            priority1: 0,
            title2: 'taskHigh',
            description2: 'description2',
            deadline2: '2025-04-30',
            priority2: 3
        },
        {
            sortFilter1: 'DeadlineAsc',
            sortFilter2: 'DeadlineDesc',
            title1: 'task1',
            description1: 'description1',
            deadline1: '2025-04-30',
            priority1: 1,
            title2: 'task2',
            description2: 'description2',
            deadline2: '2025-05-02',
            priority2: 1
        },
        {
            sortFilter1: 'CreateTimeAsc',
            sortFilter2: 'CreateTimeDesc',
            title1: 'task1',
            description1: 'description1',
            deadline1: '2025-04-30',
            priority1: 1,
            title2: 'task2',
            description2: 'description2',
            deadline2: '2025-04-30',
            priority2: 1
        }
    ];

    sortData.forEach(({ sortFilter1, sortFilter2, title1, description1, deadline1, priority1, title2, description2, deadline2, priority2 }) => {
        describe(`Тестирование сортировки: ${sortFilter1} и ${sortFilter2}`, () => {
            let taskId1;
            let taskId2;
            //Добавление задач для теста
            before(() => {
                cy.request('POST', 'https://localhost:7235/api/add', { name: title1, description: description1, deadline: deadline1, priority: priority1 })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId1 = response.body;
                        }
                    });
                cy.request('POST', 'https://localhost:7235/api/add', { name: title2, description: description2, deadline: deadline2, priority: priority2 })
                    .then((response) => {
                        if (response.status === 200) {
                            taskId2 = response.body;
                        }
                    });
            });
            //Удаление задач после теста
            after(() => {
                cy.request('DELETE', `https://localhost:7235/api/${taskId1}`);
                cy.request('DELETE', `https://localhost:7235/api/${taskId2}`);
            });

            it(`Сортировки: ${sortFilter1} и ${sortFilter2}`, () => {
                cy.wait(1000);

                // Выбор сортировки
                cy.get('#sortFilter').select(sortFilter1);

                // Проверка порядка задач
                cy.get('.to-do').find('.card-deck').first().should('contain', title1);
                cy.get('.to-do').find('.card-deck').last().should('contain', title2);

                // Выбор сортировки
                cy.get('#sortFilter').select(sortFilter2);

                // Проверка порядка задач
                cy.get('.to-do').find('.card-deck').last().should('contain', title2);
                cy.get('.to-do').find('.card-deck').first().should('contain', title1);
            });
        });
    });
});