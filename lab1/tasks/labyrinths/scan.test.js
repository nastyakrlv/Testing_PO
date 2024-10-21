const scan = require("./scan");

describe("Сценарии файла scan", () => {
  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где должен быть только один изолированный путь,
    то вернется объект, где только поле isolated будет равно 1, а остальные 0
  `, () => {
    // Arrange
    const labyrinth = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const expectedResult = { ceil: 0, floor: 0, both: 0, isolated: 1 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где должен быть только один путь,
    начинающийся с потолка, то вернется объект, где только поле ceil будет равно 1, а остальные 0
  `, () => {
    // Arrange
    const labyrinth = [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const expectedResult = { ceil: 1, floor: 0, both: 0, isolated: 0 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где должен быть только один путь,
    начинающийся с пола, то вернется объект, где только поле floor будет равно 1, а остальные 0
  `, () => {
    // Arrange
    const labyrinth = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1]
    ];
    const expectedResult = { ceil: 0, floor: 1, both: 0, isolated: 0 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где должен быть только один путь,
    который проходит в обе стороны, то вернется объект, где только поле both будет равно 1, а остальные 0
  `, () => {
    // Arrange
    const labyrinth = [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1]
    ];
    const expectedResult = { ceil: 0, floor: 0, both: 1, isolated: 0 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где нет путей,
    то вернется объект, где только все поля будут равны 0
  `, () => {
    // Arrange
    const labyrinth = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    const expectedResult = { ceil: 0, floor: 0, both: 0, isolated: 0 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования лабиринта и передаем двумерный массив, где есть ровно один путь каждого типа,
    то вернется объект, где все поля будут равны 1
  `, () => {
    // Arrange
    const labyrinth = [
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1]
    ];
    const expectedResult = { ceil: 1, floor: 1, both: 1, isolated: 1 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });

  test(`
    Если вызываем метод сканирования пустого массива (лабиринт без путей),
    то в возвращаемом объекте все поля должны быть равны 0
  `, () => {
    // Arrange
    const labyrinth = [];
    const expectedResult = { ceil: 0, floor: 0, both: 0, isolated: 0 };

    // Act
    const result = scan(labyrinth);

    // Assert
    expect(result).toStrictEqual(expectedResult);
  });
});
