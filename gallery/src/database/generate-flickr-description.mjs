import clipboard from 'clipboardy';
import inquirer from 'inquirer';

const platforms = new Map([
  ['PC', 'win'],
  ['Switch', 'switch'],
  ['Xbox One', 'xboxone'],
  ['Xbox Series X', 'series-x'],
]);

const versions = new Map([['released', 'r']]);

console.log([...platforms.keys()]);

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
      choices: Array.from(platforms.keys()),
      when(answers) {
        return answers.type === 'Jeu vidéo';
      },
    },
    {
      type: 'list',
      name: 'played',
      message: 'Joué sur quelle plateforme ?',
      choices: Array.from(platforms.keys()),
      when(answers) {
        return answers.type === 'Jeu vidéo';
      },
    },
    {
      type: 'list',
      name: 'version',
      message: 'Version ?',
      choices: Array.from(versions.keys()),
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
    let description = null;

    if (answers.type === 'Jeu vidéo') {
      const vggMeta = `"t":"g","s":"${
        answers.slug
      }","p":"${mapPlatformIntoVggMeta(
        answers.played
      )}","o":"${mapPlatformIntoVggMeta(
        answers.origin
      )}","v":"${mapVersionIntoVggMeta(answers.version)}"`;

      const encodedVggMeta = Buffer.from(vggMeta).toString('base64');

      description = `Screenshots from video game.
${answers.origin} and ${answers.version} version. Played on ${answers.played}.
vgg-meta:
${encodedVggMeta}`;
    } else {
      const vggMeta = `"t":"e","y":${answers.year},"c":"${answers.country}","cy":"${answers.city}","n":"${answers.event}"`;

      const encodedVggMeta = Buffer.from(vggMeta).toString('base64');

      description = `Photos from an event.
${answers.country}, ${answers.city}.
vgg-meta:
${encodedVggMeta}`;
    }

    console.log(description + '\n');
    clipboard.writeSync(description);
  });

function mapPlatformIntoVggMeta(platform) {
  if (platforms.has(platform)) {
    return platforms.get(platform);
  }
  throw new Error(`Plateforme '${platform}' non gérée.`);
}

function mapVersionIntoVggMeta(version) {
  if (versions.has(version)) {
    return versions.get(version);
  }
  throw new Error(`Version '${version}' non gérée.`);
}
