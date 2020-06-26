# Dai.js frontend boilerplate app

## Getting Started

For development run:

`yarn run dev`

Open [http://localhost:3000](http://localhost:3000), or to connect the kovan network pass the query string `network=kovan` like this: [http://localhost:3000/?network=kovan](http://localhost:3000/?network=kovan)

## Theming

This app uses theme-ui with the dai-ui Maker theme. For more information [see here](https://github.com/makerdao/dai-ui/tree/master/packages/dai-ui-theme-maker), or start editing the `theme.js` file right away.

## Dai.js

This app includes the Dai.js SDK along with a minimal Context Provider to connect web3 browser accounts & fetch some data. By default the app will connect to mainnet. To connect to the kovan network pass the query string `network=kovan` in the URL.

## MDX Support

Included is the `next-mdx` plugin for markdown support. You can import `.mdx` files as react components, or drop files in your `pages` directory and they will be served by Next. See [here](https://github.com/mdx-js/mdx) for more information.

## Testing

To spin up a local testchain and run jest:

`yarn test`

To spin up the testchain separately:

`yarn testchain`

This app uses jest with [react-testing-library](https://github.com/testing-library/react-testing-library) and is preconfigured with a custom `render` function that wraps the UI elements in `ThemeProvider` and `MakerProvider`.

Jest is configured to look in the `test/helpers` directory for helper utilities so you can import the custom render function like this:
`import { render } from 'render';`

## IPFS

Requires [IPFS](https://docs.ipfs.io/guides/guides/install/) to be installed locally.
First build and export the project.

`yarn build && yarn export`

Add output directory to ipfs.

`ipfs add -r out`

## Resources

- [Dai.js](https://github.com/makerdao/dai.js/tree/dev/packages/dai) - Javascript SDK for interacting with the Maker system.
- [Dai-ui](https://github.com/makerdao/dai-ui/tree/master/packages/dai-ui-theme-maker) - Theme colors and scales built with theme-ui.
- [Theme UI](https://theme-ui.com/getting-started/) - A constraint-based system for organizing styles in UI design.
- [Testchain](https://github.com/makerdao/testchain) - Start a local test chain with the MakerDAO contracts deployed on it, quickly and easily.
- [MDX](https://github.com/mdx-js/mdx) - Markdown for the component era.
- [React testing library](https://github.com/testing-library/react-testing-library) - Simple and complete React DOM testing utilities that encourage good testing practices.
- [IPFS](https://docs.ipfs.io/guides/guides/install/) - A peer-to-peer hypermedia protocol
  designed to make the web faster, safer, and more open.
- [Next.js](https://nextjs.org/docs) - Learn about Next.js features and API.
