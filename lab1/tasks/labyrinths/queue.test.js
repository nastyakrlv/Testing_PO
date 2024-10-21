const Queue = require("./queue");

describe("Сценарии файла queue", () => {
  test(`Если создали очередь и подобавляли в неё элементы, а затем поисключали все элементы из нее, 
    то возвращаются все элементы в порядке их добавления`, () => {
    // Arrange
    const queue = new Queue();

    for (let i = 0; i < 5; i++) {
      queue.enqueue(i);
    }

    const result = [];

    // Act
    for (let i = 0; i < 5; i++) {
      result[i] = queue.dequeue();
    }

    // Assert
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });

  test(`Если создать пустую очередь и вызвать метод dequeue, то вернуться должен undefined`, () => {
    // Arrange
    const queue = new Queue();

    // Act
    const result = queue.dequeue();

    // Assert
    expect(result).toBeUndefined();
  });
});
