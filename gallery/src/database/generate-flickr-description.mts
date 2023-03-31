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
      choices: ['released'],
    },
  ])
  .then((answers) => {
    if (answers.type === 'Jeu vidéo') {
      const encodedVggMeta: string = Buffer.from(
        `"t":"g","s":"${answers.slug}","p":"${mapPlatformIntoVggMeta(
          answers.played
        )}","o":"${mapPlatformIntoVggMeta(
          answers.origin
        )}","v":"${mapVersionIntoVggMeta(answers.version)}"`
      ).toString('base64');

      console.log(`Screenshots from video game.
${answers.origin} and ${answers.version} version. Played on ${answers.played}.
vgg-meta:
${encodedVggMeta}`);
    }
  });

function mapPlatformIntoVggMeta(plateform: string): string {
  switch (plateform) {
    case 'Xbox One':
      return 'xboxone';
    case 'PC':
      return 'win';
    default:
      throw new Error(`Plateforme '${plateform}' non gérée.`);
  }
}

function mapVersionIntoVggMeta(version: string): string {
  switch (version) {
    case 'released':
      return 'r';
    default:
      throw new Error(`Version '${version}' non gérée.`);
  }
}
