const main = require("./main");
const getDataFromFile = require("./read");
const sendDataToServer = require("./send");
const scan = require("./scan");
const fs = require("fs");
const http = require("http");


jest.mock("./read");
jest.mock("./send");
jest.mock("fs");
jest.mock("http");

const mockWrite = jest.fn();
const mockEnd = jest.fn();
http.request.mockReturnValue({
  write: mockWrite,
  end: mockEnd,
});

describe("Интеграционные тесты", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test(`Если прочитали пустой файл, то функция возвращает пустой массив`, () => {
    fs.readFileSync.mockReturnValue("");
    const expectedResult = [];

    getDataFromFile.mockReturnValue(expectedResult);

    const result = getDataFromFile();

    expect(result).toEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где есть ровно один путь каждого типа,
    то вернется объект, где все поля будут равны 1
  `, () => {
    const labyrinth = [
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1]
    ];
    const expectedResult = { ceil: 1, floor: 1, both: 1, isolated: 1 };

    const result = scan(labyrinth);

    expect(result).toStrictEqual(expectedResult);
  });

  test(`Если один лабиринт, и у данного лабиринта путей соприкасающихся с полом и потолком больше, 
    чем всех остальных, то он считается правильным и функция возвращает true`, () => {
    const labyrinth = [
      [1, 1, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
    ];

    getDataFromFile.mockReturnValue([labyrinth]);

    const result = main();

    expect(result).toBe(true);
  });

  test(`Если много лабиринтов, и неправильных лабиринтов больше, чем правильных, 
    то функция возвращает false`, () => {
    const labyrinths = [
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 1, 1, 0, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    ];

    getDataFromFile.mockReturnValue(labyrinths);

    const result = main();

    expect(result).toBe(false);
  });

  test(`Если правильный лабиринт, то происходит запрос на сервер с передачей информации 
    о результате функции - { passed: true }`, () => {
    const labyrinth = [
      [
        [1, 1, 0, 1, 1, 0, 0, 1],
        [1, 1, 0, 1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
      ],
    ];

    getDataFromFile.mockReturnValue(labyrinth);

    main();

    expect(sendDataToServer).toHaveBeenCalledWith({ passed: true });
  });

  test(`Если неправильный лабиринт, то запрос на сервер с передачей информации 
    не происходит `, () => {
    const labyrinth = [
      [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    ];
  
    getDataFromFile.mockReturnValue(labyrinth);
  
    main();

    expect(sendDataToServer).toHaveBeenCalledTimes(0);
  });    
});
