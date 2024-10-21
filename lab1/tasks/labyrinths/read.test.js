const getDataFromFile = require("./read");
const fs = require("fs");

jest.mock("fs");

describe("Сценарии файла read", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test(`Если прочитали данные с разделителями между строк, то происходит парсинг массивов в массив`, () => {
    // Arrange
    fs.readFileSync.mockReturnValue("[[0, 1], [1, 0]]\n[[0, 1, 1]]\n[[1]]");
    const expectedResult = [
      [
        [0, 1],
        [1, 0]
      ],
      [
        [0, 1, 1]
      ],
      [
        [1]
      ]
    ];

    // Act
    const result = getDataFromFile();

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test(`Если прочитали пустой массив, то функция возвращает пустой массив c пустым массивом`, () => {
    // Arrange
    fs.readFileSync.mockReturnValue("[]");
    const expectedResult = [[]];

    // Act
    const result = getDataFromFile();

    // Assert
    expect(result).toEqual(expectedResult);
  });

  test(`Если прочитали пустой файл, то функция возвращает пустой массив`, () => {
    // Arrange
    fs.readFileSync.mockReturnValue("");
    const expectedResult = [];

    // Act
    const result = getDataFromFile();

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
