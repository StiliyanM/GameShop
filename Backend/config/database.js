const mongoose = require('mongoose');
const encryption = require('../util/encryption');
const Game = require('../models/Game')
const User = require('../models/User')

mongoose.Promise = global.Promise;

module.exports = config => {
  mongoose.connect(config.dbPath, {
    useNewUrlParser: true
  });
  const db = mongoose.connection;
  db.once('open', err => {
    if (err) {
      throw err;
    }

    seedDatabase()
      .then(() => {
        console.log('Database ready');
      })
      .catch((reason) => {
        console.log('Something went wrong');
        console.log(reason);
      });
  });

  db.on('error', reason => {
    console.log(reason);
  });
};

async function seedDatabase() {

  const users = await User.find().then((users) => users.length > 0);
  const games = await Game.find().then((games) => games.length > 0);

  if (!users) {
    await seedUsers();
  }

  if (!games) {
    await seedGames();
  }
}

async function seedUsers() {

  //seed admin

  const saltAdmin = encryption.generateSalt();
  const passwordHashAdmin = encryption.generateHashedPassword("123456", saltAdmin);

  const admin = {
    salt: saltAdmin,
    password: passwordHashAdmin,
    username: 'Admin',
    email: "admin@admin.com",
    isAdmin: "true",
    roles: ["Admin"],
    orders: [],
  }

  await User.create(admin);

  // Seed user
  const saltUser = encryption.generateSalt();
  const passwordHashUser = encryption.generateHashedPassword("123456", saltUser);

  const user = {
    salt: saltUser,
    password: passwordHashUser,
    username: 'User',
    email: "user@user.com",
    roles: ["User"],
    orders: [],
  }

  await User.create(user);
}

async function seedGames() {
  const game1 = {
    title: 'Assassin\'s Creed',
    cover: 'https://s1.gaming-cdn.com/images/products/2172/271x377/assassins-creed-ii-cover.jpg',
    publisher: 'Ubisoft',
    genre: 'action-adventure',
    year: 2018,
    price: 20,
    description: 'Assassin\'s Creed is an action-adventure stealth video game franchise created by Patrice Désilets, Jade Raymond and Corey May, developed and published by Ubisoft using the game engine Anvil Next. It depicts in the centuries-old struggle, now and then, between the Assassins, who fight for peace with free will, and the Templars, who desire peace through control. The series features historical fiction, science fiction and characters, intertwined with real-world historical events and figures. For the majority of time players would control an Assassin in the past history, while they also play as Desmond Miles or an Assassin Initiate in the present day, who hunt down their Templar targets.    ',
  };
  const game2 = {
    title: 'Spider-Man',
    cover: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg',
    publisher: 'Sony',
    genre: 'action-adventure',
    year: 2018,
    price: 15,
    description: `Marvel's Spider-Man[a] is a 2018 action-adventure game developed by Insomniac Games and published by Sony Interactive Entertainment. Based on the Marvel Comics superhero Spider-Man, it is inspired by the long-running comic book mythology and adaptations in other media. In the game's main storyline, the super-human crime lord Mr. Negative orchestrates a plot to seize control of New York City's criminal underworld. When Mr. Negative threatens to release a deadly virus, Spider-Man must confront him and protect the city while dealing with the personal problems of his civilian persona, Peter Parker.

    Gameplay is presented from the third-person perspective with a primary focus on Spider-Man's traversal and combat abilities. Spider-Man can freely move around New York City, interacting with characters, undertaking missions, and unlocking new gadgets and suits by progressing through the main story or completing tasks. Outside the story, the player is able to complete side missions to unlock additional content and collectible items. Combat focuses on chaining attacks together, and using the environment and webs to incapacitate numerous foes while avoiding damage.
    
    Development of Marvel's Spider-Man, the first licensed game by Insomniac in its then-22 year history, began in 2014 and took approximately four years. Marvel gave Insomniac the choice of using any character from their catalogue to work on; Spider-Man was chosen both for his appeal to the employees and the similarities in traversal gameplay to their previous game Sunset Overdrive (2014). The game design took inspiration from the history of Spider-Man across all media but both Marvel Comics and Insomniac wanted to tell an original story that was not linked to an existing property, creating a unique universe (known as Earth-1048) that has since appeared in novels, merchandise, movies, and comics.
    
    `,
  };
  const game3 = {
    title: 'God of War',
    cover: 'https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg',
    publisher: 'Sony',
    genre: 'action-adventure',
    year: 2018,
    price: 9.99,
    description: `God of War[a] is an action-adventure video game developed by Santa Monica Studio and published by Sony Interactive Entertainment (SIE). Released on April 20, 2018, for the PlayStation 4 (PS4) console, it is the eighth installment in the God of War series, the eighth chronologically, and the sequel to 2010's God of War III. Unlike previous games, which were loosely based on Greek mythology, this installment is loosely based on Norse mythology, with the majority of it set in ancient Norway in the realm of Midgard. For the first time in the series, there are two main protagonists: Kratos, the former Greek God of War who remains as the only playable character, and his young son Atreus; at times, the player may passively control him. Following the death of Kratos' second wife and Atreus' mother, they journey to fulfill her promise to spread her ashes at the highest peak of the nine realms. Kratos keeps his troubled past a secret from Atreus, who is unaware of his divine nature. Along their journey, they encounter monsters and gods of the Norse world.
    `,
  };

  const games = [game1, game2, game3];

  await Game.insertMany(games);
}