const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewNpc,
  validateNewNpc
} = require('../lib/npcs-lib');
const { npcs } = require('../data/npcs.json');


test("creates an npc object", () => {
  const npc = createNewNpc(
    {name: 'Dodo', id: 'twenty'}, npcs
  );
  expect(npc.name).toBe('Dodo');
  expect(npc.id).toBe('twenty')
});

test("filters by query", () => {
  const startingNpcs = [
    {
      id: '20',
      name: 'Rolex',
      race: 'Squid',
      location: 'Emeral Ocean',
      personalitytraits: ['Hungry', 'Nervious', 'Loyal']
    },
    {
      id: '30',
      name: 'Gudra',
      race: 'Giantess',
      location: 'Skrygard Mountain',
      personalitytraits: ['Wise', 'Stoic', 'Welcoming']
    }
  ];
  const updatedNpcs = filterByQuery({ race: "Giantess"}, startingNpcs);
  expect(updatedNpcs.length).toEqual(1);
});

test("finds by id", () => {
  const startingNpcs = [
    {
      id: '20',
      name: 'Rolex',
      race: 'Squid',
      location: 'Emeral Ocean',
      personalitytraits: ['Hungry', 'Nervious', 'Loyal']
    },
    {
      id: '30',
      name: 'Gudra',
      race: 'Giantess',
      location: 'Skrygard Mountain',
      personalitytraits: ['Wise', 'Stoic', 'Welcoming']
    }
  ];
  const result = findById("20", startingNpcs);
  expect(result.name).toBe("Rolex");
})

test("validates personality traits", () => {
  const npc = {
    id: '30',
    name: 'Gudra',
    race: 'Giantess',
    location: 'Skrygard Mountain',
    personalityTraits: ['Wise', 'Stoic', 'Welcoming']
  };

  const invalidNpc = {
    id: '40',
    name: 'Locust',
    race: 'Djin',
    location: 'Sandy Oasis'
  };

  const result = validateNewNpc(npc);
  const result2 = validateNewNpc(invalidNpc);
  
  expect(result).toBe(true);
  expect(result2).toBe(false);
});

