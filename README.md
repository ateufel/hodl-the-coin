# Hodl the Coin v1 #

Blockain Game built for STEEM and Ardor.

## Technology
* ESLint
* JavaScript ES6 with Babel
* Webpack
* Firebase (Cloud Firestore)
* Phaser Engine
* Service Workers (offline-plugin)

## Usage

* `yarn install`
* `yarn run serve` or `yarn run serve:ardor`

You can build the production version of the whole game with `yarn run build:all`, or just the STEEM version with `yarn run build:prod`. For a large list of other npm scripts, check out the `package.json`.

## Links
* https://github.com/lean/phaser-es6-webpack
* https://phaser.io/phaser3/api
* http://labs.phaser.io/

## TODO
* Separate game scene into smaller pieces (background class, pipe handler, menu handler, ...)
* Set global scaling factor?: https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
