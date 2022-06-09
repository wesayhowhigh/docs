// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'JUMP Docs',
  tagline: 'The documentation of choice for ambitious developers',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'wesayhowhigh', // Usually your GitHub org/user name.
  projectName: 'jump-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/wesayhowhigh/jump-docs/tree/master/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'JUMP Docs',
        logo: {
          alt: 'JUMP',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'development/intro',
            position: 'left',
            label: 'Development',
          },
          {
            type: 'doc',
            docId: 'plugins/intro',
            position: 'left',
            label: 'Plugins',
          },
          {
            type: 'doc',
            docId: 'websites/intro',
            position: 'left',
            label: 'Websites',
          },
          {
            href: 'https://jump-team.jump-ops.com/',
            position: 'right',
            label: 'JUMP Team',
          }
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Development',
                to: '/',
              },
              {
                label: 'Plugins',
                to: '/plugins/intro',
              },
            ],
          },
          {
            title: 'JUMP',
            items: [
              {
                label: 'Website',
                href: 'https://www.wesayhowhigh.com',
              },
              {
                label: 'Team App',
                href: 'https://jump-team.jump-ops.com/',
              },
              {
                label: 'Github',
                href: 'https://github.com/wesayhowhigh/',
              },
              {
                label: 'Instagram',
                href: 'https://twitter.com/wesayhowhigh',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} JUMP. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php'],
      },
    }),
};

module.exports = config;
