# Food How

[![Build Status](https://travis-ci.org/troyblank/foodhow.svg?branch=master)](https://travis-ci.org/troyblank/foodhow)

Food how is an experimental Node.js recipe book that uses json files instead of a database for portability. For more information see [troyblank.com](http://troyblank.com/#portfolio:/specimens/2014/foodHow/, "Food How").

## Requirements

* node >= 5.10.1

## Setup
First thing you want to do is install all node packages run:

    npm install

To build all assets run:

    grunt build

In order to run the project run:

    npm start
    
## Test

    npm test

## Adding recipes

To add a recipe simply make a new json file in ```web/recipes``` that follows this format:

        {
            "title": "Some Food",
            "meta": "This is a really good food.",
            "ingredients": [
                "1 meat",
                "1 cup fruit",
                "&frac12; tsp spice"
            ],
            "directions": [
                "Mash ingredient togthere.".
                "Eat."
            ]
        }

When adding recipes it's important to note that underscores will be used in lieu of spaces in file names. For example "Some_Food.json" will show up as "Some Food" to the user.

## Development

To run a watcher simply run:

    grunt
    
To push current master using [grunt-shell](https://www.npmjs.com/package/grunt-shell) you must make a config file

    cp credentials/config.json.sample credentials/config.json
    
Then fill out all information, and commands you want. Also copy your id_rsa private key inside the credintials folder then run:

    grunt deploy

## License

(The MIT License)

Copyright (c) 2014 [Troy Blank](http://www.troyblank.com/#mainNavContent:/contact/ "Troy Blank")

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
