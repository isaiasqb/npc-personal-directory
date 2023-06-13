const fs = require('fs');
const {
  filterByQuery,
  findById,
  createNewGame,
  validateNewGame,
} = require("../lib/games-lib");
const { games } = require("../data/games.json");

jest.mock("fs");


test("creates a game object", () => {
  const game = createNewGame(
    {name: "Elder Rings", id: "pop"}, games
  );

  expect(game.name).toBe("Elder Rings");
  expect(game.id).toBe("pop")
});


test("filters by query", () => {
  const startingGames = 
  [
    {
      id: "2",
      name: "Raksha Boat Trip",
      releaseYear: 2020,
      favoriteNpc: "Penguin Man",
    },
    {
      id: "3",
      name: "Isabella's Tear",
      age: 2017,
      favoriteAnimal: "Werebear",
    },
  ];

  const updatedGames = filterByQuery({ releaseYear: 2020 }, startingGames);
  expect(updatedGames.length).toEqual(1);
});


test("finds by id", () => {
  const startingGames = 
  [
    {
      id: "2",
      name: "Raksha Boat Trip",
      releaseYear: 2020,
      favoriteNpc: "Penguin Man",
    },
    {
      id: "3",
      name: "Isabella's Tear",
      releaseYear: 2017,
      favoriteNpc: "Werebear",
    },
  ];

  const result = findById("3", startingGames);
  expect(result.name).toBe("Isabella's Tear")
});


test("validates release year", () => {
  const game =
    {
      id: "2",
      name: "Raksha Boat Trip",
      releaseYear: 2020,
      favoriteNpc: "Penguin Man",
    }
  
  const invalidGame =
  {
    id: "2",
    name: "Raksha Boat Trip",
    releaseYear: "yesterday",
    favoriteNpc: "Penguin Man",
  }

  const result = validateNewGame(game);
  const result2 = validateNewGame(invalidGame);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});