const siteConfig = {
  title: "One IDE for Hardware and Software Development",
  tagline: "Software and Hardware that makes Hardware Programming easy",
  url: "https://oneware.studio",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  projectName: "oneware",
  organizationName: "OneWare Software Solutions",
  trailingSlash: "true",

  stylesheets: [
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "./docs",
          sidebarPath: require.resolve("./sidebars.json"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl: 'https://github.com/ProtopSolutions/OneWareStudioWebsite/edit/main/'
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        },
        blog: {
          editUrl: ({ locale, blogDirPath, blogPath }) => {
            return `https://github.com/ProtopSolutions/OneWareStudioWebsite/edit/main/${blogDirPath}/${blogPath}`;
          },
          postsPerPage: 10,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
        }
      }
    ]
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: require('./src/js/prism-themeLight'),
      darkTheme: require('./src/js/prism-themeDark'),
      additionalLanguages: ['powershell', 'vhdl', 'verilog'],
    },
    footer: {
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Guides",
              to: "docs/getstarted"
            }
          ]
        },
        {
          title: "Community",
          items: [
            {
              label: "Project chat",
              href:
                "https://discord.gg/gggggg"
            },
            {
              label: "GitHub",
              href: "https://github.com/search?utf8=%E2%9C%93&q=oneware"
            },
          ]
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              to: "blog"
            },
            {
              label: "Instagram",
              href: "https://www.instagram.com/oneware/"
            }
          ]
        },
        {
          title: "Legal",
          items: [
            {
              label: "Contact",
              to: "docs/contact"
            },
            {
              label: "Privacy Policy",
              to: "docs/privacy"
            }
          ]
        }
      ],
      logo: {
        alt: "OneWare Logo",
        src: "img/OneWare.jpeg",
        href: "https://oneware.studio"
      },
      copyright: `Copyright © ${new Date().getFullYear()} OneWare Studio`
    },
    navbar: {
      title: "OneWare Studio",
      logo: {
        alt: "OneWare Logo",
        src: "img/favicon.ico"
      },
      hideOnScroll: false,
      items: [
        {
          label: "Guides",
          position: "left",
          to: "/docs/getstarted",
          items:
            [
              {
                label: "Software Setup",
                to: "/docs/getstarted"
              },
              {
                label: "Hello World",
                to: "/docs/getstarted"
              }
            ],
        },
        { to: "blog", label: "Blog", position: "left" },
        
        { to: "/docs/contact", label: "Contact", position: "right" },
      ]
    },
    // Equivalent to `docsSideNavCollapsible`
    // ...
    algolia: {
      appId: 'HQZ79VR7H1',
      apiKey: '4f65a75f2f664206cc817eda7bb6d3d4',
      indexName: 'oneware',
      contextualSearch: false,
    }
  },
  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/favicon.ico',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(0, 170, 255)',
          },
        ],
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1218, // max resized image's size. 
        min: 640, // min resized image's size. if original is lower, use that size. 
        steps: 2, // the max number of images generated between min and max (inclusive) 
      },
    ]
  ],
};

module.exports = siteConfig;
