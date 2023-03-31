import inquirer from 'inquirer';

const platforms = ['PC', 'Xbox One'];

inquirer
  .prompt([
    {
      type: 'list',
      name: 'type',
      message: "Type d'album ?",
      choices: ['Jeu vidéo', 'Événement'],
    },
    {
      type: 'input',
      name: 'slug',
      message: 'Slug IGDB ?',
    },
    {
      type: 'list',
      name: 'origin',
      message: "Plateforme d'origine ?",
      choices: platforms,
    },
    {
      type: 'list',
      name: 'played',
      message: 'Joué sur quelle plateforme ?',
      choices: platforms,
    },
    {
      type: 'list',
      name: 'version',
      message: 'Version ?',
      choices: ['release'],
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });
