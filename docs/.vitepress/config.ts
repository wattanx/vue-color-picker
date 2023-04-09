import { defineConfig } from "vitepress";
const pkg = require("../../packages/vue-color-picker/package.json");

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue Color Picker",
  description: "Provides a headless color picker for Vue.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: [
      {
        text: "Introduction",
        items: [
          {
            text: "Getting Started",
            link: "/getting-started",
          },
          {
            text: "Example",
            link: "/example/index",
          },
        ],
      },
      {
        text: "Composables",
        items: [
          {
            text: "useColorPicker",
            link: "/use-color-picker",
          },
        ],
      },
      {
        text: "Components",
        items: [
          {
            text: "ColorPickerCanvas",
            link: "/color-picker-canvas",
          },
          {
            text: "ColorPickerHue",
            link: "/color-picker-hue",
          },
          {
            text: "ColorPickerHueCursor",
            link: "/color-picker-hue-cursor",
          },
          {
            text: "ColorPickerSaturation",
            link: "/color-picker-saturation",
          },
          {
            text: "ColorPickerSaturationCursor",
            link: "/color-picker-saturation-cursor",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/wattanx/vue-color-picker" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: "© 2023 wattanx",
    },
  },
});

function nav() {
  return [
    { text: "Home", link: "/" },
    {
      text: pkg.version,
      items: [
        {
          text: "Changelog",
          link: "",
        },
      ],
    },
  ];
}
