const main = require("./main");
const getDataFromFile = require("./read");
const sendDataToServer = require("./send");

jest.mock("./read");
jest.mock("./send");

describe("Сценарии файла main", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test(`Если один лабиринт, и у данного лабиринта путей соприкасающихся с полом и потолком больше, 
    чем всех остальных, то он считается правильным и функция возвращает true`, () => {
    // Arrange
    const labyrinth = [
      [1, 1, 0, 1, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
    ];

    getDataFromFile.mockReturnValue([labyrinth]);

    // Act
    const result = main();

    // Assert
    expect(result).toBe(true);
  });

  test(`Если много лабиринтов, и неправильных лабиринтов больше, чем правильных, 
    то функция возвращает false`, () => {
    // Arrange
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

    // Act
    const result = main();

    // Assert
    expect(result).toBe(false);
  });

  test(`Если правильный лабиринт, то происходит запрос на сервер с передачей информации 
    о результате функции - { passed: true }`, () => {
    // Arrange
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

    // Act
    main();

    // Assert
    expect(sendDataToServer).toHaveBeenCalledWith({ passed: true });
  });
});
