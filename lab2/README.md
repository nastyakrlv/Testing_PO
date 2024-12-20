# Лабораторная работа 1

### Описание

Реализована задача, в которой из файла `tasks/labyrinths/text.txt` читаются 2D массивы, представляющие собой лабиринты.

- 1 - означает, что проход есть
- 0 - что это стена лабиринта

Алгоритм из главной функции `main`.

Забираем данные по лабиринтам из файла `text.txt` с помощью `getDataFromFile`.

Заводим счетчик **корректных** (pass) и **некорректных** (failed) лабиринтов.

Используем функцию `scan` на каждом лабиринте, чтобы посчитать:

- **кол-во путей лабиринта, начинающихся с пола** (floor). Пол - нижняя часть лабиринта. Путь считается начатым, если в самом низу есть проход.
- **кол-во путей лабиринта, начинающихся с потолка** (ceil). Потолок - верхняя часть лабиринта. Путь считается начатым, если на самом верху есть проход.
- **кол-во изолированных путей** (isolated). То есть, таких путей, которые не соприкасаются с полом и потолком.
- **кол-во путей, проходящих в обе стороны** (both). То есть, таких путей, которые соприкасаются с полом и потолком. Это означает, что по данному пути можно войти и выйти из лабиринта.

Затем смотрим, является ли лабиринт **корректным** или **некорректным**.

Лабиринт является **некорректным**, если `кол-во изолированных путей` + `кол-во путей с потолка` + `кол-во путей с пола` >= `кол-во путей в обе стороны`.

Далее принимается решение, отправлять результаты на сервер или нет.

Если за все прогоны всех лабиринтов, **корректных** > **некорректных**,

- тогда отправляем информацию на сервер, и возвращаем из функции `true`,
- иначе - возвращаем `false`.

Для примера, так выглядит первый лабиринт из файла `text.txt`

```
[
   [0, 0, 0, 0, 0, 0, 0, 1], <- потолок
   [0, 1, 1, 1, 1, 1, 0, 1],
   [0, 1, 0, 0, 0, 1, 0, 1],
   [0, 1, 0, 1, 0, 1, 0, 1],
   [0, 1, 0, 0, 0, 1, 0, 1],
   [0, 1, 0, 0, 0, 0, 0, 1] <- пол
]
```

Функция `scan` для него вернет такой результат `{ ceil: 0, floor: 1, both: 1, isolated: 1 }`.

### Команды

- `npm start` - запустит исполнение файла `tasks/labyrinths/start.js`
- `npm run test` - запустит тесты
- `npm run test:coverage` - запустит тесты с генерацией отчета по покрытию.

