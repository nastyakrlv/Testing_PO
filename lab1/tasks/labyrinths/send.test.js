const http = require("http");
const sendDataToServer = require("./send");

jest.mock("http");

const mockWrite = jest.fn();
const mockEnd = jest.fn();
http.request.mockReturnValue({
  write: mockWrite,
  end: mockEnd,
});

describe("Сценарии файла send", () => {
  test(`Если вызываем метод отправки данных на сервер, то создается запрос с корректным хостом`, () => {
    // Arrange
    const data = { passed: true };

    // Act
    sendDataToServer(data); 

    // Assert
    expect(http.request).toHaveBeenCalledWith(expect.objectContaining({
      hostname: "localhost"
    }));
  });

  test(`Если вызываем метод отправки данных на сервер, то создается запрос с корректным заголовком типа контента`, () => {
    // Arrange
    const data = { passed: true };

    // Act
    sendDataToServer(data); 

    // Assert
    expect(http.request).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        "Content-Type": "application/json" 
      })
    }));
  });

  test(`Если вызываем метод отправки данных на сервер, то происходит отправка запроса с данными`, () => {
    // Arrange
    const data = { passed: true }; 
    const expectedData = JSON.stringify(data);

    // Act
    sendDataToServer(data);

    // Assert
    expect(mockWrite).toHaveBeenCalledWith(expectedData);
  });
});
