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
      when(answers) {
        return answers.type === 'Jeu vidéo';
      },
    },
    {
      type: 'list',
      name: 'origin',
      message: "Plateforme d'origine ?",
      choices: platforms,
      when(answers) {
        return answers.type === 'Jeu vidéo';
      },
    },
    {
      type: 'list',
      name: 'played',
      message: 'Joué sur quelle plateforme ?',
      choices: platforms,
      when(answers) {
        return answers.type === 'Jeu vidéo';
      },
    },
    {
      type: 'list',
      name: 'version',
      message: 'Version ?',
      choices: ['released'],
      when(answers) {
        return answers.type === 'Jeu vidéo';
      },
    },
    {
      type: 'input',
      name: 'event',
      message: "Nom de l'événement ?",
      when(answers) {
        return answers.type !== 'Jeu vidéo';
      },
    },
    {
      type: 'input',
      name: 'year',
      message: "Année de l'événement ?",
      when(answers) {
        return answers.type !== 'Jeu vidéo';
      },
    },
    {
      type: 'input',
      name: 'country',
      message: "Pays de l'événement ?",
      when(answers) {
        return answers.type !== 'Jeu vidéo';
      },
    },
    {
      type: 'input',
      name: 'city',
      message: "Ville de l'événement ?",
      when(answers) {
        return answers.type !== 'Jeu vidéo';
      },
    },
  ])
  .then((answers) => {
    console.log('Description générée :\n');

    if (answers.type === 'Jeu vidéo') {
      const vggMeta: string = `"t":"g","s":"${
        answers.slug
      }","p":"${mapPlatformIntoVggMeta(
        answers.played
      )}","o":"${mapPlatformIntoVggMeta(
        answers.origin
      )}","v":"${mapVersionIntoVggMeta(answers.version)}"`;

      const encodedVggMeta: string = Buffer.from(vggMeta).toString('base64');

      console.log(`Screenshots from video game.
${answers.origin} and ${answers.version} version. Played on ${answers.played}.
vgg-meta:
${encodedVggMeta}`);
    } else {
      const vggMeta: string = `"t":"e","y":${answers.year},"c":"${answers.country}","cy":"${answers.city}","n":"${answers.event}"`;

      const encodedVggMeta: string = Buffer.from(vggMeta).toString('base64');

      console.log(`Photos from an event.
${answers.country}, ${answers.city}.
vgg-meta:
${encodedVggMeta}`);
    }

    console.log('');
  });

function mapPlatformIntoVggMeta(platform: string): string {
  switch (platform) {
    case 'Xbox One':
      return 'xboxone';
    case 'PC':
      return 'win';
    default:
      throw new Error(`Plateforme '${platform}' non gérée.`);
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
